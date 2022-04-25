<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <a-layout id="components-layout-demo-fixed" class="home-container">
        <!-- header部分 -->
        <a-layout-header
          :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
        >
          <div class="logo">
            <router-link to="/">Co-Learn</router-link>
          </div>
          <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['2']"
            :style="{ lineHeight: '64px' }"
          >
          </a-menu>
          <div class="right-menu-box">
            <div class="menu-box" v-if="logined">
              <div class="menu">
                <router-link
                  :to="{ name: 'Home' }"
                  active-class="selected"
                  exact
                  >首页热榜</router-link
                >
              </div>
              <div class="menu">
                <router-link
                  :to="{ name: 'CourseList' }"
                  active-class="selected"
                  exact
                  >课程列表</router-link
                >
              </div>
              <!-- <div class="menu" v-if="isTeacher">
                <router-link
                  :to="{ name: 'NewCourse' }"
                  active-class="selected"
                  exact
                  >新建课程</router-link
                >
              </div> -->
              <div class="menu" v-if="isTeacher">
                <router-link
                  :to="{ name: 'UpInfo' }"
                  active-class="selected"
                  exact
                  >导入数据</router-link
                >
              </div>
              <div class="menu avatar-back">
                <a-dropdown placement="bottomCenter">
                  <a-menu slot="overlay">
                    <a-menu-item key="1">
                      <a-icon type="logout" />
                      <span @click="loginOut" :style="{ cursor: 'pointer' }"
                        >退出登录</span
                      >
                    </a-menu-item>
                  </a-menu>
                  <span class="name">{{
                    this.$store.getters["login/userName"].length > 2
                      ? this.$store.getters["login/userName"].slice(-2)
                      : this.$store.getters["login/userName"]
                  }}</span>
                </a-dropdown>
              </div>
            </div>
            <div v-else-if="path">
              <div>
                <router-link :to="{ name: 'Login' }"
                  ><a-button type="primary" class="login-btn">
                    登录
                  </a-button></router-link
                >
              </div>
            </div>
            <div v-else>
              <div>
                <router-link :to="{ name: 'Home' }"
                  ><a-button type="primary" class="login-btn">
                    首页
                  </a-button></router-link
                >
              </div>
            </div>
          </div>
        </a-layout-header>
        <!-- 主体部分 -->
        <a-layout-content :style="{ marginTop: '64px', background: '#fff' }">
          <!-- 路由出口 -->
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default {
  name: "App",
  data() {
    return {
      zh_CN,
      menuShow: this.$store.getters["login/status"],
    };
  },
  computed: {
    isTeacher() {
      return this.$store.getters["login/status"];
    },
    logined() {
      return this.$store.getters["login/user"];
    },
    path() {
      return this.$route.path === "/";
    },
  },
  methods: {
    // 退出登录
    loginOut() {
      localStorage.clear();
      location.reload();
    },
  }
};
</script>

<style lang="scss">
html {
  width: 100%;
  min-width: 1200px;
  // scroll-behavior: smooth;
}
body {
  overflow: auto;
}
// header样式
@import "@/styles/global.scss";
</style>

<style scoped>
.login-btn {
  background: #1890ff;
  border: 1px solid rgba(30, 128, 255, 0.3);
  border-radius: 4px;
  padding: 0.3rem 1.5rem;
  color: white;
  line-height: 1.9rem;
  font-size: 14px;
  font-weight: 400;
  height: 2.5rem;
}
</style>