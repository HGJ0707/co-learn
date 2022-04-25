import request from "./request";


// 创建课程
export async function createCourse(courseInfo) {
    return await request.post(`/api/create_course`, courseInfo);
}


// 删除课程
export async function deleteCourse(courseInfo) {
    return await request.post(`/api/delete_course`, courseInfo);
}


// 获取课程列表
export async function get_course_list(userInfo) {
    return await request.post(`/api/get_course_list`, userInfo);
}


// 获取课程详细数据
export async function getCourseAllData(course_id, data_type) {
    return await request.get(`/api/get_course_data`, {
        params: {
            course_id,
            data_type
        },
        responseType: 'arraybuffer',
    });
}


// 获取课程成绩
export async function getGrades(course_id) {
    return await request.post(`/api/get_grades_by_course_id`, course_id);
}


// 修改分数权重
export async function modifyGradeWeight(info) {
    return await request.post(`/api/modify_score_weight`, info);
}