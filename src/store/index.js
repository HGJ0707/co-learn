import Vue from "vue";
import Vuex from "vuex";
import login from "./login";
import course from "./course";
import createVuexAlong from 'vuex-along' //使vuex中的state持久化

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        course,
    },
    plugins: [createVuexAlong()]        //vuex-along
})