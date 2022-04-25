import request from "./request";


// 提交评论
export async function sendComment(commentInfo) {
    return await request.post(`/api/upload_comment`, commentInfo);
}


// 提交老师评语
export async function uploadRemark(info) {
    return await request.post(`/api/upload_remark`, info);
}


// 获取评论
export async function getCommentList(workId) {
    return await request.post(`/api/get_comment`, workId);
}


// 评论点赞
export async function commentLike(commentInfo) {
    return await request.post(`/api/upload_comment_like`, commentInfo);
}


// 获取点赞列表
export async function getLikeList(info) {
    return await request.post(`/api/get_like_list`, info);
}




// 老师提交评论（不需要了）
export async function teacherSendComment(commentInfo) {
    return await request.post(`/api/teacher_upload_comment`, commentInfo);
}

// 回复评论（不需要了）
export async function commentReply(commentInfo) {
    return await request.post(`/api/reply_comment`, commentInfo);
}

// 回复点赞（不需要了）
export async function commentReplyLike(commentInfo) {
    return await request.post(`/api/upload_reply_like`, commentInfo);
}