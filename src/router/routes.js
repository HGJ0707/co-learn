export default [
    {
        name: "Home",
        path: "/",
        component: () => import('@/views/Home'),
        meta: {
            title: "首页",
        },
    },
    {
        name: "Login",
        path: "/login",
        // redirect: '/home',       //打开网站尝试进入home页
        component: () => import('@/views/Login'),
        meta: {
            title: "登录页",
        },
    },
    {
        name: "Register",
        path: "/register",
        component: () => import('@/views/Register'),
        meta: {
            title: "注册页",
        },
    },
    {
        name: "CourseList",
        path: "/courselist",
        component: () => import('@/views/CourseList'),
        meta: {
            title: "课程列表",
            auth: true,
        },
    },
    {
        name: "UpInfo",
        path: "/upinfo",
        component: () => import('@/views/UpInfo'),
        meta: {
            title: "导入学生信息",
            auth: true,
        }
    },
    {
        name: "NewCourse",
        path: "/newcourse",
        component: () => import('@/views/NewCourse'),
        meta: {
            title: "新建课程",
            auth: true,
        }
    },
    {
        name: "CourseInfo",
        path: "/courseInfo/:course_id",
        component: () => import('@/views/CourseInfo'),
        meta: {
            auth: true,
        },
        children: [{
                name: "TaskList",
                path: "tasklist",
                component: () => import('@/views/CourseInfo/components/taskList'),
                meta: {
                    title: "任务列表",
                    auth: true,
                }
            },
            {
                name: "NewTask",
                path: "newtask",
                component: () => import('@/views/CourseInfo/components/newTask'),
                meta: {
                    title: "新建任务",
                    auth: true,
                }
            },
            {
                name: "GetGrades",
                path: "mark",
                component: () => import('@/views/CourseInfo/components/getGrades'),
                meta: {
                    title: "成绩统计",
                    auth: true,
                }
            },
            {
                name: "ExportData",
                path: "exportdata",
                component: () => import('@/views/CourseInfo/components/exportData'),
                meta: {
                    title: "导出数据",
                    auth: true,
                }
            },
        ]
    },
    {
        name: "TaskDetail",
        path: "/taskdetail/:task_id",
        component: () => import('@/views/TaskDetail'),
        meta: {
            title: "任务详情",
            auth: true,
        }
    },
    {
        name: "TaskResult",
        path: "/taskresult",
        component: () => import('@/views/TaskResult'),
        meta: {
            title: "作品展示",
            // auth: true,
        }
    },
    {
        //  url不存在显示的页面
        path: "*",
        component: () => import('@/views/notFound'),
        meta: {
            title: "404",
        }
    }
]