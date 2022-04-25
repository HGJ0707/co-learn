import Mock from "mockjs";

//导入学生数据
Mock.mock("/api/import_student_data", "post", {
    code: 0,
    msg: "",
    data: null
})

//获取学生列表
Mock.mock("/api/get_student_id_by_class_id", "post", {
    code: 0,
    msg: "",
    data: [
        {
            student_name: "谭紫翔",
            student_id: "201840922101"

        },
        {
            student_name: "何汪",
            student_id: "201840922102"

        },
        {
            student_name: "彭娅瑄",
            student_id: "201840922103"

        },
        {
            student_name: "陈祖航",
            student_id: "201840922104"

        },
        {
            student_name: "胡峻杰",
            student_id: "201840922105"

        },
        {
            student_name: "李龙杰",
            student_id: "201840922106"

        },
        {
            student_name: "彭铭麒",
            student_id: "201840922107"

        },
        {
            student_name: "向惠凌",
            student_id: "201840922108"

        },
        {
            student_name: "杨裕林",
            student_id: "201840922109"

        },
        {
            student_name: "易武彪",
            student_id: "201840922110"

        },
        {
            student_name: "李齐",
            student_id: "201840922111"

        },
        {
            student_name: "吴晨",
            student_id: "201840922112"

        },
        {
            student_name: "聂顶立",
            student_id: "201840922113"

        }, {
            student_name: "欧阳洁",
            student_id: "201840922114"

        }, {
            student_name: "黄文川",
            student_id: "201840922116"

        }, {
            student_name: "周忠旭",
            student_id: "201840922117"

        }, {
            student_name: "陆归阳",
            student_id: "201840922118"

        }, {
            student_name: "王浩澜",
            student_id: "201840922119"
        },
    ]
})


//获取班级信息
Mock.mock("/api/get_all_class", "get", {
    code: 0,
    msg: "",
    data: {
        class_list: [
            {
                class_name: "18教技1班",
                class_id: "2121",
            },
            {
                class_name: "18教技2班",
                class_id: "2fsf121",
            },
            {
                class_name: "18教技3班",
                class_id: "2fsf1sdf21",
            },
            {
                class_name: "18教技4班",
                class_id: "2fsf1sdsfsff21",
            }
        ]
    }
})