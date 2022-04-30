import Mock from "mockjs";


//小文件上传
Mock.mock("/api/upload_file", "post", {
    code: 0,
    msg: "",
    data: {
        "url": "files/videos/258.mp4"
    }
})


//上传切片
Mock.mock("/api/upload_file_snippet", "post", {
    code: 0,
    msg: "",
    data: null
})


//查询已上传切片
// Mock.mock("/api/upload_check_snippet", "post", {
//     code: 0,
//     msg: "",
//     data: [
//         "qwer-0", "qwer-1"
//     ],
// })

Mock.mock("/api/upload_check_snippet", "post", {
    code: 0,
    msg: "",
    data: [],
})


//切片完成请求合并
Mock.mock("/api/upload_merge", "post", {
    code: 0,
    msg: "",
    data: {
        "url": "files/videos/258.mp4"
    }
})



// 获取上传签名
Mock.mock("/api/get_file_secret", "post", {
    code: 0,
    msg: "",
    data: {
        "signature": "dasdddddddddddddddddddddddd.dsaaaaaaaaaaaaaaaaaaaaaaaaaaa.dasssssssssssssssssssssssssssssssssssssssss.asddddddddddddd",
    }
})
