import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";
import { message } from 'ant-design-vue';
//网站标题
import getPageTitle from '@/utils/get-page-title';

//进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false, ease: 'ease', speed: 600 }) 

Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: "history",
});

// 解决 Vue 重复点击相同路由，出现 Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation 问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//鉴权
router.beforeEach((to, from, next) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    const user = store.getters["login/user"];
    if (to.meta.auth) {
        // 页面需要权限
        if (user) {
            // 有用户信息，直接放行
            next();
            NProgress.done();
        } else {
            message.error("该页面需要登录，你还没有登录，请先登录");
            next({ path: '/' })
        }
    } else {
        // 页面无需权限
        if (to.path === '/login' && user) {
            // 在登录的状态下，去 login 页，导航到home页
            next({ path: '/' })
        } else {
            next();
        }
        NProgress.done();
    }
});

export default router;