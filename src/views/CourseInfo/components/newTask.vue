<template>
  <a-layout-content
    class="newTask-container"
    :style="{
      minHeight: minHeight + 'px',
    }"
  >
    <TaskForm />
  </a-layout-content>
</template>

<script>
import TaskForm from "./taskForm";
export default {
  components: {
    TaskForm,
  },
  data() {
    return {
      loading: false,
      minHeight: 400,
    };
  },
  methods: {
    newTaskHeight() {
      this.minHeight = window.innerHeight - 100;
    },
  },
  async created() {
    this.newTaskHeight();
  },
  mounted() {
    let that = this;
    window.onresize = function () {
      that.newTaskHeight();
    };
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>

<style lang="scss">
.newTask-container {
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-wrap: wrap;
  height: calc(100vh - 64px);
  form {
    width: 520px;
  }
  .ant-form-item-control {
    width: 430px;
  }
}
</style>
