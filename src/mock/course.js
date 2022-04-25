import Mock from "mockjs";


// 创建课程
Mock.mock("/api/create_course", "post", {
    code: 0,
    msg: "",
    data: null
})


// 删除课程
Mock.mock("/api/delete_course", "post", {
    code: 0,
    msg: "",
    data: null
})


// 课程列表
Mock.mock("/api/get_course_list", "post", {
    code: 0,
    msg: "",
    data: [{
            course_name: "前端",
            course_desc: "前端11111111111111111111111111111111111课程",
            course_img_url: "",
            course_id: "123",
            choose_courses: ["18教技1班", "18教技2班"]
        },
        {
            course_name: "前端",
            course_desc: "前端课程",
            course_img_url: "https://img1.baidu.com/it/u=2297198184,3168060866&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=365",
            course_id: "123fs",
            choose_courses: ["18教技3班", "18教技4班"]
        },
        {
            course_name: "前端",
            course_desc: "前端课程",
            course_img_url: "https://img2.baidu.com/it/u=2743606418,860531633&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            course_id: "1dsf23",
            choose_courses: ["18教技5班", "18教技6班"]
        },
        {
            course_name: "前端",
            course_desc: "前端课程",
            course_img_url: "https://img2.baidu.com/it/u=2743606418,860531633&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            course_id: "1fs23",
            choose_courses: ["18教技7班", "18教技8班"]
        },
        {
            course_name: "前端",
            course_desc: "前端课程",
            course_img_url: "https://img2.baidu.com/it/u=2743606418,860531633&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            course_id: "12fs3",
            choose_courses: ["18教技9班", "18教技10班"]
        },
        {
            course_name: "前端",
            course_desc: "前端课程",
            course_img_url: "https://img2.baidu.com/it/u=2743606418,860531633&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            course_id: "123fa",
            choose_courses: ["18教技1班", "18教技2班"]
        },
        {
            course_name: "前端",
            course_desc: "前端课程",
            course_img_url: "https://img2.baidu.com/it/u=2743606418,860531633&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            course_id: "1a23",
            choose_courses: ["18教技1班", "18教技2班"]
        },

    ]
})


// 获取课程详细信息
Mock.mock(/^\/api\/get_course_data(\?.+)?$/, "get", {
    code: 0,
    msg: "",
    data: null
})

