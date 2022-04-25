import request from "./request";


//提交注册信息
export async function postRegister(registerInfo) {
    return await request.post(`/api/register`, registerInfo);
}