import Mock from "mockjs";

// 创建任务
Mock.mock("/api/create_task", "post", {
    code: 0,
    msg: "",
    data: null
})


// 删除任务
Mock.mock("/api/delete_task", "post", {
    code: 0,
    msg: "",
    data: null
})


// 删除任务
Mock.mock("/api/update_task", "post", {
    code: 0,
    msg: "",
    data: null
})


// 获取任务列表
Mock.mock("/api/get_task_list", "post", {
    code: 0,
    msg: "",
    data: [{
            task_id: "qwert",
            task_title: "任务一",
            task_desc: "fsdfstwetwerwfsdfwrsfwrw3rsfsdfsd",
            desc_file_url: "",
            task_type: "video",
            create_time: "132123456",
            deadline: "1651122000000",
        },
        {
            task_id: "yuiop",
            task_title: "任务二",
            task_desc: "所以在渲染时，出现的三层表达式在info中取support[0]数组中的小标为0的对象还不存在，再在这个对象中取其他值自然会报错，但是渲染完成后，info中的值加载好了，自然可以取到，这也就解释了为什么界面正常显示，但开发者工具会报错的原因。",
            desc_file_url: "dad/a/dasdsad/dasdsa/das/da/da/da",
            task_type: "video",
            create_time: "132123456",
            deadline: "1651122000000",
        },
        {
            task_id: "asdfg",
            task_title: "任务三",
            task_desc: "任务描述说明3",
            desc_file_url: "dad/a/dasdsad/dasdsa/das/da/da/da",
            task_type: "video",
            create_time: "132123456",
            deadline: "1651122000000",
        },
        {
            task_id: "hjkl",
            task_title: "任务四",
            task_desc: "任务描述说明3",
            desc_file_url: "dad/a/dasdsad/dasdsa/das/da/da/da",
            task_type: "video",
            create_time: "132123456",
            deadline: "1651122000000",
        },
        {
            task_id: "hjfkl",
            task_title: "任务四",
            task_desc: "任务描述说明3",
            desc_file_url: "dad/a/dasdsad/dasdsa/das/da/da/da",
            task_type: "video",
            create_time: "132123456",
            deadline: "1651122000000",
        },
        {
            task_id: "hjhkl",
            task_title: "任务四",
            task_desc: "任务描述说明3",
            desc_file_url: "dad/a/dasdsad/dasdsa/das/da/da/da",
            task_type: "video",
            create_time: "132123456",
            deadline: "1651122000000",
        },
        {
            task_id: "hjrewkl",
            task_title: "任务四",
            task_desc: "任务描述说明3",
            desc_file_url: "dad/a/dasdsad/dasdsa/das/da/da/da",
            task_type: "video",
            create_time: "132123456",
            deadline: "1651122000000",
        },
        {
            task_id: "hjrwkl",
            task_title: "任务四",
            task_desc: "任务描述说明3",
            desc_file_url: "dad/a/dasdsad/dasdsa/das/da/da/da",
            task_type: "video",
            create_time: "132123456",
            deadline: "1651122000000",
        },
        {
            task_id: "hjkrwl",
            task_title: "任务四",
            task_desc: "任务描述说明3",
            desc_file_url: "dad/a/dasdsad/dasdsa/das/da/da/da",
            task_type: "video",
            create_time: "132123456",
            deadline: "1651122000000",
        },
    ]
})


// 提交作业
Mock.mock("/api/submit_work", "post", {
    code: 0,
    msg: "",
    data: null
})


// 获取作业Url
Mock.mock("/api/get_work_url", "post", {
    code: 0,
    msg: "",
    data: {
        work_url: "workurl/123/4565"
    }
})

// 星级评分
Mock.mock("/api/upload_star", "post", {
    code: 0,
    msg: "",
    data: null
})


// 获取星级评分
Mock.mock("/api/get_star", "post", {
    code: 0,
    msg: "",
    data: null
})



// 作品点赞
Mock.mock("/api/like_work", "post", {
    code: 0,
    msg: "",
    data: null
})


// 获取作品点赞
Mock.mock("/api/islike_work", "post", {
    code: 0,
    msg: "",
    data: {
        is_like: true //代表已经点过赞了
    }
})


