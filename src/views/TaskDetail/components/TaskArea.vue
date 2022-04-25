<template>
  <div class="taskArea-container" v-if="taskinfo">
    <div class="task-title">
      {{ taskinfo[0].task_title }}
    </div>
    <div>
      <div v-if="taskinfo[0].task_desc" class="task-gap">
        <div>
          <span class="point-title">任务描述：</span>
          <span class="point-content">
            {{ taskinfo[0].task_desc }}
          </span>
        </div>
      </div>
      <div v-if="taskinfo[0].desc_file_url" class="task-gap">
        <div class="point-title">
          <span>说明文件：</span
          ><span class="download-btn"
            ><a :href="taskinfo[0].desc_file_url">下载文件</a></span
          >
        </div>
        <div class="file-show" ref="file">
          <div class="example" :spinning="spinning">
            <a-spin tip="文件加载中..." />
          </div>
        </div>
      </div>
      <div v-if="taskinfo[0].task_type" class="task-gap">
        <span class="point-title">提交类型：</span>
        <span class="point-content">{{
          taskinfo[0].task_type == "video" ? "视频文件" : "文档文件"
        }}</span>
      </div>
      <div v-if="taskinfo[0].deadline" class="task-gap">
        <span class="point-title">截止时间：</span>
        <span class="point-content">{{
          formatDate(taskinfo[0].deadline, true)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "@/utils/formatDate.js";
//预览word文件相关
import axios from "axios";
const docx = require("docx-preview");
window.JSZip = require("jszip");

export default {
  props: {
    taskinfo: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      spinning: true,
    };
  },
  methods: {
    formatDate,
  },
  mounted() {
    //预览word文件
    //url需要依靠created里面的数据，但是mounted不会等待created,所以需要手动延时才能拿到url
    setTimeout(() => {
      if (this.taskinfo[0].desc_file_url) {
        axios({
          method: "get",
          responseType: "blob", // 设置响应文件格式
          url: this.taskinfo[0].desc_file_url,
        }).then(({ data }) => {
          this.spinning = false;
          docx.renderAsync(data, this.$refs.file); // 渲染到页面预览
        });
      }
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.taskArea-container {
  .task-title {
    font-size: 30px;
    text-align: center;
    color: black;
    font-weight: 600;
    margin-bottom: 50px;
  }
  .task-gap {
    margin-bottom: 20px;
  }
  .point-title {
    font-size: 18px;
    color: black;
    font-weight: 600;
  }
  .point-content {
    border-radius: 5px;
    font-size: 16px;
    color: black;
  }
  .download-btn {
    a {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .file-show {
    width: 100%;
    max-height: 700px;
    border: 1px solid #e8e8e8;
    overflow: auto;
    margin-top: 10px;
  }
}
</style>