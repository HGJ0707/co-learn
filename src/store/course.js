export default {
    namespaced: true,
    state: {
        course_id: null,  //课程id
        class_ids: [],    //班级ids
        task_id: null,    //任务id
    },

    getters: {
        course_id(state) {
            return state.course_id;
        },
        class_ids(state) {
            return state.class_ids;
        },
        task_id(state) {
            return state.task_id;
        }
    },

    mutations: {
        setCourseId(state, payload) {
            state.course_id = payload;
        },
        setClassIds(state, payload) {
            state.class_ids = payload;
        },
        setTaskId(state, payload) {
            state.task_id = payload;
        }
    },
}