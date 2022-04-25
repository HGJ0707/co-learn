import Mock from "mockjs";


// 老师提交评论（不需要了）
Mock.mock("/api/teacher_upload_comment", "post", {
    code: 0,
    msg: "",
    data: null
})


// 学生提交评论
Mock.mock("/api/upload_comment", "post", {
    code: 0,
    msg: "",
    data: null
})


// 老师评语
Mock.mock("/api/upload_remark", "post", {
    code: 0,
    msg: "",
    data: null
})


// 获取评论
Mock.mock("/api/get_comment", "post", {
    code: 0,
    msg: "",
    data: {
        "teacher_remark": [{
            "content": "这是一条老师评语123",
            "create_time": "2022-04-15 22:19:14",
            "teacher_name": "张凌"
        }],
        "comment_list": [{
                "comment_user_uid": 2,
                "id": 75,
                "comment_user": "吴景涛",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:46:41",
                "update_time": "2022-04-15 09:46:41",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            }, {
                "comment_user_uid": 2,
                "id": 78,
                "comment_user": "胡广俊",
                "content": "这是一条学生评论123",
                "like_count": 2,
                "work_id": 48,
                "create_time": "2022-04-15 09:48:33",
                "update_time": "2022-04-16 09:06:11",
                "state": 1,
                "parent_id": 75,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 99,
                "comment_user": "易武彪",
                "content": "这是一条学生评论444444444444444",
                "like_count": 2,
                "work_id": 48,
                "create_time": "2022-04-15 09:48:33",
                "update_time": "2022-04-16 09:06:11",
                "state": 1,
                "parent_id": 78,
                "student_name": "@cname",
                "reply_list": []
            },

            {
                "comment_user_uid": 2,
                "id": 76,
                "comment_user": "彭铭麒",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:47:51",
                "update_time": "2022-04-15 09:47:51",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 77,
                "comment_user": "陆品",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:48:28",
                "update_time": "2022-04-15 09:48:28",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 79,
                "comment_user": "李齐",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 22:32:18",
                "update_time": "2022-04-15 22:32:18",
                "state": 1,
                "parent_id": 75,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 7346,
                "comment_user": "彭铭麒",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:47:51",
                "update_time": "2022-04-15 09:47:51",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 747,
                "comment_user": "陆品",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:48:28",
                "update_time": "2022-04-15 09:48:28",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 279,
                "comment_user": "李齐",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 22:32:18",
                "update_time": "2022-04-15 22:32:18",
                "state": 1,
                "parent_id": 75,
                "student_name": "@cname",
                "reply_list": []
            }, {
                "comment_user_uid": 2,
                "id": 72,
                "comment_user": "彭铭麒",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:47:51",
                "update_time": "2022-04-15 09:47:51",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 477,
                "comment_user": "陆品",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:48:28",
                "update_time": "2022-04-15 09:48:28",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 739,
                "comment_user": "李齐",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 22:32:18",
                "update_time": "2022-04-15 22:32:18",
                "state": 1,
                "parent_id": 75,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 716,
                "comment_user": "彭铭麒",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:47:51",
                "update_time": "2022-04-15 09:47:51",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 774,
                "comment_user": "陆品",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:48:28",
                "update_time": "2022-04-15 09:48:28",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 579,
                "comment_user": "李齐",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 22:32:18",
                "update_time": "2022-04-15 22:32:18",
                "state": 1,
                "parent_id": 75,
                "student_name": "@cname",
                "reply_list": []
            }, {
                "comment_user_uid": 2,
                "id": 726,
                "comment_user": "彭铭麒",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:47:51",
                "update_time": "2022-04-15 09:47:51",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 7427,
                "comment_user": "陆品",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:48:28",
                "update_time": "2022-04-15 09:48:28",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 279,
                "comment_user": "李齐",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 22:32:18",
                "update_time": "2022-04-15 22:32:18",
                "state": 1,
                "parent_id": 75,
                "student_name": "@cname",
                "reply_list": []
            }, {
                "comment_user_uid": 2,
                "id": 764,
                "comment_user": "彭铭麒",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:47:51",
                "update_time": "2022-04-15 09:47:51",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 757,
                "comment_user": "陆品",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 09:48:28",
                "update_time": "2022-04-15 09:48:28",
                "state": 1,
                "parent_id": null,
                "student_name": "@cname",
                "reply_list": []
            },
            {
                "comment_user_uid": 2,
                "id": 769,
                "comment_user": "李齐",
                "content": "这是一条学生评论123",
                "like_count": 0,
                "work_id": 48,
                "create_time": "2022-04-15 22:32:18",
                "update_time": "2022-04-15 22:32:18",
                "state": 1,
                "parent_id": 75,
                "student_name": "@cname",
                "reply_list": []
            }
        ]
    }
})



// 回复评论（不需要了）
Mock.mock("/api/reply_comment", "post", {
    code: 0,
    msg: "",
    data: null
})


// 评论点赞
Mock.mock("/api/upload_comment_like", "post", {
    code: 0,
    msg: "",
    data: null
})


// 回复点赞（不需要了）
Mock.mock("/api/upload_reply_like", "post", {
    code: 0,
    msg: "",
    data: null
})


// 获取点赞列表
Mock.mock("/api/get_like_list", "post", {
    code: 0,
    msg: "",
    data: [{
            "id": 75
        },
        {
            "id": 79
        },
    ],
})