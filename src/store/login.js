import * as loginApi from "../api/login";

export default {
    namespaced: true,
    state: {
        userId: null, //用户
        userName: null, //用户姓名
        isTeacher: null, //用户身份
        uid: null, // 通用ID
    },
    getters: {
        user(state) {
            return state.userId;
        },
        userName(state) {
            return state.userName;
        },
        status(state) {
            return state.isTeacher;
        },
        uid(state) {
            return state.uid;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userId = payload;
        },
        setUserName(state, payload) {
            state.userName = payload;
        },
        setStatus(state, payload) {
            state.isTeacher = payload;
        },
        setUid(state, payload) {
            state.uid = payload;
        }
    },
    actions: {
        loginData({
            commit
        }, loginInfo) {
            return new Promise((resolve, reject) => {
                console.log(loginInfo, "666");
                if (loginInfo.tec) {
                    //老师登录的接口
                    let teacherLoginInfo = {};
                    teacherLoginInfo.phone_num = loginInfo.loginId;
                    teacherLoginInfo.teach_pwd = loginInfo.password;
                    teacherLoginInfo.remember = loginInfo.remember;
                    loginApi.teacherLogin(teacherLoginInfo).then(res => {
                        if (!res) {
                            reject(res);
                        } else {
                            //改变全局登录状态
                            commit("setUser", res.user_id);
                            commit("setUserName", res.user_name);
                            commit("setStatus", res.isTeacher);
                            commit("setUid", res.uid);
                            resolve();
                        }
                    }).catch(error => {
                        reject(error);
                    })
                } else {
                    //学生登录的接口
                    let studentLoginInfo = {};
                    studentLoginInfo.student_id = loginInfo.loginId;
                    studentLoginInfo.student_pwd = loginInfo.password;
                    studentLoginInfo.remember = loginInfo.remember;
                    loginApi.studentLogin(studentLoginInfo).then(res => {
                        if (res.code) {
                            reject(res);
                        } else {
                            //改变全局登录状态
                            commit("setUser", res.user_id);
                            commit("setUserName", res.user_name);
                            commit("setStatus", res.isTeacher);
                            commit("setUid", res.uid);
                            resolve();
                        }
                    }).catch(error => {
                        reject(error);
                    })
                }

            })
        }
    }

}