// 获取课程成绩
Mock.mock("/api/get_grades_by_course_id", "post", {
    code: 0,
    msg: "",
    data: [
        [
            "201840922101",
            {
                "scoreSum": 24,
                "commentCount": 6,
                "replyCount": 24,
                "giveLikeCount": 6,
                "beLikeCount": 9,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 12,
                        "replyCountSingleTask": 34,
                        "giveLikeCountSingleTask": 65,
                        "beLikeCountSingleTask": 33,
                        "teacherStarSingleTask": 33,
                        "studentStarSingleTask": 77,
                        "studentStarCountSingleTask": 88,
                        "danmuCountSingleTask": 22,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 55,
                        "replyCountSingleTask": 44,
                        "giveLikeCountSingleTask": 33,
                        "beLikeCountSingleTask": 22,
                        "teacherStarSingleTask": 11,
                        "studentStarSingleTask": 44,
                        "studentStarCountSingleTask": 66,
                        "danmuCountSingleTask": 33,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 77,
                        "replyCountSingleTask": 44,
                        "giveLikeCountSingleTask": 33,
                        "beLikeCountSingleTask": 22,
                        "teacherStarSingleTask": 44,
                        "studentStarSingleTask": 11,
                        "studentStarCountSingleTask": 88,
                        "danmuCountSingleTask": 33,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 55,
                        "replyCountSingleTask": 44,
                        "giveLikeCountSingleTask": 55,
                        "beLikeCountSingleTask": 33,
                        "teacherStarSingleTask": 88,
                        "studentStarSingleTask": 70,
                        "studentStarCountSingleTask": 5,
                        "danmuCountSingleTask": 30,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 46,
                        "replyCountSingleTask": 24,
                        "giveLikeCountSingleTask": 6,
                        "beLikeCountSingleTask": 49,
                        "teacherStarSingleTask": 40,
                        "studentStarSingleTask": 57,
                        "studentStarCountSingleTask": 70,
                        "danmuCountSingleTask": 50,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "谭紫翔",
                "student_id": "201840922101"
            }
        ],
        [
            "201840922102",
            {
                "scoreSum": 22,
                "commentCount": 25,
                "replyCount": 42,
                "giveLikeCount": 7,
                "beLikeCount": 3,
                "teacherStar": 4,
                "studentStar": 8,
                "studentStarCount": 1,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 25,
                        "replyCountSingleTask": 42,
                        "giveLikeCountSingleTask": 7,
                        "beLikeCountSingleTask": 3,
                        "teacherStarSingleTask": 4,
                        "studentStarSingleTask": 8,
                        "studentStarCountSingleTask": 1,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学2班",
                "student_name": "何汪",
                "student_id": "201840922102"
            }
        ],
        [
            "201840922111",
            {
                "scoreSum": 19,
                "commentCount": 3,
                "replyCount": 4,
                "giveLikeCount": 2,
                "beLikeCount": 3,
                "teacherStar": 4,
                "studentStar": 8,
                "studentStarCount": 1,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 3,
                        "replyCountSingleTask": 4,
                        "giveLikeCountSingleTask": 2,
                        "beLikeCountSingleTask": 3,
                        "teacherStarSingleTask": 4,
                        "studentStarSingleTask": 8,
                        "studentStarCountSingleTask": 1,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "李齐",
                "student_id": "201840922111"
            }
        ],
        [
            "201840922112",
            {
                "scoreSum": 4,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 4,
                "studentStar": 8,
                "studentStarCount": 1,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 4,
                        "studentStarSingleTask": 8,
                        "studentStarCountSingleTask": 1,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "吴晨",
                "student_id": "201840922112"
            }
        ],
        [
            "201840922113",
            {
                "scoreSum": 4,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 4,
                "studentStar": 8,
                "studentStarCount": 1,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 4,
                        "studentStarSingleTask": 8,
                        "studentStarCountSingleTask": 1,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "聂顶立",
                "student_id": "201840922113"
            }
        ],
        [
            "201840922114",
            {
                "scoreSum": 4,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 4,
                "studentStar": 8,
                "studentStarCount": 1,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 4,
                        "studentStarSingleTask": 8,
                        "studentStarCountSingleTask": 1,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "欧阳洁",
                "student_id": "201840922114"
            }
        ],
        [
            "201840922115",
            {
                "scoreSum": 4,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 4,
                "studentStar": 8,
                "studentStarCount": 1,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 4,
                        "studentStarSingleTask": 8,
                        "studentStarCountSingleTask": 1,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "黄文川",
                "student_id": "201840922115"
            }
        ],
        [
            "201840922116",
            {
                "scoreSum": 4,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 4,
                "studentStar": 8,
                "studentStarCount": 1,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 4,
                        "studentStarSingleTask": 8,
                        "studentStarCountSingleTask": 1,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "周忠旭",
                "student_id": "201840922116"
            }
        ],
        [
            "201840922117",
            {
                "scoreSum": 4,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 4,
                "studentStar": 8,
                "studentStarCount": 1,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 4,
                        "studentStarSingleTask": 8,
                        "studentStarCountSingleTask": 1,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "陆归阳",
                "student_id": "201840922117"
            }
        ],
        [
            "201840922126",
            {
                "scoreSum": 1,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 1,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 1,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "吴景涛",
                "student_id": "201840922126"
            }
        ],
        [
            "201840922108",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "向惠凌",
                "student_id": "201840922108"
            }
        ],
        [
            "201840922109",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "杨裕林",
                "student_id": "201840922109"
            }
        ],
        [
            "201840922110",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "易武彪",
                "student_id": "201840922110"
            }
        ],
        [
            "201840922118",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "王浩澜",
                "student_id": "201840922118"
            }
        ],
        [
            "201840922119",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "陈泌州",
                "student_id": "201840922119"
            }
        ],
        [
            "201840922120",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "向敏",
                "student_id": "201840922120"
            }
        ],
        [
            "201840922121",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "李壬",
                "student_id": "201840922121"
            }
        ],
        [
            "201840922122",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "胡广俊",
                "student_id": "201840922122"
            }
        ],
        [
            "201840922123",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "李英",
                "student_id": "201840922123"
            }
        ],
        [
            "201840922124",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "王蓉",
                "student_id": "201840922124"
            }
        ],
        [
            "201840922125",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "屈俊伟",
                "student_id": "201840922125"
            }
        ],
        [
            "201840922127",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "邓丽",
                "student_id": "201840922127"
            }
        ],
        [
            "201840922128",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "唐珩轩",
                "student_id": "201840922128"
            }
        ],
        [
            "201840922129",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "李滢",
                "student_id": "201840922129"
            }
        ],
        [
            "201840922130",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "唐文明",
                "student_id": "201840922130"
            }
        ],
        [
            "201840922131",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "贺志海",
                "student_id": "201840922131"
            }
        ],
        [
            "201840922132",
            {
                "scoreSum": 0,
                "commentCount": 0,
                "replyCount": 0,
                "giveLikeCount": 0,
                "beLikeCount": 0,
                "teacherStar": 0,
                "studentStar": 0,
                "studentStarCount": 0,
                "danmuCount": 0,
                "tasks": {
                    "58": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务2"
                    },
                    "59": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务3"
                    },
                    "60": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务4"
                    },
                    "61": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "4444444"
                    },
                    "63": {
                        "commentCountSingleTask": 0,
                        "replyCountSingleTask": 0,
                        "giveLikeCountSingleTask": 0,
                        "beLikeCountSingleTask": 0,
                        "teacherStarSingleTask": 0,
                        "studentStarSingleTask": 0,
                        "studentStarCountSingleTask": 0,
                        "danmuCountSingleTask": 0,
                        "task_title": "任务5"
                    }
                },
                "class_name": "18教育技术学1班",
                "student_name": "陆品",
                "student_id": "201840922132"
            }
        ]
    ]
})


// 修改成绩权重
Mock.mock("/api/modify_score_weight", "post", {
    code: 0,
    msg: "",
    data: null
})