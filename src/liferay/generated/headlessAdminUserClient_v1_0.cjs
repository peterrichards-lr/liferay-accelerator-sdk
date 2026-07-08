/**
 * HeadlessAdminUserClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessAdminUserClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getAccountGroupsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountGroupsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/account-groups`,
      data,
      op: 'getAccountGroupsPage',
      friendly: 'Generated method getAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postAccountGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountGroup(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/account-groups`,
      data,
      op: 'postAccountGroup',
      friendly: 'Generated method postAccountGroup failed',
      ...opts,
    });
  }

  /**
   * deleteAccountGroupBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/account-groups/batch`,
      data,
      op: 'deleteAccountGroupBatch',
      friendly: 'Generated method deleteAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postAccountGroupBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/account-groups/batch`,
      data,
      op: 'postAccountGroupBatch',
      friendly: 'Generated method postAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * putAccountGroupBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/account-groups/batch`,
      data,
      op: 'putAccountGroupBatch',
      friendly: 'Generated method putAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAccountGroupByExternalReferenceCodeAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountGroupByExternalReferenceCodeAccountByExternalReferenceCode(
    config,
    accountExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/account-groups/by-external-reference-code/${accountExternalReferenceCode}/accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAccountGroupByExternalReferenceCodeAccountByExternalReferenceCode',
      friendly:
        'Generated method deleteAccountGroupByExternalReferenceCodeAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postAccountGroupByExternalReferenceCodeAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountGroupByExternalReferenceCodeAccountByExternalReferenceCode(
    config,
    accountExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/account-groups/by-external-reference-code/${accountExternalReferenceCode}/accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'postAccountGroupByExternalReferenceCodeAccountByExternalReferenceCode',
      friendly:
        'Generated method postAccountGroupByExternalReferenceCodeAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAccountGroupByExternalReferenceCodeAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountGroupByExternalReferenceCodeAccountsPage(
    config,
    accountGroupExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/account-groups/by-external-reference-code/${accountGroupExternalReferenceCode}/accounts`,
      data,
      op: 'getAccountGroupByExternalReferenceCodeAccountsPage',
      friendly:
        'Generated method getAccountGroupByExternalReferenceCodeAccountsPage failed',
      ...opts,
    });
  }

  /**
   * deleteAccountGroupByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/account-groups/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAccountGroupByExternalReferenceCode',
      friendly:
        'Generated method deleteAccountGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAccountGroupByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/account-groups/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAccountGroupByExternalReferenceCode',
      friendly:
        'Generated method getAccountGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchAccountGroupByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchAccountGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/account-groups/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchAccountGroupByExternalReferenceCode',
      friendly:
        'Generated method patchAccountGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAccountGroupByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putAccountGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/account-groups/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putAccountGroupByExternalReferenceCode',
      friendly:
        'Generated method putAccountGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postAccountGroupsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountGroupsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/account-groups/export-batch`,
      data,
      op: 'postAccountGroupsPageExportBatch',
      friendly: 'Generated method postAccountGroupsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAccountGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountGroup(config, accountGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/account-groups/${accountGroupId}`,
      data,
      op: 'deleteAccountGroup',
      friendly: 'Generated method deleteAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getAccountGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountGroup(config, accountGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/account-groups/${accountGroupId}`,
      data,
      op: 'getAccountGroup',
      friendly: 'Generated method getAccountGroup failed',
      ...opts,
    });
  }

  /**
   * patchAccountGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchAccountGroup(config, accountGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/account-groups/${accountGroupId}`,
      data,
      op: 'patchAccountGroup',
      friendly: 'Generated method patchAccountGroup failed',
      ...opts,
    });
  }

  /**
   * putAccountGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putAccountGroup(config, accountGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/account-groups/${accountGroupId}`,
      data,
      op: 'putAccountGroup',
      friendly: 'Generated method putAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getAccountGroupAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountGroupAccountsPage(config, accountGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/account-groups/${accountGroupId}/accounts`,
      data,
      op: 'getAccountGroupAccountsPage',
      friendly: 'Generated method getAccountGroupAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postAccountGroupAccountsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountGroupAccountsPageExportBatch(
    config,
    accountGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/account-groups/${accountGroupId}/accounts/export-batch`,
      data,
      op: 'postAccountGroupAccountsPageExportBatch',
      friendly:
        'Generated method postAccountGroupAccountsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts`,
      data,
      op: 'getAccountsPage',
      friendly: 'Generated method getAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccount(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts`,
      data,
      op: 'postAccount',
      friendly: 'Generated method postAccount failed',
      ...opts,
    });
  }

  /**
   * deleteAccountBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/batch`,
      data,
      op: 'deleteAccountBatch',
      friendly: 'Generated method deleteAccountBatch failed',
      ...opts,
    });
  }

  /**
   * postAccountBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/batch`,
      data,
      op: 'postAccountBatch',
      friendly: 'Generated method postAccountBatch failed',
      ...opts,
    });
  }

  /**
   * putAccountBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/accounts/batch`,
      data,
      op: 'putAccountBatch',
      friendly: 'Generated method putAccountBatch failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodeAccountExternalReferenceCodeAccountGroupsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodeAccountExternalReferenceCodeAccountGroupsPage(
    config,
    accountExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${accountExternalReferenceCode}/account-groups`,
      data,
      op: 'getAccountByExternalReferenceCodeAccountExternalReferenceCodeAccountGroupsPage',
      friendly:
        'Generated method getAccountByExternalReferenceCodeAccountExternalReferenceCodeAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * deleteAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByExternalReferenceCode(
    config,
    accountExternalReferenceCode,
    accountRoleExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${accountExternalReferenceCode}/account-roles/by-external-reference-code/${accountRoleExternalReferenceCode}/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByExternalReferenceCode',
      friendly:
        'Generated method deleteAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByExternalReferenceCode(
    config,
    accountExternalReferenceCode,
    accountRoleExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${accountExternalReferenceCode}/account-roles/by-external-reference-code/${accountRoleExternalReferenceCode}/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'postAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByExternalReferenceCode',
      friendly:
        'Generated method postAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteAccountByExternalReferenceCodeAccountRoleUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountByExternalReferenceCodeAccountRoleUserAccountByExternalReferenceCode(
    config,
    accountExternalReferenceCode,
    accountRoleId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${accountExternalReferenceCode}/account-roles/${accountRoleId}/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAccountByExternalReferenceCodeAccountRoleUserAccountByExternalReferenceCode',
      friendly:
        'Generated method deleteAccountByExternalReferenceCodeAccountRoleUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postAccountByExternalReferenceCodeAccountRoleUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountByExternalReferenceCodeAccountRoleUserAccountByExternalReferenceCode(
    config,
    accountExternalReferenceCode,
    accountRoleId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${accountExternalReferenceCode}/account-roles/${accountRoleId}/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'postAccountByExternalReferenceCodeAccountRoleUserAccountByExternalReferenceCode',
      friendly:
        'Generated method postAccountByExternalReferenceCodeAccountRoleUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteAccountByExternalReferenceCodeUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountByExternalReferenceCodeUserAccountByExternalReferenceCode(
    config,
    accountExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${accountExternalReferenceCode}/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAccountByExternalReferenceCodeUserAccountByExternalReferenceCode',
      friendly:
        'Generated method deleteAccountByExternalReferenceCodeUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodeUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodeUserAccountByExternalReferenceCode(
    config,
    accountExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${accountExternalReferenceCode}/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAccountByExternalReferenceCodeUserAccountByExternalReferenceCode',
      friendly:
        'Generated method getAccountByExternalReferenceCodeUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postAccountByExternalReferenceCodeUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountByExternalReferenceCodeUserAccountByExternalReferenceCode(
    config,
    accountExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${accountExternalReferenceCode}/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'postAccountByExternalReferenceCodeUserAccountByExternalReferenceCode',
      friendly:
        'Generated method postAccountByExternalReferenceCodeUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodeUserAccountByExternalReferenceCodeAccountRolesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodeUserAccountByExternalReferenceCodeAccountRolesPage(
    config,
    accountExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${accountExternalReferenceCode}/user-accounts/by-external-reference-code/${externalReferenceCode}/account-roles`,
      data,
      op: 'getAccountByExternalReferenceCodeUserAccountByExternalReferenceCodeAccountRolesPage',
      friendly:
        'Generated method getAccountByExternalReferenceCodeUserAccountByExternalReferenceCodeAccountRolesPage failed',
      ...opts,
    });
  }

  /**
   * deleteAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAccountByExternalReferenceCode',
      friendly: 'Generated method deleteAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAccountByExternalReferenceCode',
      friendly: 'Generated method getAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchAccountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchAccountByExternalReferenceCode',
      friendly: 'Generated method patchAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putAccountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putAccountByExternalReferenceCode',
      friendly: 'Generated method putAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAccountAccountRolesByExternalReferenceCodePage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountAccountRolesByExternalReferenceCodePage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/account-roles`,
      data,
      op: 'getAccountAccountRolesByExternalReferenceCodePage',
      friendly:
        'Generated method getAccountAccountRolesByExternalReferenceCodePage failed',
      ...opts,
    });
  }

  /**
   * postAccountAccountRoleByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountAccountRoleByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/account-roles`,
      data,
      op: 'postAccountAccountRoleByExternalReferenceCode',
      friendly:
        'Generated method postAccountAccountRoleByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByEmailAddress(
    config,
    externalReferenceCode,
    accountRoleExternalReferenceCode,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/account-roles/by-external-reference-code/${accountRoleExternalReferenceCode}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'deleteAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByEmailAddress',
      friendly:
        'Generated method deleteAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByEmailAddress(
    config,
    externalReferenceCode,
    accountRoleExternalReferenceCode,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/account-roles/by-external-reference-code/${accountRoleExternalReferenceCode}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'postAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByEmailAddress',
      friendly:
        'Generated method postAccountByExternalReferenceCodeAccountRoleByExternalReferenceCodeUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * deleteAccountByExternalReferenceCodeAccountRoleUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountByExternalReferenceCodeAccountRoleUserAccountByEmailAddress(
    config,
    externalReferenceCode,
    accountRoleId,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/account-roles/${accountRoleId}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'deleteAccountByExternalReferenceCodeAccountRoleUserAccountByEmailAddress',
      friendly:
        'Generated method deleteAccountByExternalReferenceCodeAccountRoleUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postAccountByExternalReferenceCodeAccountRoleUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountByExternalReferenceCodeAccountRoleUserAccountByEmailAddress(
    config,
    externalReferenceCode,
    accountRoleId,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/account-roles/${accountRoleId}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'postAccountByExternalReferenceCodeAccountRoleUserAccountByEmailAddress',
      friendly:
        'Generated method postAccountByExternalReferenceCodeAccountRoleUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodeEmailAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodeEmailAddressesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/email-addresses`,
      data,
      op: 'getAccountByExternalReferenceCodeEmailAddressesPage',
      friendly:
        'Generated method getAccountByExternalReferenceCodeEmailAddressesPage failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodeOrganizationsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodeOrganizationsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/organizations`,
      data,
      op: 'getAccountByExternalReferenceCodeOrganizationsPage',
      friendly:
        'Generated method getAccountByExternalReferenceCodeOrganizationsPage failed',
      ...opts,
    });
  }

  /**
   * deleteAccountByExternalReferenceCodeOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountByExternalReferenceCodeOrganization(
    config,
    externalReferenceCode,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/organizations/${organizationId}`,
      data,
      op: 'deleteAccountByExternalReferenceCodeOrganization',
      friendly:
        'Generated method deleteAccountByExternalReferenceCodeOrganization failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodeOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodeOrganization(
    config,
    externalReferenceCode,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/organizations/${organizationId}`,
      data,
      op: 'getAccountByExternalReferenceCodeOrganization',
      friendly:
        'Generated method getAccountByExternalReferenceCodeOrganization failed',
      ...opts,
    });
  }

  /**
   * postAccountByExternalReferenceCodeOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountByExternalReferenceCodeOrganization(
    config,
    externalReferenceCode,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/organizations/${organizationId}`,
      data,
      op: 'postAccountByExternalReferenceCodeOrganization',
      friendly:
        'Generated method postAccountByExternalReferenceCodeOrganization failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodePhonesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodePhonesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/phones`,
      data,
      op: 'getAccountByExternalReferenceCodePhonesPage',
      friendly:
        'Generated method getAccountByExternalReferenceCodePhonesPage failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodePostalAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodePostalAddressesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/postal-addresses`,
      data,
      op: 'getAccountByExternalReferenceCodePostalAddressesPage',
      friendly:
        'Generated method getAccountByExternalReferenceCodePostalAddressesPage failed',
      ...opts,
    });
  }

  /**
   * getAccountUserAccountsByExternalReferenceCodePage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountUserAccountsByExternalReferenceCodePage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/user-accounts`,
      data,
      op: 'getAccountUserAccountsByExternalReferenceCodePage',
      friendly:
        'Generated method getAccountUserAccountsByExternalReferenceCodePage failed',
      ...opts,
    });
  }

  /**
   * postAccountUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountUserAccountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/user-accounts`,
      data,
      op: 'postAccountUserAccountByExternalReferenceCode',
      friendly:
        'Generated method postAccountUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteAccountUserAccountsByExternalReferenceCodeByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountUserAccountsByExternalReferenceCodeByEmailAddress(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/user-accounts/by-email-address`,
      data,
      op: 'deleteAccountUserAccountsByExternalReferenceCodeByEmailAddress',
      friendly:
        'Generated method deleteAccountUserAccountsByExternalReferenceCodeByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postAccountUserAccountsByExternalReferenceCodeByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountUserAccountsByExternalReferenceCodeByEmailAddress(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/user-accounts/by-email-address`,
      data,
      op: 'postAccountUserAccountsByExternalReferenceCodeByEmailAddress',
      friendly:
        'Generated method postAccountUserAccountsByExternalReferenceCodeByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * deleteAccountUserAccountByExternalReferenceCodeByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountUserAccountByExternalReferenceCodeByEmailAddress(
    config,
    externalReferenceCode,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'deleteAccountUserAccountByExternalReferenceCodeByEmailAddress',
      friendly:
        'Generated method deleteAccountUserAccountByExternalReferenceCodeByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postAccountUserAccountByExternalReferenceCodeByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountUserAccountByExternalReferenceCodeByEmailAddress(
    config,
    externalReferenceCode,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'postAccountUserAccountByExternalReferenceCodeByEmailAddress',
      friendly:
        'Generated method postAccountUserAccountByExternalReferenceCodeByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodeUserAccountByEmailAddressAccountRolesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodeUserAccountByEmailAddressAccountRolesPage(
    config,
    externalReferenceCode,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/user-accounts/by-email-address/${emailAddress}/account-roles`,
      data,
      op: 'getAccountByExternalReferenceCodeUserAccountByEmailAddressAccountRolesPage',
      friendly:
        'Generated method getAccountByExternalReferenceCodeUserAccountByEmailAddressAccountRolesPage failed',
      ...opts,
    });
  }

  /**
   * getAccountByExternalReferenceCodeWebUrlsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountByExternalReferenceCodeWebUrlsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/by-external-reference-code/${externalReferenceCode}/web-urls`,
      data,
      op: 'getAccountByExternalReferenceCodeWebUrlsPage',
      friendly:
        'Generated method getAccountByExternalReferenceCodeWebUrlsPage failed',
      ...opts,
    });
  }

  /**
   * postAccountsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/export-batch`,
      data,
      op: 'postAccountsPageExportBatch',
      friendly: 'Generated method postAccountsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccount(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}`,
      data,
      op: 'deleteAccount',
      friendly: 'Generated method deleteAccount failed',
      ...opts,
    });
  }

  /**
   * getAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccount(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}`,
      data,
      op: 'getAccount',
      friendly: 'Generated method getAccount failed',
      ...opts,
    });
  }

  /**
   * patchAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchAccount(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}`,
      data,
      op: 'patchAccount',
      friendly: 'Generated method patchAccount failed',
      ...opts,
    });
  }

  /**
   * putAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putAccount(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}`,
      data,
      op: 'putAccount',
      friendly: 'Generated method putAccount failed',
      ...opts,
    });
  }

  /**
   * getAccountAccountGroupsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountAccountGroupsPage(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/account-groups`,
      data,
      op: 'getAccountAccountGroupsPage',
      friendly: 'Generated method getAccountAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postAccountAccountGroupsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountAccountGroupsPageExportBatch(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/account-groups/export-batch`,
      data,
      op: 'postAccountAccountGroupsPageExportBatch',
      friendly:
        'Generated method postAccountAccountGroupsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAccountAccountRolesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountAccountRolesPage(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/account-roles`,
      data,
      op: 'getAccountAccountRolesPage',
      friendly: 'Generated method getAccountAccountRolesPage failed',
      ...opts,
    });
  }

  /**
   * postAccountAccountRole
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountAccountRole(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/account-roles`,
      data,
      op: 'postAccountAccountRole',
      friendly: 'Generated method postAccountAccountRole failed',
      ...opts,
    });
  }

  /**
   * postAccountAccountRoleBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountAccountRoleBatch(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/account-roles/batch`,
      data,
      op: 'postAccountAccountRoleBatch',
      friendly: 'Generated method postAccountAccountRoleBatch failed',
      ...opts,
    });
  }

  /**
   * postAccountAccountRolesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountAccountRolesPageExportBatch(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/account-roles/export-batch`,
      data,
      op: 'postAccountAccountRolesPageExportBatch',
      friendly:
        'Generated method postAccountAccountRolesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAccountAccountRoleUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountAccountRoleUserAccountAssociation(
    config,
    accountId,
    accountRoleId,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/account-roles/${accountRoleId}/user-accounts/${userAccountId}`,
      data,
      op: 'deleteAccountAccountRoleUserAccountAssociation',
      friendly:
        'Generated method deleteAccountAccountRoleUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * postAccountAccountRoleUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountAccountRoleUserAccountAssociation(
    config,
    accountId,
    accountRoleId,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/account-roles/${accountRoleId}/user-accounts/${userAccountId}`,
      data,
      op: 'postAccountAccountRoleUserAccountAssociation',
      friendly:
        'Generated method postAccountAccountRoleUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * getAccountAccountToCommerceReturnItemsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountAccountToCommerceReturnItemsPage(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/accountToCommerceReturnItems`,
      data,
      op: 'getAccountAccountToCommerceReturnItemsPage',
      friendly:
        'Generated method getAccountAccountToCommerceReturnItemsPage failed',
      ...opts,
    });
  }

  /**
   * deleteAccountAccountToCommerceReturnItems
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountAccountToCommerceReturnItems(
    config,
    accountId,
    commerceReturnItemId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/accountToCommerceReturnItems/${commerceReturnItemId}`,
      data,
      op: 'deleteAccountAccountToCommerceReturnItems',
      friendly:
        'Generated method deleteAccountAccountToCommerceReturnItems failed',
      ...opts,
    });
  }

  /**
   * putAccountAccountToCommerceReturnItems
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putAccountAccountToCommerceReturnItems(
    config,
    accountId,
    commerceReturnItemId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/accountToCommerceReturnItems/${commerceReturnItemId}`,
      data,
      op: 'putAccountAccountToCommerceReturnItems',
      friendly:
        'Generated method putAccountAccountToCommerceReturnItems failed',
      ...opts,
    });
  }

  /**
   * getAccountAccountToCommerceReturnsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountAccountToCommerceReturnsPage(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/accountToCommerceReturns`,
      data,
      op: 'getAccountAccountToCommerceReturnsPage',
      friendly:
        'Generated method getAccountAccountToCommerceReturnsPage failed',
      ...opts,
    });
  }

  /**
   * deleteAccountAccountToCommerceReturns
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountAccountToCommerceReturns(
    config,
    accountId,
    commerceReturnId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/accountToCommerceReturns/${commerceReturnId}`,
      data,
      op: 'deleteAccountAccountToCommerceReturns',
      friendly: 'Generated method deleteAccountAccountToCommerceReturns failed',
      ...opts,
    });
  }

  /**
   * putAccountAccountToCommerceReturns
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putAccountAccountToCommerceReturns(
    config,
    accountId,
    commerceReturnId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/accountToCommerceReturns/${commerceReturnId}`,
      data,
      op: 'putAccountAccountToCommerceReturns',
      friendly: 'Generated method putAccountAccountToCommerceReturns failed',
      ...opts,
    });
  }

  /**
   * getAccountEmailAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountEmailAddressesPage(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/email-addresses`,
      data,
      op: 'getAccountEmailAddressesPage',
      friendly: 'Generated method getAccountEmailAddressesPage failed',
      ...opts,
    });
  }

  /**
   * postAccountEmailAddressesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountEmailAddressesPageExportBatch(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/email-addresses/export-batch`,
      data,
      op: 'postAccountEmailAddressesPageExportBatch',
      friendly:
        'Generated method postAccountEmailAddressesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAccountOrganizationsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountOrganizationsPage(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/organizations`,
      data,
      op: 'getAccountOrganizationsPage',
      friendly: 'Generated method getAccountOrganizationsPage failed',
      ...opts,
    });
  }

  /**
   * postAccountOrganizationsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountOrganizationsPageExportBatch(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/organizations/export-batch`,
      data,
      op: 'postAccountOrganizationsPageExportBatch',
      friendly:
        'Generated method postAccountOrganizationsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAccountOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountOrganization(
    config,
    accountId,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/organizations/${organizationId}`,
      data,
      op: 'deleteAccountOrganization',
      friendly: 'Generated method deleteAccountOrganization failed',
      ...opts,
    });
  }

  /**
   * getAccountOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountOrganization(
    config,
    accountId,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/organizations/${organizationId}`,
      data,
      op: 'getAccountOrganization',
      friendly: 'Generated method getAccountOrganization failed',
      ...opts,
    });
  }

  /**
   * postAccountOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountOrganization(
    config,
    accountId,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/organizations/${organizationId}`,
      data,
      op: 'postAccountOrganization',
      friendly: 'Generated method postAccountOrganization failed',
      ...opts,
    });
  }

  /**
   * getAccountPhonesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountPhonesPage(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/phones`,
      data,
      op: 'getAccountPhonesPage',
      friendly: 'Generated method getAccountPhonesPage failed',
      ...opts,
    });
  }

  /**
   * postAccountPhonesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountPhonesPageExportBatch(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/phones/export-batch`,
      data,
      op: 'postAccountPhonesPageExportBatch',
      friendly: 'Generated method postAccountPhonesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAccountPostalAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountPostalAddressesPage(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/postal-addresses`,
      data,
      op: 'getAccountPostalAddressesPage',
      friendly: 'Generated method getAccountPostalAddressesPage failed',
      ...opts,
    });
  }

  /**
   * postAccountPostalAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountPostalAddress(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/postal-addresses`,
      data,
      op: 'postAccountPostalAddress',
      friendly: 'Generated method postAccountPostalAddress failed',
      ...opts,
    });
  }

  /**
   * postAccountPostalAddressBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountPostalAddressBatch(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/postal-addresses/batch`,
      data,
      op: 'postAccountPostalAddressBatch',
      friendly: 'Generated method postAccountPostalAddressBatch failed',
      ...opts,
    });
  }

  /**
   * postAccountPostalAddressesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountPostalAddressesPageExportBatch(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/postal-addresses/export-batch`,
      data,
      op: 'postAccountPostalAddressesPageExportBatch',
      friendly:
        'Generated method postAccountPostalAddressesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAccountUserAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountUserAccountsPage(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts`,
      data,
      op: 'getAccountUserAccountsPage',
      friendly: 'Generated method getAccountUserAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postAccountUserAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountUserAccount(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts`,
      data,
      op: 'postAccountUserAccount',
      friendly: 'Generated method postAccountUserAccount failed',
      ...opts,
    });
  }

  /**
   * postAccountUserAccountBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountUserAccountBatch(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts/batch`,
      data,
      op: 'postAccountUserAccountBatch',
      friendly: 'Generated method postAccountUserAccountBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAccountUserAccountsByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountUserAccountsByEmailAddress(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts/by-email-address`,
      data,
      op: 'deleteAccountUserAccountsByEmailAddress',
      friendly:
        'Generated method deleteAccountUserAccountsByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postAccountUserAccountsByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountUserAccountsByEmailAddress(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts/by-email-address`,
      data,
      op: 'postAccountUserAccountsByEmailAddress',
      friendly: 'Generated method postAccountUserAccountsByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * deleteAccountUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountUserAccountByEmailAddress(
    config,
    accountId,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'deleteAccountUserAccountByEmailAddress',
      friendly:
        'Generated method deleteAccountUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postAccountUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountUserAccountByEmailAddress(
    config,
    accountId,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'postAccountUserAccountByEmailAddress',
      friendly: 'Generated method postAccountUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postAccountUserAccountsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountUserAccountsPageExportBatch(
    config,
    accountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts/export-batch`,
      data,
      op: 'postAccountUserAccountsPageExportBatch',
      friendly:
        'Generated method postAccountUserAccountsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAccountUserAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteAccountUserAccount(
    config,
    accountId,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts/${userAccountId}`,
      data,
      op: 'deleteAccountUserAccount',
      friendly: 'Generated method deleteAccountUserAccount failed',
      ...opts,
    });
  }

  /**
   * getAccountUserAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountUserAccount(
    config,
    accountId,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/user-accounts/${userAccountId}`,
      data,
      op: 'getAccountUserAccount',
      friendly: 'Generated method getAccountUserAccount failed',
      ...opts,
    });
  }

  /**
   * getAccountWebUrlsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getAccountWebUrlsPage(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/web-urls`,
      data,
      op: 'getAccountWebUrlsPage',
      friendly: 'Generated method getAccountWebUrlsPage failed',
      ...opts,
    });
  }

  /**
   * postAccountWebUrlsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postAccountWebUrlsPageExportBatch(config, accountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/accounts/${accountId}/web-urls/export-batch`,
      data,
      op: 'postAccountWebUrlsPageExportBatch',
      friendly: 'Generated method postAccountWebUrlsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteEmailAddressBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteEmailAddressBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/email-addresses/batch`,
      data,
      op: 'deleteEmailAddressBatch',
      friendly: 'Generated method deleteEmailAddressBatch failed',
      ...opts,
    });
  }

  /**
   * deleteEmailAddressByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteEmailAddressByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/email-addresses/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteEmailAddressByExternalReferenceCode',
      friendly:
        'Generated method deleteEmailAddressByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getEmailAddressByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getEmailAddressByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/email-addresses/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getEmailAddressByExternalReferenceCode',
      friendly:
        'Generated method getEmailAddressByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchEmailAddressByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchEmailAddressByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/email-addresses/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchEmailAddressByExternalReferenceCode',
      friendly:
        'Generated method patchEmailAddressByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteEmailAddress(config, emailAddressId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/email-addresses/${emailAddressId}`,
      data,
      op: 'deleteEmailAddress',
      friendly: 'Generated method deleteEmailAddress failed',
      ...opts,
    });
  }

  /**
   * getEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getEmailAddress(config, emailAddressId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/email-addresses/${emailAddressId}`,
      data,
      op: 'getEmailAddress',
      friendly: 'Generated method getEmailAddress failed',
      ...opts,
    });
  }

  /**
   * patchEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchEmailAddress(config, emailAddressId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/email-addresses/${emailAddressId}`,
      data,
      op: 'patchEmailAddress',
      friendly: 'Generated method patchEmailAddress failed',
      ...opts,
    });
  }

  /**
   * getMyUserAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getMyUserAccount(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/my-user-account`,
      data,
      op: 'getMyUserAccount',
      friendly: 'Generated method getMyUserAccount failed',
      ...opts,
    });
  }

  /**
   * getMyUserAccountSharedAssetsSharedByMePage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getMyUserAccountSharedAssetsSharedByMePage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/my-user-account/shared-assets/shared-by-me`,
      data,
      op: 'getMyUserAccountSharedAssetsSharedByMePage',
      friendly:
        'Generated method getMyUserAccountSharedAssetsSharedByMePage failed',
      ...opts,
    });
  }

  /**
   * getMyUserAccountSharedAssetsSharedWithMePage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getMyUserAccountSharedAssetsSharedWithMePage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/my-user-account/shared-assets/shared-with-me`,
      data,
      op: 'getMyUserAccountSharedAssetsSharedWithMePage',
      friendly:
        'Generated method getMyUserAccountSharedAssetsSharedWithMePage failed',
      ...opts,
    });
  }

  /**
   * getMyUserAccountSitesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getMyUserAccountSitesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/my-user-account/sites`,
      data,
      op: 'getMyUserAccountSitesPage',
      friendly: 'Generated method getMyUserAccountSitesPage failed',
      ...opts,
    });
  }

  /**
   * getMyUserAccountSubscriptionsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getMyUserAccountSubscriptionsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/my-user-account/subscriptions`,
      data,
      op: 'getMyUserAccountSubscriptionsPage',
      friendly: 'Generated method getMyUserAccountSubscriptionsPage failed',
      ...opts,
    });
  }

  /**
   * deleteMyUserAccountSubscription
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteMyUserAccountSubscription(
    config,
    subscriptionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/my-user-account/subscriptions/${subscriptionId}`,
      data,
      op: 'deleteMyUserAccountSubscription',
      friendly: 'Generated method deleteMyUserAccountSubscription failed',
      ...opts,
    });
  }

  /**
   * getMyUserAccountSubscription
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getMyUserAccountSubscription(config, subscriptionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/my-user-account/subscriptions/${subscriptionId}`,
      data,
      op: 'getMyUserAccountSubscription',
      friendly: 'Generated method getMyUserAccountSubscription failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * getOrganizationsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations`,
      data,
      op: 'getOrganizationsPage',
      friendly: 'Generated method getOrganizationsPage failed',
      ...opts,
    });
  }

  /**
   * postOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganization(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations`,
      data,
      op: 'postOrganization',
      friendly: 'Generated method postOrganization failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/batch`,
      data,
      op: 'deleteOrganizationBatch',
      friendly: 'Generated method deleteOrganizationBatch failed',
      ...opts,
    });
  }

  /**
   * postOrganizationBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/batch`,
      data,
      op: 'postOrganizationBatch',
      friendly: 'Generated method postOrganizationBatch failed',
      ...opts,
    });
  }

  /**
   * putOrganizationBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putOrganizationBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/organizations/batch`,
      data,
      op: 'putOrganizationBatch',
      friendly: 'Generated method putOrganizationBatch failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteOrganizationByExternalReferenceCode',
      friendly:
        'Generated method deleteOrganizationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getOrganizationByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getOrganizationByExternalReferenceCode',
      friendly:
        'Generated method getOrganizationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchOrganizationByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchOrganizationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchOrganizationByExternalReferenceCode',
      friendly:
        'Generated method patchOrganizationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putOrganizationByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putOrganizationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putOrganizationByExternalReferenceCode',
      friendly:
        'Generated method putOrganizationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationByExternalReferenceCodeAccounts
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationByExternalReferenceCodeAccounts(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/accounts`,
      data,
      op: 'deleteOrganizationByExternalReferenceCodeAccounts',
      friendly:
        'Generated method deleteOrganizationByExternalReferenceCodeAccounts failed',
      ...opts,
    });
  }

  /**
   * getOrganizationByExternalReferenceCodeAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationByExternalReferenceCodeAccountsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/accounts`,
      data,
      op: 'getOrganizationByExternalReferenceCodeAccountsPage',
      friendly:
        'Generated method getOrganizationByExternalReferenceCodeAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postOrganizationByExternalReferenceCodeAccounts
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationByExternalReferenceCodeAccounts(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/accounts`,
      data,
      op: 'postOrganizationByExternalReferenceCodeAccounts',
      friendly:
        'Generated method postOrganizationByExternalReferenceCodeAccounts failed',
      ...opts,
    });
  }

  /**
   * getOrganizationByExternalReferenceCodeChildOrganizationsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationByExternalReferenceCodeChildOrganizationsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/child-organizations`,
      data,
      op: 'getOrganizationByExternalReferenceCodeChildOrganizationsPage',
      friendly:
        'Generated method getOrganizationByExternalReferenceCodeChildOrganizationsPage failed',
      ...opts,
    });
  }

  /**
   * getOrganizationByExternalReferenceCodeEmailAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationByExternalReferenceCodeEmailAddressesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/email-addresses`,
      data,
      op: 'getOrganizationByExternalReferenceCodeEmailAddressesPage',
      friendly:
        'Generated method getOrganizationByExternalReferenceCodeEmailAddressesPage failed',
      ...opts,
    });
  }

  /**
   * getOrganizationByExternalReferenceCodePhonesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationByExternalReferenceCodePhonesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/phones`,
      data,
      op: 'getOrganizationByExternalReferenceCodePhonesPage',
      friendly:
        'Generated method getOrganizationByExternalReferenceCodePhonesPage failed',
      ...opts,
    });
  }

  /**
   * getOrganizationByExternalReferenceCodePostalAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationByExternalReferenceCodePostalAddressesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/postal-addresses`,
      data,
      op: 'getOrganizationByExternalReferenceCodePostalAddressesPage',
      friendly:
        'Generated method getOrganizationByExternalReferenceCodePostalAddressesPage failed',
      ...opts,
    });
  }

  /**
   * getOrganizationByExternalReferenceCodeUserAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationByExternalReferenceCodeUserAccountsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/user-accounts`,
      data,
      op: 'getOrganizationByExternalReferenceCodeUserAccountsPage',
      friendly:
        'Generated method getOrganizationByExternalReferenceCodeUserAccountsPage failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationByExternalReferenceCodeUserAccountsByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationByExternalReferenceCodeUserAccountsByEmailAddress(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/user-accounts/by-email-address`,
      data,
      op: 'deleteOrganizationByExternalReferenceCodeUserAccountsByEmailAddress',
      friendly:
        'Generated method deleteOrganizationByExternalReferenceCodeUserAccountsByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postOrganizationByExternalReferenceCodeUserAccountsByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationByExternalReferenceCodeUserAccountsByEmailAddress(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/user-accounts/by-email-address`,
      data,
      op: 'postOrganizationByExternalReferenceCodeUserAccountsByEmailAddress',
      friendly:
        'Generated method postOrganizationByExternalReferenceCodeUserAccountsByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationByExternalReferenceCodeUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationByExternalReferenceCodeUserAccountByEmailAddress(
    config,
    externalReferenceCode,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'deleteOrganizationByExternalReferenceCodeUserAccountByEmailAddress',
      friendly:
        'Generated method deleteOrganizationByExternalReferenceCodeUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postOrganizationByExternalReferenceCodeUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationByExternalReferenceCodeUserAccountByEmailAddress(
    config,
    externalReferenceCode,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'postOrganizationByExternalReferenceCodeUserAccountByEmailAddress',
      friendly:
        'Generated method postOrganizationByExternalReferenceCodeUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * getOrganizationByExternalReferenceCodeWebUrlsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationByExternalReferenceCodeWebUrlsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${externalReferenceCode}/web-urls`,
      data,
      op: 'getOrganizationByExternalReferenceCodeWebUrlsPage',
      friendly:
        'Generated method getOrganizationByExternalReferenceCodeWebUrlsPage failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountByExternalReferenceCode(
    config,
    organizationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${organizationExternalReferenceCode}/accounts/by-external-reference-code`,
      data,
      op: 'deleteOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountByExternalReferenceCode',
      friendly:
        'Generated method deleteOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountsByExternalReferenceCodePage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountsByExternalReferenceCodePage(
    config,
    organizationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${organizationExternalReferenceCode}/accounts/by-external-reference-code`,
      data,
      op: 'getOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountsByExternalReferenceCodePage',
      friendly:
        'Generated method getOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountsByExternalReferenceCodePage failed',
      ...opts,
    });
  }

  /**
   * postOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountByExternalReferenceCode(
    config,
    organizationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/by-external-reference-code/${organizationExternalReferenceCode}/accounts/by-external-reference-code`,
      data,
      op: 'postOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountByExternalReferenceCode',
      friendly:
        'Generated method postOrganizationByExternalReferenceCodeOrganizationExternalReferenceCodeAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postOrganizationsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/export-batch`,
      data,
      op: 'postOrganizationsPageExportBatch',
      friendly: 'Generated method postOrganizationsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * patchOrganizationMoveAccounts
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchOrganizationMoveAccounts(
    config,
    sourceOrganizationId,
    targetOrganizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/organizations/move-accounts/${sourceOrganizationId}/${targetOrganizationId}`,
      data,
      op: 'patchOrganizationMoveAccounts',
      friendly: 'Generated method patchOrganizationMoveAccounts failed',
      ...opts,
    });
  }

  /**
   * patchOrganizationMoveAccountsByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchOrganizationMoveAccountsByExternalReferenceCode(
    config,
    sourceOrganizationId,
    targetOrganizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/organizations/move-accounts/${sourceOrganizationId}/${targetOrganizationId}/by-external-reference-code`,
      data,
      op: 'patchOrganizationMoveAccountsByExternalReferenceCode',
      friendly:
        'Generated method patchOrganizationMoveAccountsByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganization(config, organizationId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}`,
      data,
      op: 'deleteOrganization',
      friendly: 'Generated method deleteOrganization failed',
      ...opts,
    });
  }

  /**
   * getOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganization(config, organizationId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}`,
      data,
      op: 'getOrganization',
      friendly: 'Generated method getOrganization failed',
      ...opts,
    });
  }

  /**
   * patchOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchOrganization(config, organizationId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}`,
      data,
      op: 'patchOrganization',
      friendly: 'Generated method patchOrganization failed',
      ...opts,
    });
  }

  /**
   * putOrganization
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putOrganization(config, organizationId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}`,
      data,
      op: 'putOrganization',
      friendly: 'Generated method putOrganization failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationAccounts
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationAccounts(config, organizationId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/accounts`,
      data,
      op: 'deleteOrganizationAccounts',
      friendly: 'Generated method deleteOrganizationAccounts failed',
      ...opts,
    });
  }

  /**
   * getOrganizationAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationAccountsPage(config, organizationId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/accounts`,
      data,
      op: 'getOrganizationAccountsPage',
      friendly: 'Generated method getOrganizationAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postOrganizationAccounts
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationAccounts(config, organizationId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/accounts`,
      data,
      op: 'postOrganizationAccounts',
      friendly: 'Generated method postOrganizationAccounts failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationAccountsByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationAccountsByExternalReferenceCode(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/accounts/by-external-reference-code`,
      data,
      op: 'deleteOrganizationAccountsByExternalReferenceCode',
      friendly:
        'Generated method deleteOrganizationAccountsByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postOrganizationAccountsByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationAccountsByExternalReferenceCode(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/accounts/by-external-reference-code`,
      data,
      op: 'postOrganizationAccountsByExternalReferenceCode',
      friendly:
        'Generated method postOrganizationAccountsByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postOrganizationAccountsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationAccountsPageExportBatch(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/accounts/export-batch`,
      data,
      op: 'postOrganizationAccountsPageExportBatch',
      friendly:
        'Generated method postOrganizationAccountsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getOrganizationChildOrganizationsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationChildOrganizationsPage(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/child-organizations`,
      data,
      op: 'getOrganizationChildOrganizationsPage',
      friendly: 'Generated method getOrganizationChildOrganizationsPage failed',
      ...opts,
    });
  }

  /**
   * getOrganizationEmailAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationEmailAddressesPage(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/email-addresses`,
      data,
      op: 'getOrganizationEmailAddressesPage',
      friendly: 'Generated method getOrganizationEmailAddressesPage failed',
      ...opts,
    });
  }

  /**
   * postOrganizationEmailAddressesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationEmailAddressesPageExportBatch(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/email-addresses/export-batch`,
      data,
      op: 'postOrganizationEmailAddressesPageExportBatch',
      friendly:
        'Generated method postOrganizationEmailAddressesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getOrganizationPhonesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationPhonesPage(config, organizationId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/phones`,
      data,
      op: 'getOrganizationPhonesPage',
      friendly: 'Generated method getOrganizationPhonesPage failed',
      ...opts,
    });
  }

  /**
   * postOrganizationPhonesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationPhonesPageExportBatch(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/phones/export-batch`,
      data,
      op: 'postOrganizationPhonesPageExportBatch',
      friendly: 'Generated method postOrganizationPhonesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getOrganizationPostalAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationPostalAddressesPage(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/postal-addresses`,
      data,
      op: 'getOrganizationPostalAddressesPage',
      friendly: 'Generated method getOrganizationPostalAddressesPage failed',
      ...opts,
    });
  }

  /**
   * postOrganizationPostalAddressesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationPostalAddressesPageExportBatch(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/postal-addresses/export-batch`,
      data,
      op: 'postOrganizationPostalAddressesPageExportBatch',
      friendly:
        'Generated method postOrganizationPostalAddressesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getOrganizationUserAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationUserAccountsPage(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/user-accounts`,
      data,
      op: 'getOrganizationUserAccountsPage',
      friendly: 'Generated method getOrganizationUserAccountsPage failed',
      ...opts,
    });
  }

  /**
   * deleteUserAccountsByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserAccountsByEmailAddress(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/user-accounts/by-email-address`,
      data,
      op: 'deleteUserAccountsByEmailAddress',
      friendly: 'Generated method deleteUserAccountsByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postUserAccountsByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccountsByEmailAddress(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/user-accounts/by-email-address`,
      data,
      op: 'postUserAccountsByEmailAddress',
      friendly: 'Generated method postUserAccountsByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * deleteUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserAccountByEmailAddress(
    config,
    organizationId,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'deleteUserAccountByEmailAddress',
      friendly: 'Generated method deleteUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccountByEmailAddress(
    config,
    organizationId,
    emailAddress,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'postUserAccountByEmailAddress',
      friendly: 'Generated method postUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * postOrganizationUserAccountsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationUserAccountsPageExportBatch(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/user-accounts/export-batch`,
      data,
      op: 'postOrganizationUserAccountsPageExportBatch',
      friendly:
        'Generated method postOrganizationUserAccountsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getOrganizationWebUrlsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationWebUrlsPage(config, organizationId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/web-urls`,
      data,
      op: 'getOrganizationWebUrlsPage',
      friendly: 'Generated method getOrganizationWebUrlsPage failed',
      ...opts,
    });
  }

  /**
   * postOrganizationWebUrlsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationWebUrlsPageExportBatch(
    config,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/organizations/${organizationId}/web-urls/export-batch`,
      data,
      op: 'postOrganizationWebUrlsPageExportBatch',
      friendly:
        'Generated method postOrganizationWebUrlsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getOrganizationOrganizationsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getOrganizationOrganizationsPage(
    config,
    parentOrganizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/organizations/${parentOrganizationId}/organizations`,
      data,
      op: 'getOrganizationOrganizationsPage',
      friendly: 'Generated method getOrganizationOrganizationsPage failed',
      ...opts,
    });
  }

  /**
   * deletePhoneBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deletePhoneBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/phones/batch`,
      data,
      op: 'deletePhoneBatch',
      friendly: 'Generated method deletePhoneBatch failed',
      ...opts,
    });
  }

  /**
   * deletePhoneByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deletePhoneByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/phones/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deletePhoneByExternalReferenceCode',
      friendly: 'Generated method deletePhoneByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getPhoneByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getPhoneByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/phones/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getPhoneByExternalReferenceCode',
      friendly: 'Generated method getPhoneByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchPhoneByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchPhoneByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/phones/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchPhoneByExternalReferenceCode',
      friendly: 'Generated method patchPhoneByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deletePhone
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deletePhone(config, phoneId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/phones/${phoneId}`,
      data,
      op: 'deletePhone',
      friendly: 'Generated method deletePhone failed',
      ...opts,
    });
  }

  /**
   * getPhone
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getPhone(config, phoneId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/phones/${phoneId}`,
      data,
      op: 'getPhone',
      friendly: 'Generated method getPhone failed',
      ...opts,
    });
  }

  /**
   * patchPhone
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchPhone(config, phoneId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/phones/${phoneId}`,
      data,
      op: 'patchPhone',
      friendly: 'Generated method patchPhone failed',
      ...opts,
    });
  }

  /**
   * deletePostalAddressBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deletePostalAddressBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/postal-addresses/batch`,
      data,
      op: 'deletePostalAddressBatch',
      friendly: 'Generated method deletePostalAddressBatch failed',
      ...opts,
    });
  }

  /**
   * putPostalAddressBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putPostalAddressBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/postal-addresses/batch`,
      data,
      op: 'putPostalAddressBatch',
      friendly: 'Generated method putPostalAddressBatch failed',
      ...opts,
    });
  }

  /**
   * deletePostalAddressByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deletePostalAddressByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/postal-addresses/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deletePostalAddressByExternalReferenceCode',
      friendly:
        'Generated method deletePostalAddressByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getPostalAddressByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getPostalAddressByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/postal-addresses/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getPostalAddressByExternalReferenceCode',
      friendly:
        'Generated method getPostalAddressByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchPostalAddressByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchPostalAddressByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/postal-addresses/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchPostalAddressByExternalReferenceCode',
      friendly:
        'Generated method patchPostalAddressByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putPostalAddressByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putPostalAddressByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/postal-addresses/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putPostalAddressByExternalReferenceCode',
      friendly:
        'Generated method putPostalAddressByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deletePostalAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deletePostalAddress(config, postalAddressId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/postal-addresses/${postalAddressId}`,
      data,
      op: 'deletePostalAddress',
      friendly: 'Generated method deletePostalAddress failed',
      ...opts,
    });
  }

  /**
   * getPostalAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getPostalAddress(config, postalAddressId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/postal-addresses/${postalAddressId}`,
      data,
      op: 'getPostalAddress',
      friendly: 'Generated method getPostalAddress failed',
      ...opts,
    });
  }

  /**
   * patchPostalAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchPostalAddress(config, postalAddressId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/postal-addresses/${postalAddressId}`,
      data,
      op: 'patchPostalAddress',
      friendly: 'Generated method patchPostalAddress failed',
      ...opts,
    });
  }

  /**
   * putPostalAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putPostalAddress(config, postalAddressId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/postal-addresses/${postalAddressId}`,
      data,
      op: 'putPostalAddress',
      friendly: 'Generated method putPostalAddress failed',
      ...opts,
    });
  }

  /**
   * getRolesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getRolesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/roles`,
      data,
      op: 'getRolesPage',
      friendly: 'Generated method getRolesPage failed',
      ...opts,
    });
  }

  /**
   * postRole
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postRole(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/roles`,
      data,
      op: 'postRole',
      friendly: 'Generated method postRole failed',
      ...opts,
    });
  }

  /**
   * deleteRoleBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteRoleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/roles/batch`,
      data,
      op: 'deleteRoleBatch',
      friendly: 'Generated method deleteRoleBatch failed',
      ...opts,
    });
  }

  /**
   * postRoleBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postRoleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/roles/batch`,
      data,
      op: 'postRoleBatch',
      friendly: 'Generated method postRoleBatch failed',
      ...opts,
    });
  }

  /**
   * putRoleBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putRoleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/roles/batch`,
      data,
      op: 'putRoleBatch',
      friendly: 'Generated method putRoleBatch failed',
      ...opts,
    });
  }

  /**
   * deleteRoleByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteRoleByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteRoleByExternalReferenceCode',
      friendly: 'Generated method deleteRoleByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getRoleByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getRoleByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getRoleByExternalReferenceCode',
      friendly: 'Generated method getRoleByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchRoleByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchRoleByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchRoleByExternalReferenceCode',
      friendly: 'Generated method patchRoleByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putRoleByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putRoleByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putRoleByExternalReferenceCode',
      friendly: 'Generated method putRoleByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteRoleByExternalReferenceCodeUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteRoleByExternalReferenceCodeUserAccountAssociation(
    config,
    externalReferenceCode,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}/association/user-account/${userAccountId}`,
      data,
      op: 'deleteRoleByExternalReferenceCodeUserAccountAssociation',
      friendly:
        'Generated method deleteRoleByExternalReferenceCodeUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * postRoleByExternalReferenceCodeUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postRoleByExternalReferenceCodeUserAccountAssociation(
    config,
    externalReferenceCode,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}/association/user-account/${userAccountId}`,
      data,
      op: 'postRoleByExternalReferenceCodeUserAccountAssociation',
      friendly:
        'Generated method postRoleByExternalReferenceCodeUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationRoleByExternalReferenceCodeUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationRoleByExternalReferenceCodeUserAccountAssociation(
    config,
    externalReferenceCode,
    userAccountId,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}/association/user-account/${userAccountId}/organization/${organizationId}`,
      data,
      op: 'deleteOrganizationRoleByExternalReferenceCodeUserAccountAssociation',
      friendly:
        'Generated method deleteOrganizationRoleByExternalReferenceCodeUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * postOrganizationRoleByExternalReferenceCodeUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationRoleByExternalReferenceCodeUserAccountAssociation(
    config,
    externalReferenceCode,
    userAccountId,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}/association/user-account/${userAccountId}/organization/${organizationId}`,
      data,
      op: 'postOrganizationRoleByExternalReferenceCodeUserAccountAssociation',
      friendly:
        'Generated method postOrganizationRoleByExternalReferenceCodeUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * deleteSiteRoleByExternalReferenceCodeUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteSiteRoleByExternalReferenceCodeUserAccountAssociation(
    config,
    externalReferenceCode,
    userAccountId,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}/association/user-account/${userAccountId}/site/${siteId}`,
      data,
      op: 'deleteSiteRoleByExternalReferenceCodeUserAccountAssociation',
      friendly:
        'Generated method deleteSiteRoleByExternalReferenceCodeUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * postSiteRoleByExternalReferenceCodeUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postSiteRoleByExternalReferenceCodeUserAccountAssociation(
    config,
    externalReferenceCode,
    userAccountId,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/roles/by-external-reference-code/${externalReferenceCode}/association/user-account/${userAccountId}/site/${siteId}`,
      data,
      op: 'postSiteRoleByExternalReferenceCodeUserAccountAssociation',
      friendly:
        'Generated method postSiteRoleByExternalReferenceCodeUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * postRolesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postRolesPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/roles/export-batch`,
      data,
      op: 'postRolesPageExportBatch',
      friendly: 'Generated method postRolesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteRole
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteRole(config, roleId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}`,
      data,
      op: 'deleteRole',
      friendly: 'Generated method deleteRole failed',
      ...opts,
    });
  }

  /**
   * getRole
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getRole(config, roleId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}`,
      data,
      op: 'getRole',
      friendly: 'Generated method getRole failed',
      ...opts,
    });
  }

  /**
   * patchRole
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchRole(config, roleId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}`,
      data,
      op: 'patchRole',
      friendly: 'Generated method patchRole failed',
      ...opts,
    });
  }

  /**
   * putRole
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putRole(config, roleId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}`,
      data,
      op: 'putRole',
      friendly: 'Generated method putRole failed',
      ...opts,
    });
  }

  /**
   * deleteRoleUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteRoleUserAccountAssociation(
    config,
    roleId,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}/association/user-account/${userAccountId}`,
      data,
      op: 'deleteRoleUserAccountAssociation',
      friendly: 'Generated method deleteRoleUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * postRoleUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postRoleUserAccountAssociation(
    config,
    roleId,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}/association/user-account/${userAccountId}`,
      data,
      op: 'postRoleUserAccountAssociation',
      friendly: 'Generated method postRoleUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * deleteOrganizationRoleUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteOrganizationRoleUserAccountAssociation(
    config,
    roleId,
    userAccountId,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}/association/user-account/${userAccountId}/organization/${organizationId}`,
      data,
      op: 'deleteOrganizationRoleUserAccountAssociation',
      friendly:
        'Generated method deleteOrganizationRoleUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * postOrganizationRoleUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postOrganizationRoleUserAccountAssociation(
    config,
    roleId,
    userAccountId,
    organizationId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}/association/user-account/${userAccountId}/organization/${organizationId}`,
      data,
      op: 'postOrganizationRoleUserAccountAssociation',
      friendly:
        'Generated method postOrganizationRoleUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * deleteSiteRoleUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteSiteRoleUserAccountAssociation(
    config,
    roleId,
    userAccountId,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}/association/user-account/${userAccountId}/site/${siteId}`,
      data,
      op: 'deleteSiteRoleUserAccountAssociation',
      friendly: 'Generated method deleteSiteRoleUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * postSiteRoleUserAccountAssociation
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postSiteRoleUserAccountAssociation(
    config,
    roleId,
    userAccountId,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/roles/${roleId}/association/user-account/${userAccountId}/site/${siteId}`,
      data,
      op: 'postSiteRoleUserAccountAssociation',
      friendly: 'Generated method postSiteRoleUserAccountAssociation failed',
      ...opts,
    });
  }

  /**
   * getSegmentUserAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getSegmentUserAccountsPage(config, segmentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/segments/${segmentId}/user-accounts`,
      data,
      op: 'getSegmentUserAccountsPage',
      friendly: 'Generated method getSegmentUserAccountsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteByFriendlyUrlPath
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getSiteByFriendlyUrlPath(config, friendlyUrlPath, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/sites/by-friendly-url-path/${friendlyUrlPath}`,
      data,
      op: 'getSiteByFriendlyUrlPath',
      friendly: 'Generated method getSiteByFriendlyUrlPath failed',
      ...opts,
    });
  }

  /**
   * getSiteByFriendlyUrlPathAccountByExternalReferenceCodeAccountExternalReferenceCodeUserAccountByExternalReferenceCodeUserAccountExternalReferenceCodeSelected
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getSiteByFriendlyUrlPathAccountByExternalReferenceCodeAccountExternalReferenceCodeUserAccountByExternalReferenceCodeUserAccountExternalReferenceCodeSelected(
    config,
    friendlyUrlPath,
    accountExternalReferenceCode,
    userAccountExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/sites/by-friendly-url-path/${friendlyUrlPath}/accounts/by-external-reference-code/${accountExternalReferenceCode}/user-accounts/by-external-reference-code/${userAccountExternalReferenceCode}/selected`,
      data,
      op: 'getSiteByFriendlyUrlPathAccountByExternalReferenceCodeAccountExternalReferenceCodeUserAccountByExternalReferenceCodeUserAccountExternalReferenceCodeSelected',
      friendly:
        'Generated method getSiteByFriendlyUrlPathAccountByExternalReferenceCodeAccountExternalReferenceCodeUserAccountByExternalReferenceCodeUserAccountExternalReferenceCodeSelected failed',
      ...opts,
    });
  }

  /**
   * patchSiteByFriendlyUrlPathAccountByExternalReferenceCodeAccountExternalReferenceCodeUserAccountByExternalReferenceCodeUserAccountExternalReferenceCodeSelected
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchSiteByFriendlyUrlPathAccountByExternalReferenceCodeAccountExternalReferenceCodeUserAccountByExternalReferenceCodeUserAccountExternalReferenceCodeSelected(
    config,
    friendlyUrlPath,
    accountExternalReferenceCode,
    userAccountExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/sites/by-friendly-url-path/${friendlyUrlPath}/accounts/by-external-reference-code/${accountExternalReferenceCode}/user-accounts/by-external-reference-code/${userAccountExternalReferenceCode}/selected`,
      data,
      op: 'patchSiteByFriendlyUrlPathAccountByExternalReferenceCodeAccountExternalReferenceCodeUserAccountByExternalReferenceCodeUserAccountExternalReferenceCodeSelected',
      friendly:
        'Generated method patchSiteByFriendlyUrlPathAccountByExternalReferenceCodeAccountExternalReferenceCodeUserAccountByExternalReferenceCodeUserAccountExternalReferenceCodeSelected failed',
      ...opts,
    });
  }

  /**
   * getSite
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getSite(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/sites/${siteId}`,
      data,
      op: 'getSite',
      friendly: 'Generated method getSite failed',
      ...opts,
    });
  }

  /**
   * getSiteAccountUserAccountSelected
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getSiteAccountUserAccountSelected(
    config,
    siteId,
    accountId,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/sites/${siteId}/accounts/${accountId}/user-accounts/${userAccountId}/selected`,
      data,
      op: 'getSiteAccountUserAccountSelected',
      friendly: 'Generated method getSiteAccountUserAccountSelected failed',
      ...opts,
    });
  }

  /**
   * patchSiteAccountUserAccountSelected
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchSiteAccountUserAccountSelected(
    config,
    siteId,
    accountId,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/sites/${siteId}/accounts/${accountId}/user-accounts/${userAccountId}/selected`,
      data,
      op: 'patchSiteAccountUserAccountSelected',
      friendly: 'Generated method patchSiteAccountUserAccountSelected failed',
      ...opts,
    });
  }

  /**
   * getSiteSegmentsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getSiteSegmentsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/sites/${siteId}/segments`,
      data,
      op: 'getSiteSegmentsPage',
      friendly: 'Generated method getSiteSegmentsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteSegmentsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postSiteSegmentsPageExportBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/sites/${siteId}/segments/export-batch`,
      data,
      op: 'postSiteSegmentsPageExportBatch',
      friendly: 'Generated method postSiteSegmentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteUserAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getSiteUserAccountsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/sites/${siteId}/user-accounts`,
      data,
      op: 'getSiteUserAccountsPage',
      friendly: 'Generated method getSiteUserAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteUserAccountsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postSiteUserAccountsPageExportBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/sites/${siteId}/user-accounts/export-batch`,
      data,
      op: 'postSiteUserAccountsPageExportBatch',
      friendly: 'Generated method postSiteUserAccountsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteUserAccountSegmentsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getSiteUserAccountSegmentsPage(
    config,
    siteId,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/sites/${siteId}/user-accounts/${userAccountId}/segments`,
      data,
      op: 'getSiteUserAccountSegmentsPage',
      friendly: 'Generated method getSiteUserAccountSegmentsPage failed',
      ...opts,
    });
  }

  /**
   * getUserAccountFullNameDefinition
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountFullNameDefinition(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-account-full-name-definition`,
      data,
      op: 'getUserAccountFullNameDefinition',
      friendly: 'Generated method getUserAccountFullNameDefinition failed',
      ...opts,
    });
  }

  /**
   * getUserAccountsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts`,
      data,
      op: 'getUserAccountsPage',
      friendly: 'Generated method getUserAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postUserAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccount(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-accounts`,
      data,
      op: 'postUserAccount',
      friendly: 'Generated method postUserAccount failed',
      ...opts,
    });
  }

  /**
   * deleteUserAccountBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/user-accounts/batch`,
      data,
      op: 'deleteUserAccountBatch',
      friendly: 'Generated method deleteUserAccountBatch failed',
      ...opts,
    });
  }

  /**
   * postUserAccountBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-accounts/batch`,
      data,
      op: 'postUserAccountBatch',
      friendly: 'Generated method postUserAccountBatch failed',
      ...opts,
    });
  }

  /**
   * putUserAccountBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putUserAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/user-accounts/batch`,
      data,
      op: 'putUserAccountBatch',
      friendly: 'Generated method putUserAccountBatch failed',
      ...opts,
    });
  }

  /**
   * getUserAccountByEmailAddress
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountByEmailAddress(config, emailAddress, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-email-address/${emailAddress}`,
      data,
      op: 'getUserAccountByEmailAddress',
      friendly: 'Generated method getUserAccountByEmailAddress failed',
      ...opts,
    });
  }

  /**
   * deleteUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserAccountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteUserAccountByExternalReferenceCode',
      friendly:
        'Generated method deleteUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getUserAccountByExternalReferenceCode',
      friendly: 'Generated method getUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchUserAccountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchUserAccountByExternalReferenceCode',
      friendly:
        'Generated method patchUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putUserAccountByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putUserAccountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putUserAccountByExternalReferenceCode',
      friendly: 'Generated method putUserAccountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getUserAccountByExternalReferenceCodeEmailAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountByExternalReferenceCodeEmailAddressesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-external-reference-code/${externalReferenceCode}/email-addresses`,
      data,
      op: 'getUserAccountByExternalReferenceCodeEmailAddressesPage',
      friendly:
        'Generated method getUserAccountByExternalReferenceCodeEmailAddressesPage failed',
      ...opts,
    });
  }

  /**
   * getUserAccountByExternalReferenceCodePhonesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountByExternalReferenceCodePhonesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-external-reference-code/${externalReferenceCode}/phones`,
      data,
      op: 'getUserAccountByExternalReferenceCodePhonesPage',
      friendly:
        'Generated method getUserAccountByExternalReferenceCodePhonesPage failed',
      ...opts,
    });
  }

  /**
   * getUserAccountByExternalReferenceCodePostalAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountByExternalReferenceCodePostalAddressesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-external-reference-code/${externalReferenceCode}/postal-addresses`,
      data,
      op: 'getUserAccountByExternalReferenceCodePostalAddressesPage',
      friendly:
        'Generated method getUserAccountByExternalReferenceCodePostalAddressesPage failed',
      ...opts,
    });
  }

  /**
   * getUserAccountByExternalReferenceCodeWebUrlsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountByExternalReferenceCodeWebUrlsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-external-reference-code/${externalReferenceCode}/web-urls`,
      data,
      op: 'getUserAccountByExternalReferenceCodeWebUrlsPage',
      friendly:
        'Generated method getUserAccountByExternalReferenceCodeWebUrlsPage failed',
      ...opts,
    });
  }

  /**
   * getUserAccountsByStatusPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountsByStatusPage(config, status, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/by-status/${status}`,
      data,
      op: 'getUserAccountsByStatusPage',
      friendly: 'Generated method getUserAccountsByStatusPage failed',
      ...opts,
    });
  }

  /**
   * postUserAccountsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccountsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-accounts/export-batch`,
      data,
      op: 'postUserAccountsPageExportBatch',
      friendly: 'Generated method postUserAccountsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteUserAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserAccount(config, userAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}`,
      data,
      op: 'deleteUserAccount',
      friendly: 'Generated method deleteUserAccount failed',
      ...opts,
    });
  }

  /**
   * getUserAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccount(config, userAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}`,
      data,
      op: 'getUserAccount',
      friendly: 'Generated method getUserAccount failed',
      ...opts,
    });
  }

  /**
   * patchUserAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchUserAccount(config, userAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}`,
      data,
      op: 'patchUserAccount',
      friendly: 'Generated method patchUserAccount failed',
      ...opts,
    });
  }

  /**
   * putUserAccount
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putUserAccount(config, userAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}`,
      data,
      op: 'putUserAccount',
      friendly: 'Generated method putUserAccount failed',
      ...opts,
    });
  }

  /**
   * getUserAccountEmailAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountEmailAddressesPage(
    config,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/email-addresses`,
      data,
      op: 'getUserAccountEmailAddressesPage',
      friendly: 'Generated method getUserAccountEmailAddressesPage failed',
      ...opts,
    });
  }

  /**
   * postUserAccountEmailAddressesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccountEmailAddressesPageExportBatch(
    config,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/email-addresses/export-batch`,
      data,
      op: 'postUserAccountEmailAddressesPageExportBatch',
      friendly:
        'Generated method postUserAccountEmailAddressesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getUserAccountEmailVerificationTicket
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountEmailVerificationTicket(
    config,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/email-verification-ticket`,
      data,
      op: 'getUserAccountEmailVerificationTicket',
      friendly: 'Generated method getUserAccountEmailVerificationTicket failed',
      ...opts,
    });
  }

  /**
   * postUserAccountImage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccountImage(config, userAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/image`,
      data,
      op: 'postUserAccountImage',
      friendly: 'Generated method postUserAccountImage failed',
      ...opts,
    });
  }

  /**
   * getUserAccountPasswordResetTicket
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountPasswordResetTicket(
    config,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/password-reset-ticket`,
      data,
      op: 'getUserAccountPasswordResetTicket',
      friendly: 'Generated method getUserAccountPasswordResetTicket failed',
      ...opts,
    });
  }

  /**
   * getUserAccountPhonesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountPhonesPage(config, userAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/phones`,
      data,
      op: 'getUserAccountPhonesPage',
      friendly: 'Generated method getUserAccountPhonesPage failed',
      ...opts,
    });
  }

  /**
   * postUserAccountPhonesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccountPhonesPageExportBatch(
    config,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/phones/export-batch`,
      data,
      op: 'postUserAccountPhonesPageExportBatch',
      friendly: 'Generated method postUserAccountPhonesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getUserAccountPostalAddressesPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountPostalAddressesPage(
    config,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/postal-addresses`,
      data,
      op: 'getUserAccountPostalAddressesPage',
      friendly: 'Generated method getUserAccountPostalAddressesPage failed',
      ...opts,
    });
  }

  /**
   * postUserAccountPostalAddressesPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccountPostalAddressesPageExportBatch(
    config,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/postal-addresses/export-batch`,
      data,
      op: 'postUserAccountPostalAddressesPageExportBatch',
      friendly:
        'Generated method postUserAccountPostalAddressesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getUserUserGroups
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserUserGroups(config, userAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/user-groups`,
      data,
      op: 'getUserUserGroups',
      friendly: 'Generated method getUserUserGroups failed',
      ...opts,
    });
  }

  /**
   * getUserAccountWebUrlsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserAccountWebUrlsPage(config, userAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/web-urls`,
      data,
      op: 'getUserAccountWebUrlsPage',
      friendly: 'Generated method getUserAccountWebUrlsPage failed',
      ...opts,
    });
  }

  /**
   * postUserAccountWebUrlsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserAccountWebUrlsPageExportBatch(
    config,
    userAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-accounts/${userAccountId}/web-urls/export-batch`,
      data,
      op: 'postUserAccountWebUrlsPageExportBatch',
      friendly: 'Generated method postUserAccountWebUrlsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getUserGroupsPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserGroupsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-groups`,
      data,
      op: 'getUserGroupsPage',
      friendly: 'Generated method getUserGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postUserGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserGroup(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-groups`,
      data,
      op: 'postUserGroup',
      friendly: 'Generated method postUserGroup failed',
      ...opts,
    });
  }

  /**
   * deleteUserGroupBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/user-groups/batch`,
      data,
      op: 'deleteUserGroupBatch',
      friendly: 'Generated method deleteUserGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postUserGroupBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-groups/batch`,
      data,
      op: 'postUserGroupBatch',
      friendly: 'Generated method postUserGroupBatch failed',
      ...opts,
    });
  }

  /**
   * putUserGroupBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putUserGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/user-groups/batch`,
      data,
      op: 'putUserGroupBatch',
      friendly: 'Generated method putUserGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deleteUserGroupByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/user-groups/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteUserGroupByExternalReferenceCode',
      friendly:
        'Generated method deleteUserGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getUserGroupByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-groups/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getUserGroupByExternalReferenceCode',
      friendly: 'Generated method getUserGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchUserGroupByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchUserGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/user-groups/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchUserGroupByExternalReferenceCode',
      friendly: 'Generated method patchUserGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putUserGroupByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putUserGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/user-groups/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putUserGroupByExternalReferenceCode',
      friendly: 'Generated method putUserGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteUserGroupByExternalReferenceCodeUsers
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserGroupByExternalReferenceCodeUsers(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/user-groups/by-external-reference-code/${externalReferenceCode}/user-group-users`,
      data,
      op: 'deleteUserGroupByExternalReferenceCodeUsers',
      friendly:
        'Generated method deleteUserGroupByExternalReferenceCodeUsers failed',
      ...opts,
    });
  }

  /**
   * getUserGroupByExternalReferenceCodeUsersPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserGroupByExternalReferenceCodeUsersPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-groups/by-external-reference-code/${externalReferenceCode}/user-group-users`,
      data,
      op: 'getUserGroupByExternalReferenceCodeUsersPage',
      friendly:
        'Generated method getUserGroupByExternalReferenceCodeUsersPage failed',
      ...opts,
    });
  }

  /**
   * postUserGroupByExternalReferenceCodeUsers
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserGroupByExternalReferenceCodeUsers(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-groups/by-external-reference-code/${externalReferenceCode}/user-group-users`,
      data,
      op: 'postUserGroupByExternalReferenceCodeUsers',
      friendly:
        'Generated method postUserGroupByExternalReferenceCodeUsers failed',
      ...opts,
    });
  }

  /**
   * postUserGroupsPageExportBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserGroupsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-groups/export-batch`,
      data,
      op: 'postUserGroupsPageExportBatch',
      friendly: 'Generated method postUserGroupsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteUserGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserGroup(config, userGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/user-groups/${userGroupId}`,
      data,
      op: 'deleteUserGroup',
      friendly: 'Generated method deleteUserGroup failed',
      ...opts,
    });
  }

  /**
   * getUserGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserGroup(config, userGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-groups/${userGroupId}`,
      data,
      op: 'getUserGroup',
      friendly: 'Generated method getUserGroup failed',
      ...opts,
    });
  }

  /**
   * patchUserGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchUserGroup(config, userGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/user-groups/${userGroupId}`,
      data,
      op: 'patchUserGroup',
      friendly: 'Generated method patchUserGroup failed',
      ...opts,
    });
  }

  /**
   * putUserGroup
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async putUserGroup(config, userGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-user/v1.0/user-groups/${userGroupId}`,
      data,
      op: 'putUserGroup',
      friendly: 'Generated method putUserGroup failed',
      ...opts,
    });
  }

  /**
   * deleteUserGroupUsers
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteUserGroupUsers(config, userGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/user-groups/${userGroupId}/user-group-users`,
      data,
      op: 'deleteUserGroupUsers',
      friendly: 'Generated method deleteUserGroupUsers failed',
      ...opts,
    });
  }

  /**
   * getUserGroupUsersPage
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getUserGroupUsersPage(config, userGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/user-groups/${userGroupId}/user-group-users`,
      data,
      op: 'getUserGroupUsersPage',
      friendly: 'Generated method getUserGroupUsersPage failed',
      ...opts,
    });
  }

  /**
   * postUserGroupUsers
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async postUserGroupUsers(config, userGroupId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-user/v1.0/user-groups/${userGroupId}/user-group-users`,
      data,
      op: 'postUserGroupUsers',
      friendly: 'Generated method postUserGroupUsers failed',
      ...opts,
    });
  }

  /**
   * deleteWebUrlBatch
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteWebUrlBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/web-urls/batch`,
      data,
      op: 'deleteWebUrlBatch',
      friendly: 'Generated method deleteWebUrlBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWebUrlByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteWebUrlByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/web-urls/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteWebUrlByExternalReferenceCode',
      friendly: 'Generated method deleteWebUrlByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getWebUrlByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getWebUrlByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/web-urls/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getWebUrlByExternalReferenceCode',
      friendly: 'Generated method getWebUrlByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchWebUrlByExternalReferenceCode
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchWebUrlByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/web-urls/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchWebUrlByExternalReferenceCode',
      friendly: 'Generated method patchWebUrlByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteWebUrl
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async deleteWebUrl(config, webUrlId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-user/v1.0/web-urls/${webUrlId}`,
      data,
      op: 'deleteWebUrl',
      friendly: 'Generated method deleteWebUrl failed',
      ...opts,
    });
  }

  /**
   * getWebUrl
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async getWebUrl(config, webUrlId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-user/v1.0/web-urls/${webUrlId}`,
      data,
      op: 'getWebUrl',
      friendly: 'Generated method getWebUrl failed',
      ...opts,
    });
  }

  /**
   * patchWebUrl
   * API: headless-admin-user-v1.0 | Version: v1.0
   */
  async patchWebUrl(config, webUrlId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-user/v1.0/web-urls/${webUrlId}`,
      data,
      op: 'patchWebUrl',
      friendly: 'Generated method patchWebUrl failed',
      ...opts,
    });
  }
}

module.exports = HeadlessAdminUserClient_v1_0;
