<template>
  <div
    :style="{
      background: '#fff',
      padding: '50px',
      minHeight: minHeight + 'px',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      position: 'relative',
    }"
  >
    <div class="task-detail-content">
      <!-- 任务详情区域 -->
      <TaskArea :taskinfo="taskinfo" v-if="taskinfo" />
      <!-- 分组列表区域 -->
      <GroupList :task_id="task_id" :task_type="taskinfo[0].task_type" />
    </div>
  </div>
</template>

<script>
import TaskArea from "./components/TaskArea";
import GroupList from "./components/GroupList";
import { getTaskList } from "@/api/task";
export default {
  components: {
    TaskArea,
    GroupList,
  },
  data() {
    return {
      minHeight: 400,
      task_id: null,
      taskinfo: undefined,
    };
  },
  methods: {
    MHeight() {
      this.minHeight = window.innerHeight - 164;
    },
    //获取任务列表
    async fetchTaskInfo() {
      let courseId = {};
      courseId.course_id = this.$store.getters["course/course_id"];
      return await getTaskList(courseId).then((res) => {
        return res;
      });
    },
  },
  async created() {
    this.MHeight();
    //获取任务列表，通过当前task_id得到当前任务详细信息
    this.task_id = this.$route.params.task_id;
    this.taskinfo = await this.fetchTaskInfo();
    this.taskinfo = this.taskinfo.filter(
      (item) => item.task_id == this.task_id
    );
    console.log(this.taskinfo, "当前任务信息");
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

<style lang="scss" scoped>
.ant-layout-content {
  min-width: 1120px;
  height: 100%;
  .task-detail-content {
    width: 800px;
  }
}
</style>

<style>
.ant-modal-mask {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>