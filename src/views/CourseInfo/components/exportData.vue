<template>
  <a-layout-content
    class="export-container"
    :style="{
      margin: '50px',
      overflow: 'initial',
      minHeight: minHeight + 'px',
    }"
  >
    <!-- <p class="title">导出本课程所有相关数据</p>
    <a-popover placement="right">
      <template slot="content">
        <span> 包括评论、回复、弹幕、各项成绩等等 </span>
      </template>
      <a-button
        type="primary"
        icon="download"
        @click="handleClick"
        class="globalBtn"
      >
        一键导出
      </a-button>
    </a-popover> -->
    <span class="title">选择导出项数据：</span>
    <a-select default-value="score" style="width: 120px" @change="handleChange">
      <a-select-option value="score"> 成绩 </a-select-option>
      <a-select-option value="barrage"> 弹幕 </a-select-option>
      <a-select-option value="comments"> 评论 </a-select-option>
    </a-select>
    <a-button
      type="primary"
      icon="download"
      @click="handleClick"
      class="submitBtn"
    >
      一键导出
    </a-button>
  </a-layout-content>
</template>

<script>
import { getCourseAllData } from "@/api/course";
export default {
  data() {
    return {
      minHeight: 0,
      course_id: null,
      exportInfo: {
        course_id: this.$route.params.course_id,
        data_type: "score",
      },
      exportFileName: "成绩表",
    };
  },
  methods: {
    exportHeight() {
      this.minHeight = window.innerHeight - 200;
    },
    handleChange(value) {
      this.exportInfo.data_type = value;
      if (value === "score") {
        this.exportFileName = "成绩表";
      } else if (value === "barrage") {
        this.exportFileName = "弹幕表";
      } else {
        this.exportFileName = "评论表";
      }
    },
    // 获取数据
    handleClick() {
      getCourseAllData(
        this.exportInfo.course_id,
        this.exportInfo.data_type
      ).then((res) => {
        // console.log(res, "导出数据");
        let url = window.URL.createObjectURL(
          new Blob([res], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", `课程${this.exportFileName}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
    },
  },
  async created() {
    this.exportHeight();
  },
  mounted() {
    let that = this;
    window.onresize = function () {
      that.exportHeight();
    };
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>

<style lang="scss" >
// 全局按钮样式
// @import "@/styles/global.scss";
.export-container {
  .title {
    font-size: 16px;
    font-weight: 500;
  }
  .submitBtn {
    margin-left: 20px;
    box-shadow: none;
  }
}
</style>




