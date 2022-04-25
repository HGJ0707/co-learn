import request from "./request";


// 发送弹幕
export async function sendDanmu(danmuInfo) {
    return await request.post(`/api/upload_barrage`, danmuInfo);
}


// 获取所有弹幕
export async function getDanmuList(info) {
    return await request.post(`/api/get_danmu_list`, info);
}