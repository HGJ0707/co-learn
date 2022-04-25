import request from "./request";


//导入学生数据
export async function importStuData(stuInfo) {
    return await request.post(`/api/import_student_data`, stuInfo);
}


// 获取学生列表
export async function getStudentIdByClassId(class_ids) {
    return await request.post(`/api/get_student_id_by_class_id`, class_ids);
}


// 获取班级详细信息
export async function getClass() {
    return await request.get(`/api/get_all_class`);
}
