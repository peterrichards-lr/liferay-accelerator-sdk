import re
import os

with open('src/liferay/rest.cjs', 'r') as f:
    content = f.read()

def get_method_body(method_name):
    # match start of method
    pattern = r'^  (?:async )?' + method_name + r'\(.*?\)\s*\{'
    match = re.search(pattern, content, re.MULTILINE | re.DOTALL)
    if not match: return None
    start = match.start()
    
    # count braces
    brace_count = 0
    in_string = False
    string_char = None
    in_comment = False
    
    i = match.end() - 1 # starts at the '{'
    
    while i < len(content):
        c = content[i]
        
        # Simple string/comment ignoring (not perfect but usually good enough)
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
                    return content[start:i+1]
        i += 1
    return None

def write_class(name, methods, file_path):
    bodies = []
    for m in methods:
        b = get_method_body(m)
        if b: bodies.append(b)
    
    class_def = f"class {name} {{\n  constructor(ctx) {{\n    this.ctx = ctx;\n  }}\n\n" + "\n\n".join(bodies) + f"\n}}\nmodule.exports = {name};\n"
    with open(file_path, 'w') as f:
        f.write(class_def)

write_class('HttpCoreService', ['_request', '_client', '_get', '_post', '_put', '_patch', '_delete', '_downloadFile', 'createAxiosInstance', 'testConnection'], 'src/liferay/rest/HttpCoreService.cjs')
write_class('BatchOperationService', ['_postBatch', '_collectPagedItems', '_collectPagedIds', '_chunkArray'], 'src/liferay/rest/BatchOperationService.cjs')
write_class('BatchDeleteService', ['_deleteBatchNative', '_deleteByBatch', '_deleteByIds', '_deleteBatchSimulated'], 'src/liferay/rest/BatchDeleteService.cjs')
write_class('MultipartService', ['_postMultipart', 'addProductImageMultipart', 'addProductDocumentAttachmentMultipart', 'addProductImage', 'addProductDocumentAttachment', 'addProductImageByBase64', 'addProductDocumentAttachmentByBase64', 'addProductImageDocumentLibrary', 'addProductDocumentAttachmentDocumentLibrary'], 'src/liferay/rest/MultipartService.cjs')
