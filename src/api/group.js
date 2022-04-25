import request from "./request";


//选择组员
export async function chooseGuys(memberInfo) {
    return await request.post(`/api/choose_guys`, memberInfo);
}


//删除组员
export async function deleteGuys(memberInfo) {
    return await request.post(`/api/delete_guys`, memberInfo);
}


// 修改组名
export async function modifyGroupName(groupInfo) {
    return await request.post(`/api/modify_group_name`, groupInfo);
}


// 分组列表
export async function getGroupListByTaskId(task_id) {
    return await request.post(`/api/get_group_list_by_task_id`, task_id);
}


// 获取小组成员(作品详情页用)
export async function getGroupMembers(info) {
    return await request.post(`/api/get_group_members`, info);
}
