import request from "./request";


// 创建任务
export async function createTask(taskInfo) {
    return await request.post(`/api/create_task`, taskInfo);
}


// 删除任务
export async function deleteTask(taskInfo) {
    return await request.post(`/api/delete_task`, taskInfo);
}


// 编辑任务
export async function editTask(taskInfo) {
    return await request.post(`/api/update_task`, taskInfo);
}


// 获取任务列表
export async function getTaskList(course_id) {
    return await request.post(`/api/get_task_list`, course_id);
}


// 提交作业
export async function submitWork(workInfo) {
    return await request.post(`/api/submit_work`, workInfo);
}


// 获取作业Url
export async function getWorkUrl(info) {
    return await request.post(`/api/get_work_url`, info);
}

// 星级评分
export async function UploadStar(info) {
    return await request.post(`/api/upload_star`, info);
}


// 获取星级评分
export async function getStar(info) {
    return await request.post(`/api/get_star`, info);
}


// 作品点赞
export async function giveLikeToWork(info) {
    return await request.post(`/api/like_work`, info);
}


// 获取作品点赞
export async function getLikeToWork(info) {
    return await request.post(`/api/islike_work`, info);
}


// 获取热门作品
export async function getHotWorkList(info) {
    return await request.post(`/api/get_hot_work_list`, info);
}


// 获取作品详情（详情页）
export async function getWorkInfo(info) {
    return await request.post(`/api/get_work_info`, info);
}


// 作品浏览量
export async function workPageView(info) {
    return await request.post(`/api/work_page_view`, info);
}