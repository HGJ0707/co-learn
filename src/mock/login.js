import Mock from "mockjs";

//模拟老师登录返回数据
Mock.mock("/api/login_teacher", "post", {
    code: 0,
    msg: "",
    data: {
        isTeacher: true,
        user_name: '张凌',
        user_id: '4234242',
        token: '42423423.432432424.32423423',
        uid: '312313131313221'
    }
})


//模拟学生登录返回数据
Mock.mock("/api/login_student", "post", {
    code: 0,
    msg: "",
    data: {
        isTeacher: false,
        user_name: '彭铭麒',
        user_id: '201840922107',
        token: '424238768423.432432424.324286783423',
        uid: '578768797897'
    }
})