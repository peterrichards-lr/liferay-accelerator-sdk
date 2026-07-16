
const { asItems, asCount } = require("../../utils/liferayUtils.cjs");
const { delay, fromI18n } = require('../../utils/misc.cjs');
const { PATH } = require('../../utils/liferayPaths.cjs');
class AccountService {
  constructor(liferay) {
    this.liferay = liferay;
  }

  async getAccountGroups(
    config,
    {
      _pageSize = 200,
      fields = 'id,externalReferenceCode,name',
      filter: providedFilter,
      search,
    } = {}
  ) {
    const exclusions = await this.liferay._getExclusions(
      config,
      'account-group'
    );
    let { items } = await this.liferay._collectAllItems(
      config,
      (cfg, p, size) =>
        this.liferay.rest._get(
          cfg,
          PATH.ACCOUNT_GROUPS,
          'get-account-groups-bulk',
          'Get Account Groups Bulk',
          {
            params: {
              page: p,
              pageSize: size,
              fields,
            },
          }
        )
    );
    if (providedFilter) {
      const idMatch = providedFilter.match(/id eq (\d+)/);
      const ercMatch = providedFilter.match(
        /externalReferenceCode eq '([^']+)'/
      );
      if (idMatch) {
        const targetId = parseInt(idMatch[1], 10);
        items = items.filter((it) => it.id === targetId);
      } else if (ercMatch) {
        const targetErc = ercMatch[1];
        items = items.filter((it) => it.externalReferenceCode === targetErc);
      }
    }
    if (search) {
      const query = search.toLowerCase();
      items = items.filter(
        (it) =>
          it.name?.toLowerCase().includes(query) ||
          it.externalReferenceCode?.toLowerCase().includes(query)
      );
    }
    const filteredItems = items.filter(
      (it) => !this.liferay._shouldExclude(it, exclusions)
    );
    return {
      items: filteredItems,
      totalCount: filteredItems.length,
    };
  }

  async getAccounts(
    config,
    {
      channelId: _channelId,
      _pageSize = 200,
      fields = 'id,externalReferenceCode,name',
      filter: providedFilter,
      search,
    } = {}
  ) {
    const exclusions = await this.liferay._getExclusions(config, 'account');

    // HARDENING: Fetch all accounts without OData filters
    // (Liferay's Account API rejects 'id' and 'name' filters in many environments)
    let { items } = await this.liferay._collectAllItems(
      config,
      (cfg, p, size) =>
        this.liferay.rest._get(
          cfg,
          PATH.ACCOUNTS,
          'get-accounts-bulk',
          'Get Accounts Bulk',
          {
            params: {
              page: p,
              pageSize: size,
              fields,
            },
          }
        )
    );

    // Filter 1: Provided OData filter (Simulated in JS memory)
    // We only support simple "id eq" or "externalReferenceCode eq" simulation
    if (providedFilter) {
      const idMatch = providedFilter.match(/id eq (\d+)/);
      const ercMatch = providedFilter.match(
        /externalReferenceCode eq '([^']+)'/
      );
      if (idMatch) {
        const targetId = parseInt(idMatch[1], 10);
        items = items.filter((it) => it.id === targetId);
      } else if (ercMatch) {
        const targetErc = ercMatch[1];
        items = items.filter((it) => it.externalReferenceCode === targetErc);
      }
    }

    // Filter 2: Name Exclusions
    const filteredItems = items.filter(
      (it) => !this.liferay._shouldExclude(it, exclusions)
    );

    // Filter 3: Search Term
    const finalItems = search
      ? filteredItems.filter(
          (it) =>
            it.name?.toLowerCase().includes(search.toLowerCase()) ||
            it.externalReferenceCode
              ?.toLowerCase()
              .includes(search.toLowerCase())
        )
      : filteredItems;
    return {
      items: finalItems,
      totalCount: finalItems.length,
    };
  }

  async deleteAccountsBatch(
    config,
    {
      pageSize = 200,
      filter,
      search,
      ids,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
      channelId,
    } = {}
  ) {
    return this.liferay.deleteByFilter(config, {
      entityName: 'account',
      filter,
      search,
      ids,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      path: PATH.ACCOUNTS_BATCH,
      basePath: PATH.ACCOUNTS,
      listUrl: PATH.ACCOUNTS,
      op: 'accounts:batch-delete',
      friendly: 'Delete accounts (batch)',
      items,
      channelId,
    });
  }

  async deleteAccountGroupsBatch(
    config,
    {
      pageSize = 200,
      filter,
      search,
      ids,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
    } = {}
  ) {
    return this.liferay.deleteByFilter(config, {
      entityName: 'account-group',
      filter,
      search,
      ids,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      basePath: PATH.ACCOUNT_GROUPS,
      listUrl: PATH.ACCOUNT_GROUPS,
      op: 'account-groups:batch-delete',
      friendly: 'Delete account groups (batch)',
      items,
    });
  }

  getPrimaryAccountId(config) {
    return this.liferay.rest.getPrimaryAccountId(config);
  }

  getAccountCount(config) {
    return this.liferay.rest.getAccountCount(config);
  }

  createAccount(config, accountData) {
    return this.liferay.rest.createAccount(config, accountData);
  }

  patchAccount(config, accountId, accountData) {
    return this.liferay.rest.patchAccount(config, accountId, accountData);
  }

  patchAccountByERC(config, externalReferenceCode, accountData) {
    return this.liferay.rest.patchAccountByERC(
      config,
      externalReferenceCode,
      accountData
    );
  }

  getAccountByERC(config, externalReferenceCode) {
    return this.liferay.rest.getAccountByERC(config, externalReferenceCode);
  }

  getPostalAddressByERC(config, externalReferenceCode) {
    return this.liferay.rest.getPostalAddressByERC(
      config,
      externalReferenceCode
    );
  }

  createAccountAddress(config, accountId, addressData) {
    return this.liferay.rest.createAccountAddress(
      config,
      accountId,
      addressData
    );
  }

  createAccountAddressBatch(config, accountId, addressesData, opts) {
    return this.liferay.rest.createAccountAddressBatch(
      config,
      accountId,
      addressesData,
      opts
    );
  }

  createAccountsBatch(config, accountsData, opts) {
    return this.liferay.rest.createAccountsBatch(config, accountsData, opts);
  }

  createAccountGroup(config, accountGroupData) {
    return this.liferay.rest.createAccountGroup(config, accountGroupData);
  }

  getAccountGroupByERC(config, externalReferenceCode) {
    return this.liferay.rest.getAccountGroupByERC(
      config,
      externalReferenceCode
    );
  }

  assignAccountToGroup(config, groupERC, accountERC) {
    return this.liferay.rest.assignAccountToGroup(config, groupERC, accountERC);
  }

  setBillingAndShippingAddresses(
    config,
    accountId,
    shippingAddressId,
    billingAddressId
  ) {
    return this.liferay.rest.setBillingAndShippingAddresses(
      config,
      accountId,
      shippingAddressId,
      billingAddressId
    );
  }

  // Resilient Resolution Utility

  async getAccountsByERC(config, ercs, fields) {
    try {
      const results = await this.liferay.graphql.getAccountsByERC(
        config,
        ercs,
        fields
      );
      if (results && results.length > 0) return results;
      throw new Error('GraphQL returned empty results');
    } catch (error) {
      this.liferay.ctx.logger.warn(
        `GraphQL account resolution failed, falling back to REST: ${error.message}`
      );
      const res = await this.liferay.getAccounts(config, {
        pageSize: 500,
      });
      const items = res.items || [];
      return items.filter((a) => ercs.includes(a.externalReferenceCode));
    }
  }

  getPostalAddressesByERC(config, ercs, fields) {
    return this.liferay.graphql.getPostalAddressesByERC(config, ercs, fields);
  }
}
module.exports = AccountService;
