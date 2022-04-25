import Mock from "mockjs";


// 发送弹幕
Mock.mock("/api/upload_barrage", "post", {
    code: 0,
    msg: "",
    data: null
})


// 获取所有弹幕
Mock.mock("/api/get_danmu_list", "post", {
    code: 0,
    msg: "",
    data: {
        list: [
            {

            }
        ]
    }
})