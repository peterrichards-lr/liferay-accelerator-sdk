#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const { execSync } = childProcess;

function log(msg, type = 'info') {
  const colors = {
    info: '\x1b[34m', // Blue
    success: '\x1b[32m', // Green
    warn: '\x1b[33m', // Yellow
    error: '\x1b[31m', // Red
    reset: '\x1b[0m',
  };
  console.log(`${colors[type]}${msg}${colors.reset}`);
}

/**
 * Runs gh with an argument array rather than a command string.
 *
 * Issue titles and bodies are arbitrary Markdown. Interpolating them into a
 * double-quoted shell string mangled any body containing a quote and executed
 * anything inside backticks or $(), so bodies had to be written without
 * ordinary code formatting to be safe. execFileSync passes each argument
 * straight to gh, so no shell parses them at all.
 *
 * Called through the module object rather than a destructured binding so the
 * guarantee stays observable from a test.
 */
function gh(args) {
  return childProcess.execFileSync('gh', args, { encoding: 'utf8' }).trim();
}

/** Renders an argument array for dry-run output, quoting only for display. */
function describe(args) {
  return `gh ${args
    .map((arg) => (/[\s"'`$\\]/.test(arg) ? JSON.stringify(arg) : arg))
    .join(' ')}`;
}

/** Builds the argument array for `gh issue create`, one --label per entry. */
function ghIssueCreateArgs(title, body, labels = []) {
  const args = ['issue', 'create', '--title', title, '--body', body];
  for (const label of labels || []) {
    args.push('--label', label);
  }
  return args;
}

function main() {
  // Check dependencies
  try {
    execSync('gh --version', { stdio: 'ignore' });
  } catch {
    log(
      'Error: GitHub CLI (gh) is not installed. Please install it and log in.',
      'error'
    );
    process.exit(1);
  }

  try {
    execSync('gh auth status', { stdio: 'ignore' });
  } catch {
    log(
      'Error: GitHub CLI is not authenticated. Please run "gh auth login".',
      'error'
    );
    process.exit(1);
  }

  // Parse args
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const jsonArg = args.find((a) => a.endsWith('.json'));

  if (!jsonArg) {
    log('Usage: node gh-issue-sync.cjs <issues.json> [--dry-run]', 'warn');
    process.exit(1);
  }

  const jsonPath = path.resolve(jsonArg);
  if (!fs.existsSync(jsonPath)) {
    log(`Error: File not found at ${jsonPath}`, 'error');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  let commitHash = 'master';
  try {
    commitHash = execSync('git rev-parse --short HEAD', {
      encoding: 'utf8',
    }).trim();
  } catch {
    // Silent fallback
  }

  log(
    `=== Reusable GitHub Issue Sync ${dryRun ? '(DRY RUN)' : ''} ===`,
    'info'
  );
  log(`Referencing commit: ${commitHash}`, 'info');

  let epicNumber = config.epicId || '123';

  if (config.epicId) {
    log(`\nUsing existing Epic ID: #${config.epicId}`, 'info');
  } else {
    // Create Epic
    log(`\nCreating Epic: "${config.title}"...`, 'info');

    const epicArgs = ghIssueCreateArgs(
      config.title,
      config.body,
      config.labels
    );

    if (dryRun) {
      log(`[DRY RUN] Would execute: ${describe(epicArgs)}`, 'success');
    } else {
      const epicUrl = gh(epicArgs);
      epicNumber = epicUrl.split('/').pop();
      log(
        `Epic created successfully: Issue #${epicNumber} (${epicUrl})`,
        'success'
      );
    }
  }

  // Create Sub-issues
  if (config.issues && config.issues.length > 0) {
    config.issues.forEach((issue, idx) => {
      log(
        `\nProcessing sub-issue [${idx + 1}/${config.issues.length}]: "${issue.title}"...`,
        'info'
      );
      const bodyText = `${issue.body}\n\n(Belongs to Epic #${epicNumber})`;
      const issueArgs = ghIssueCreateArgs(issue.title, bodyText, issue.labels);

      if (dryRun) {
        log(`[DRY RUN] Would execute: ${describe(issueArgs)}`, 'success');
        if (issue.completed) {
          log(`[DRY RUN] Would comment and close sub-issue.`, 'success');
        }
      } else {
        const subIssueUrl = gh(issueArgs);
        const subIssueNumber = subIssueUrl.split('/').pop();
        log(
          `Sub-issue created: Issue #${subIssueNumber} (${subIssueUrl})`,
          'success'
        );

        if (issue.completed) {
          log(`Closing completed sub-issue #${subIssueNumber}...`, 'info');
          gh([
            'issue',
            'comment',
            subIssueNumber,
            '--body',
            `This issue was successfully implemented and verified in commit ${commitHash}. Closing.`,
          ]);
          gh(['issue', 'close', subIssueNumber]);
          log(`Issue #${subIssueNumber} closed successfully.`, 'success');
        }
      }
    });
  }

  log('\nAll sync operations completed!', 'success');
}

if (require.main === module) {
  main();
}

module.exports = { describe, gh, ghIssueCreateArgs, main };
