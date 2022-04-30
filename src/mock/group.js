import Mock from "mockjs";


//选择组员
Mock.mock("/api/choose_guys", "post", {
    code: 0,
    msg: "",
    data: null
})


//删除组员
Mock.mock("/api/delete_guys", "post", {
    code: 0,
    msg: "",
    data: null
})


// 修改组名
Mock.mock("/api/modify_group_name", "post", {
    code: 0,
    msg: "",
    data: null
})


// 分组列表
Mock.mock("/api/get_group_list_by_task_id", "post", {
    code: 0,
    msg: "",
    data: {
        group_list: [{
                task_id: "111",
                work_id: "423",
                job_url: "ddas/dasdd/adsaddsa",
                group_leader: "201840922107",
                group_leader_name: "彭铭麒",
                group_name: "第一",
                cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                work_title: "@cparagraph(1, 10)",
                group_members: [{
                        student_id: "201840922102",
                        student_name: "何汪的1"
                    },
                    {
                        student_id: "201840922103",
                        student_name: "何汪2"
                    },
                    {
                        student_id: "201840922104",
                        student_name: "何汪3"
                    },
                    {
                        student_id: "201840922104",
                        student_name: "何汪3"
                    },
                    {
                        student_id: "201840922104",
                        student_name: "何汪3"
                    },
                    {
                        student_id: "201840922104",
                        student_name: "何汪3"
                    },
                    {
                        student_id: "201840922104",
                        student_name: "何汪3"
                    },
                    {
                        student_id: "201840922104",
                        student_name: "何汪3"
                    },
                    {
                        student_id: "201840922104",
                        student_name: "何汪3"
                    }, {
                        student_id: "201840922104",
                        student_name: "何汪3"
                    }
                ]
            },
            {
                task_id: "222",
                work_id: "6",
                job_url: "ddas/dasdd/adsaddsa",
                group_leader: "201840922102",
                group_leader_name: "胡峻杰",
                group_name: "二",
                cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                work_title: "@cparagraph(1, 10)",
                group_members: [{
                        student_id: "201840922106",
                        student_name: "李龙杰1"
                    },
                    {
                        student_id: "201840922107",
                        student_name: "李龙杰2"
                    },
                    {
                        student_id: "201840922108",
                        student_name: "李龙杰3"
                    }
                ]
            },
            {
                task_id: "222",
                work_id: "7",
                job_url: "ddas/dasdd/adsaddsa",
                group_leader: "201840922103",
                group_leader_name: "胡广俊",
                group_name: "第三",
                group_members: [{
                        student_id: "201840922106",
                        student_name: "李龙杰1"
                    },
                    {
                        student_id: "201840922107",
                        student_name: "李龙杰2"
                    },
                    {
                        student_id: "201840922108",
                        student_name: "李龙杰3"
                    }
                ]
            },
            {
                task_id: "222",
                work_id: "8",
                job_url: "ddas/dasdd/adsaddsa",
                group_leader: "201840922104",
                group_leader_name: "吴景涛",
                group_name: "第四",
                cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                work_title: "@cparagraph(1, 10)",
                group_members: [{
                        student_id: "201840922106",
                        student_name: "陈泌州1"
                    },
                    {
                        student_id: "201840922107",
                        student_name: "陈泌州2"
                    },
                    {
                        student_id: "201840922108",
                        student_name: "陈泌州3"
                    }
                ]
            },
            {
                task_id: "222",
                work_id: "9",
                job_url: "ddas/dasdd/adsaddsa",
                group_leader: "201840922105",
                group_leader_name: "屈俊伟",
                group_name: "第五",
                cover_url: "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                work_title: "@cparagraph(1, 10)",
                group_members: [{
                        student_id: "201840922106",
                        student_name: "陆归阳1"
                    },
                    {
                        student_id: "201840922107",
                        student_name: "陆归阳2"
                    },
                    {
                        student_id: "201840922108",
                        student_name: "陆归阳3"
                    }
                ]
            }
        ]
    }
})



// 获取小组成员(作品详情页用)
Mock.mock("/api/get_group_members", "post", {
    code: 0,
    msg: "",
    data: [{
        "task_id": 78,
        "student_id": "201840922101",
        "leader_id": "201840922108",
        "create_time": "2022-04-15 08:46:09",
        "update_time": "2022-04-17 08:32:15",
        "state": 1,
        "student_name": "dasdas"
    },{
        "task_id": 738,
        "student_id": "201840922101",
        "leader_id": "201840922108",
        "create_time": "2022-04-15 08:46:09",
        "update_time": "2022-04-17 08:32:15",
        "state": 1,
        "student_name": "dasd"
    }]
})