// 获取热门作品
Mock.mock("/api/get_hot_work_list", "post", {
    code: 0,
    msg: "",
    data: [{
            work_id: "@guid",
            work_title: "@cparagraph(1, 10)",
            comment_count: Mock.Random.integer(60, 100),
            like_count: Mock.Random.integer(60, 100),
            job_url: Mock.Random.url(),
            cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            pageviews: Mock.Random.integer(60, 100),
            group_leader: "1111111111",
            group_name: "@cname",
            task_id: Mock.Random.integer(60, 100),
        },
        {
            work_id: "@guid",
            work_title: "@cparagraph(1, 10)",
            comment_count: Mock.Random.integer(60, 100),
            like_count: Mock.Random.integer(60, 100),
            job_url: Mock.Random.url(),
            cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            pageviews: Mock.Random.integer(60, 100),
            group_leader: "1111111111",
            group_name: "@cname",
            task_id: Mock.Random.integer(60, 100),
        },
        {
            work_id: "@guid",
            work_title: "@cparagraph(1, 10)",
            comment_count: Mock.Random.integer(60, 100),
            like_count: Mock.Random.integer(60, 100),
            job_url: Mock.Random.url(),
            cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            pageviews: Mock.Random.integer(60, 100),
            group_leader: "1111111111",
            group_name: "@cname",
            task_id: Mock.Random.integer(60, 100),
        },
        {
            work_id: "@guid",
            work_title: "@cparagraph(1, 10)",
            comment_count: Mock.Random.integer(60, 100),
            like_count: Mock.Random.integer(60, 100),
            job_url: Mock.Random.url(),
            cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            pageviews: Mock.Random.integer(60, 100),
            group_leader: "1111111111",
            group_name: "@cname",
            task_id: Mock.Random.integer(60, 100),
        },
        {
            work_id: "@guid",
            work_title: "@cparagraph(1, 10)",
            comment_count: Mock.Random.integer(60, 100),
            like_count: Mock.Random.integer(60, 100),
            job_url: Mock.Random.url(),
            cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            pageviews: Mock.Random.integer(60, 100),
            group_leader: "1111111111",
            group_name: "@cname",
            task_id: Mock.Random.integer(60, 100),
        },
        {
            work_id: "@guid",
            work_title: "@cparagraph(1, 10)",
            comment_count: Mock.Random.integer(60, 100),
            like_count: Mock.Random.integer(60, 100),
            job_url: Mock.Random.url(),
            cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            pageviews: Mock.Random.integer(60, 100),
            group_leader: "1111111111",
            group_name: "@cname",
            task_id: Mock.Random.integer(60, 100),
        },
        {
            work_id: "@guid",
            work_title: "@cparagraph(1, 10)",
            comment_count: Mock.Random.integer(60, 100),
            like_count: Mock.Random.integer(60, 100),
            job_url: Mock.Random.url(),
            cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            pageviews: Mock.Random.integer(60, 100),
            group_leader: "1111111111",
            group_name: "@cname",
            task_id: Mock.Random.integer(60, 100),
        },
        {
            work_id: "@guid",
            work_title: "@cparagraph(1, 10)",
            comment_count: Mock.Random.integer(60, 100),
            like_count: Mock.Random.integer(60, 100),
            job_url: Mock.Random.url(),
            cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            pageviews: Mock.Random.integer(60, 100),
            group_leader: "1111111111",
            group_name: "@cname",
            task_id: Mock.Random.integer(60, 100),
        },
    ],

});



// 获取热门作品成员
Mock.mock("/api/get_group_members", "post", {
    code: 0,
    msg: "",
    data: [{
            "task_id": 78,
            "student_id": "201840922107",
            "leader_id": "201840922108",
            "create_time": "2022-04-15 08:46:09",
            "update_time": "2022-04-17 08:32:15",
            "state": 1,
            "student_name": "彭铭麒"
        },
        {
            "task_id": 78,
            "student_id": "201840922107",
            "leader_id": "201840922108",
            "create_time": "2022-04-15 08:46:09",
            "update_time": "2022-04-17 08:32:15",
            "state": 1,
            "student_name": "陆品"
        },
    ]
})


// 获取作品详情
Mock.mock("/api/get_work_info", "post", {
    code: 0,
    msg: "",
    data: {
        task_id: '111',
        work_id: "121",
        work_title: "作品标题",
        comment_count: 12,
        like_count: 2,
        job_url: "vvvvvvvv/vvvvv/vvvvvvvvv",
        cover_url: "cccccc/ccccc/cccccccc",
        pageviews: 23,
        group_leader: "王浩澜",
    }
})



// 作品浏览量
Mock.mock("/api/work_page_view", "post", {
    code: 0,
    msg: "",
    data: null
})