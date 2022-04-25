<template>
  <div
    :style="{
      minHeight: minHeight + 'px',
      display: 'flex',
      alignContent: 'flex-start',
      flexWrap: 'wrap',
    }"
  >
    <a-layout
      id="components-layout-demo-fixed-sider"
      :style="{ background: '#fff', minHeight: minHeight - 50 + 'px' }"
    >
      <a-layout-sider
        :style="{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 1,
          transition: 'all 0.2s',
          background: '#fff',
        }"
        v-model="collapsed"
        collapsible
      >
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          :style="{ height: '100%', background: '#f7f7f7' }"
        >
          <a-menu-item
            key="1"
            :style="{
              marginTop: '52px',
            }"
          >
            <router-link
              class="big"
              :to="{
                name: 'TaskList',
              }"
              active-class="selected"
              exact
              ><a-icon type="bars" /><span>任务列表</span></router-link
            >
          </a-menu-item>
          <a-menu-item key="2" v-if="isTeacher">
            <router-link
              class="big"
              :to="{ name: 'NewTask' }"
              active-class="selected"
              exact
              ><a-icon type="plus" /><span>新建任务</span></router-link
            >
          </a-menu-item>
          <a-menu-item key="3">
            <router-link
              class="big"
              :to="{ name: 'GetGrades' }"
              active-class="selected"
              exact
              ><a-icon type="line-chart" /><span>成绩统计</span></router-link
            >
          </a-menu-item>
          <a-menu-item key="4" v-if="isTeacher">
            <router-link
              class="big"
              :to="{ name: 'ExportData' }"
              active-class="selected"
              exact
              ><a-icon type="diff" /><span>导出数据</span></router-link
            >
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout
        :style="{
          marginLeft: collapsed ? '70px' : '200px',
          background: '#fff',
        }"
      >
        <router-view></router-view>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minHeight: 400,
      data: null,
      isTeacher: this.$store.getters["login/status"],
      collapsed: false,
    };
  },
  methods: {
    MHeight() {
      this.minHeight = window.innerHeight - 64;
    },
  },
  async created() {
    this.MHeight();
    // 当前课程id和班级id存储到vuex中
    this.$store.commit("course/setCourseId", this.$route.params.course_id);
    if (this.$route.params.class_ids) {
      this.$store.commit("course/setClassIds", this.$route.params.class_ids);
    }
    // 跳转到任务列表页
    this.$router.push({
      name: "TaskList",
    });
  },
  mounted() {
    let that = this;
    window.onresize = function () {
      that.MHeight();
    };
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>

<style lang="scss">
.ant-layout-sider {
  a {
    color: rgb(89 89 89);
    font-size: 16px;
    font-weight: 400;
    &.selected {
      color: #1890ff;
    }
    &:hover {
      color: #1890ff;
    }
  }
}
.ant-layout-sider-trigger {
  background: #e6f7ff;
  color: #1890ff;
}

.big {
  width: 130px;
  height: 40px;
  display: inline-block;
}
</style>

<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>