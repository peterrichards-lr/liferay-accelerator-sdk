import re

with open('src/liferay/rest.cjs', 'r') as f:
    content = f.read()

methods_to_remove = [
    '_request', '_client', '_get', '_post', '_put', '_patch', '_delete', '_downloadFile', 'createAxiosInstance', 'testConnection',
    '_postBatch', '_collectPagedItems', '_collectPagedIds', '_chunkArray',
    '_deleteBatchNative', '_deleteByBatch', '_deleteByIds', '_deleteBatchSimulated',
    '_postMultipart', 'addProductImageMultipart', 'addProductDocumentAttachmentMultipart', 'addProductImage', 'addProductDocumentAttachment', 'addProductImageByBase64', 'addProductDocumentAttachmentByBase64', 'addProductImageDocumentLibrary', 'addProductDocumentAttachmentDocumentLibrary'
]

def get_method_body_bounds(method_name):
    pattern = r'^  (?:async )?' + method_name + r'\(.*?\)\s*\{'
    match = re.search(pattern, content, re.MULTILINE | re.DOTALL)
    if not match: return None
    start = match.start()
    
    brace_count = 0
    in_string = False
    string_char = None
    
    i = match.end() - 1 
    
    while i < len(content):
        c = content[i]
        
        if in_string:
            if c == '\\': i += 2; continue
            if c == string_char: in_string = False
        else:
            if c in '"\'`':
                in_string = True
                string_char = c
            elif c == '{':
                brace_count += 1
            elif c == '}':
                brace_count -= 1
                if brace_count == 0:
                    # check for trailing newline
                    end = i + 1
                    if end < len(content) and content[end] == '\n':
                        end += 1
                    if end < len(content) and content[end] == '\n':
                        end += 1
                    return (start, end)
        i += 1
    return None

for m in methods_to_remove:
    bounds = get_method_body_bounds(m)
    if bounds:
        content = content[:bounds[0]] + content[bounds[1]:]

# Now replace usages
replacements = [
  ('this._request(', 'this.httpCore._request('),
  ('this._get(', 'this.httpCore._get('),
  ('this._post(', 'this.httpCore._post('),
  ('this._put(', 'this.httpCore._put('),
  ('this._patch(', 'this.httpCore._patch('),
  ('this._delete(', 'this.httpCore._delete('),
  ('this._downloadFile(', 'this.httpCore._downloadFile('),
  ('this._postBatch(', 'this.batch._postBatch('),
  ('this._collectPagedItems(', 'this.batch._collectPagedItems('),
  ('this._collectPagedIds(', 'this.batch._collectPagedIds('),
  ('this._deleteBatchNative(', 'this.batchDelete._deleteBatchNative('),
  ('this._deleteByBatch(', 'this.batchDelete._deleteByBatch('),
  ('this._deleteByIds(', 'this.batchDelete._deleteByIds('),
  ('this._deleteBatchSimulated(', 'this.batchDelete._deleteBatchSimulated('),
  ('this._postMultipart(', 'this.multipart._postMultipart('),
  ('this.addProductImageMultipart(', 'this.multipart.addProductImageMultipart('),
  ('this.addProductDocumentAttachmentMultipart(', 'this.multipart.addProductDocumentAttachmentMultipart('),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('src/liferay/rest.cjs', 'w') as f:
    f.write(content)
print("Stripped methods and replaced usages.")
