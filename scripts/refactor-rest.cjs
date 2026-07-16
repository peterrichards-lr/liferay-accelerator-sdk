const fs = require('fs');
const path = require('path');

const REST_CJS_PATH = path.join(__dirname, '../src/liferay/rest.cjs');

let content = fs.readFileSync(REST_CJS_PATH, 'utf-8');

// Replace this._request, this._get, this._post, this._put, this._patch, this._delete
const replacements = [
  ['this._request(', 'this.httpCore._request('],
  ['this._get(', 'this.httpCore._get('],
  ['this._post(', 'this.httpCore._post('],
  ['this._put(', 'this.httpCore._put('],
  ['this._patch(', 'this.httpCore._patch('],
  ['this._delete(', 'this.httpCore._delete('],
  ['this._downloadFile(', 'this.httpCore._downloadFile('],
  ['this._postBatch(', 'this.batch._postBatch('],
  ['this._collectPagedItems(', 'this.batch._collectPagedItems('],
  ['this._collectPagedIds(', 'this.batch._collectPagedIds('],
  ['this._deleteBatchNative(', 'this.batchDelete._deleteBatchNative('],
  ['this._deleteByBatch(', 'this.batchDelete._deleteByBatch('],
  ['this._deleteByIds(', 'this.batchDelete._deleteByIds('],
  ['this._deleteBatchSimulated(', 'this.batchDelete._deleteBatchSimulated('],
  ['this._postMultipart(', 'this.multipart._postMultipart('],
  ['this.addProductImageMultipart(', 'this.multipart.addProductImageMultipart('],
  ['this.addProductDocumentAttachmentMultipart(', 'this.multipart.addProductDocumentAttachmentMultipart('],
];

for (const [find, replace] of replacements) {
  content = content.split(find).join(replace);
}

fs.writeFileSync(REST_CJS_PATH, content);
console.log('Replacements completed.');
