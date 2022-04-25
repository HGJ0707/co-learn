import request from "./request";


//老师登录
export async function teacherLogin(teacherLoginInfo) {
    return await request.post(`/api/login_teacher`, teacherLoginInfo);
}


//学生登录
export async function studentLogin(studentLoginInfo) {
    return await request.post(`/api/login_student`, studentLoginInfo);
}