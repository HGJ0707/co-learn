<template>
  <a-layout-content :style="{ margin: '50px', overflow: 'initial' }">
    <div
      class="taskList-container"
      :style="{
        background: '#fff',
        minHeight: minHeight + 'px',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
      }"
    >
      <template v-if="data.length">
        <a-timeline>
          <a-timeline-item
            v-for="item in data"
            :key="item.task_id"
            class="task_item"
          >
            <router-link
              target="_blank"
              :to="{
                name: 'TaskDetail',
                params: {
                  task_id: item.task_id,
                },
              }"
            >
              <a-card hoverable>
                <a-card-meta :title="item.task_title">
                  <template slot="description">
                    课程描述：{{ item.task_desc ? item.task_desc : "暂无描述" }}
                  </template>
                </a-card-meta>
                <a-card-meta>
                  <template slot="description">
                    发布时间：{{ item.create_time.slice(0, -5) + "00:00" }}
                  </template>
                </a-card-meta>
                <a-card-meta>
                  <template slot="description">
                    截止时间：{{ formatDate(item.deadline, true) }}
                  </template>
                </a-card-meta>
              </a-card>
            </router-link>
            <!-- 如果是老师则展示操作按钮 -->
            <div class="operation" v-if="isTeacher">
              <!-- 编辑任务 -->
              <a-popover>
                <template slot="content">
                  <span>编辑任务</span>
                </template>
                <div @click="showModal(item)">
                  <a-icon type="edit" theme="twoTone" />
                </div>
              </a-popover>
              <!-- 删除任务 -->
              <a-popover>
                <template slot="content">
                  <span>删除任务</span>
                </template>
                <div>
                  <a-popconfirm
                    title="确定删除任务吗？"
                    ok-text="确认"
                    cancel-text="取消"
                    @confirm="confirm(item.task_id)"
                  >
                    <a href="#">
                      <a-icon
                        type="delete"
                        theme="twoTone"
                        two-tone-color="#ff1818"
                    /></a>
                  </a-popconfirm>
                </div>
              </a-popover>
            </div>
          </a-timeline-item>
        </a-timeline>
        <!-- 编辑model框 -->
        <a-modal
          width="600px"
          title="编辑任务"
          :visible="visible"
          :confirm-loading="confirmLoading"
          centered
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <TaskForm
            :modelData="modelData"
            ref="taskFormChild"
            :isEdit="true"
            @fetchData="fetchData"
          />
        </a-modal>
      </template>
      <a-empty v-else description="暂无任务" class="empty" />
    </div>
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner"><a-icon type="arrow-up" /></div>
      </a-back-top>
    </div>
  </a-layout-content>
</template>

<script>
import TaskForm from "./taskForm";
import { getTaskList, deleteTask } from "@/api/task";
import formatDate from "@/utils/formatDate.js";
export default {
  components: {
    TaskForm,
  },
  data() {
    return {
      course_id: null,
      minHeight: 400,
      data: [],
      class_ids: [],
      flag: true,
      // model
      visible: false,
      confirmLoading: false,
      modelData: null,
    };
  },
  computed: {
    isTeacher() {
      return this.$store.getters["login/status"];
    },
  },
  methods: {
    formatDate,
    taskListHeight() {
      this.minHeight = window.innerHeight - 280;
    },
    // 获取任务列表
    async fetchData() {
      this.visible = false;
      this.confirmLoading = false;
      let courseId = {};
      courseId.course_id = this.course_id;
      return await getTaskList(courseId).then((res) => {
        this.data = res;
      });
    },
    // 删除任务的回调函数
    confirm(task_id) {
      let info = {};
      info.task_id = task_id;
      deleteTask(info).then(async (res) => {
        if (!res) {
          // 删除后重新获取任务列表
          await this.fetchData();
          this.$message.success("任务删除成功");
        } else {
          return;
        }
      });
    },
    // 显示model框，以及传值给modelData
    showModal(item) {
      this.visible = true;
      this.modelData = item;
    },
    async handleOk(e) {
      // 点击model的确定按钮，执行子组件的handleEdit方法
      this.confirmLoading = true;
      await this.$refs.taskFormChild.handleSubmit();
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
  async created() {
    this.taskListHeight();
    this.course_id = this.$store.getters["course/course_id"];
    await this.fetchData();
    console.log(this.data, "任务列表");
  },
  mounted() {
    let that = this;
    window.onresize = function () {
      that.taskListHeight();
    };
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
.ant-timeline {
  width: 1000px;
  flex-grow: 1;
}

.task_item {
  margin: 17px 18px;
  position: relative;
  .operation {
    position: absolute;
    top: 20px;
    right: 30px;
    display: flex;
    div {
      cursor: pointer;
      margin-left: 20px;
      height: 40px;
      width: 30px;
      text-align: center;
      line-height: 40px;
    }
  }
  .ant-card {
    transition: all 0.2s linear;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &:hover {
      transition: all 0.2s linear;
      transform: scale(1.01);
    }
    .ant-card-meta-title,
    .ant-card-meta-description {
      font-size: 16px;
      margin-top: 10px;
    }
    .ant-card-meta-title {
      font-size: 20px;
      font-weight: 600;
    }
    .ant-card-meta-detail {
      display: block;
    }
  }
}

.ant-card-hoverable:hover {
  border-color: rgba(0, 0, 0, 0.09);
  box-shadow: 0 2px 8px rgb(0 0 0 / 9%);
}

// .ant-modal-root {
//   .ant-modal-wrap {
//     .ant-modal {
//       width: 600px !important;
//     }
//   }
// }

.ant-form-item-control {
  width: 437.5px;
}
</style>