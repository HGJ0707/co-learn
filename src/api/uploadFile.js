import request from "./request";


//小文件上传
export async function uploadFile(fileInfo) {
    return await request.post(`/api/upload_file`, fileInfo);
}


//上传切片
export async function uploadFileSnippet(snippet) {
    return await request.post(`/api/upload_file_snippet`, snippet);
}


//查询已上传切片
export async function uploadCheckSnippet(hash) {
    return await request.post(`/api/upload_check_snippet`, hash);
}


//切片完成请求合并
export async function uploadMerge(mergeInfo) {
    return await request.post(`/api/upload_merge`, mergeInfo);
}