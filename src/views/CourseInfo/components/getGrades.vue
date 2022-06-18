<template>
  <a-layout-content
    class="grade-container"
    :style="{
      margin: '50px 0',
      overflow: 'initial',
      minHeight: minHeight + 'px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    }"
  >
    <div class="grade-list-container" v-if="gradeList">
      <!-- 成绩图标展示 -->
      <div>
        <GradeChart
          :gradeList="gradeList"
          v-if="!isTeacher"
          :style="{ marginBottom: '70px' }"
        />
      </div>
      <div class="grade-table-title">
        课程综合成绩列表
        <div class="operation">
          <a-popover v-if="isTeacher">
            <template slot="content">
              <span>调整文档作业成绩权重</span>
            </template>
            <ModifyGradeWeight type="docwork" @fetchGrade="fetchGrade" />
          </a-popover>
          <a-popover v-if="isTeacher">
            <template slot="content">
              <span>调整视频作业成绩权重</span>
            </template>
            <ModifyGradeWeight type="videowork" @fetchGrade="fetchGrade" />
          </a-popover>
          <a-popover>
            <template slot="content">
              <span>查看成绩详情</span>
            </template>
            <a-button type="primary" @click="handleShowMore" class="globalBtn"
              >查看详情
            </a-button>
          </a-popover>
        </div>
      </div>

      <div class="grade-list-title">
        <div :class="{ onlyItem: !isShow }" class="stu-order">序号</div>
        <div :class="{ onlyItem: !isShow }" class="stu-id">学号</div>
        <div :class="{ onlyItem: !isShow }" class="stu-name">姓名</div>
        <div :class="{ onlyItem: !isShow }" class="stu-score">总分</div>
        <div
          :class="{ onlyItem: !isShow }"
          class="children-container"
          v-show="isShow"
        >
          <div class="stu-comment">评论</div>
          <div class="stu-giveLike">点赞</div>
          <div class="stu-beLike">获赞</div>
          <div class="stu-tecStar">评分（老师）</div>
          <div class="stu-stuStar">评分（同学）</div>
          <div class="stu-danmuCount">弹幕</div>
        </div>
      </div>
      <div
        class="grate-list-item"
        v-for="(item, index) in gradeList"
        :key="item[0]"
      >
        <div :class="{ onlyItem: !isShow }" class="stu-order">
          {{ index + 1 }}
        </div>
        <div :class="{ onlyItem: !isShow }" class="stu-id">
          {{ item[1].student_id }}
        </div>
        <div :class="{ onlyItem: !isShow }" class="stu-name">
          {{ item[1].student_name }}
        </div>
        <div :class="{ onlyItem: !isShow }" class="stu-score">
          {{ item[1].scoreSum }}
        </div>
        <div class="children-container" v-show="isShow">
          <div class="stu-comment">{{ item[1].commentCount }}</div>
          <div class="stu-giveLike">{{ item[1].giveLikeCount }}</div>
          <div class="stu-beLike">{{ item[1].beLikeCount }}</div>
          <div class="stu-tecStar">{{ item[1].teacherStar }}</div>
          <div class="stu-stuStar">{{ item[1].studentStar }}</div>
          <div class="stu-danmuCount">{{ item[1].danmuCount }}</div>
        </div>
      </div>
    </div>
    <a-empty v-else description="暂无数据" class="empty" />
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner"><a-icon type="arrow-up" /></div>
      </a-back-top>
    </div>
  </a-layout-content>
</template>

<script>
import ModifyGradeWeight from "./modifyGradeWeight";
import GradeChart from "./gradeChart";
import { getGrades } from "@/api/course";
export default {
  components: {
    GradeChart,
    ModifyGradeWeight,
  },
  data() {
    return {
      minHeight: 0,
      course_id: null,
      gradeList: [],
      isShow: false,
    };
  },
  computed: {
    isTeacher() {
      return this.$store.getters["login/status"];
    },
  },
  methods: {
    MHeight() {
      this.minHeight = window.innerHeight - 280;
    },
    // 获取成绩列表
    async fetchGrade() {
      let courseId = {};
      courseId.course_id = this.course_id;
      await getGrades(courseId).then((res) => {
        this.gradeList = res;
        console.log(this.gradeList, "成绩列表");
      });
    },
    // 显示成绩详情
    handleShowMore() {
      this.isShow = !this.isShow;
    },
  },
  async created() {
    this.MHeight();
    this.course_id = this.$route.params.course_id;
    await this.fetchGrade();
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
@import "@/styles/global.scss";
.grade-container {
  .grade-list-container {
    position: relative;
    .grade-table-title {
      width: 100%;
      font-size: 20px;
      font-weight: 600;
      color: #000000d9;
      margin-bottom: 20px;
      text-align: center;
      height: 100px;
      position: relative;
      .operation {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        // left: 50%;
        // transform: translateX(-50%);
        font-size: 0;
        margin-top: 30px;
        button,
        div {
          margin-left: 16px;
        }
      }
    }

    .grade-list-title,
    .grate-list-item {
      display: flex;
      cursor: pointer;
      div {
        flex-grow: 1;
        height: 50px;
        line-height: 50px;
        width: 120px;
        text-align: center;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
        font-size: 14px;
        color: #000000a6;
      }

      .children-container {
        width: 600px;
        display: flex;
        transition: all 1s linear;
        div {
          transition: all 1s linear;
        }
      }
    }
    .grate-list-item {
      &:hover {
        background-color: #e6f7ff;
        transition: all 0.2s linear;
      }
    }
    .grade-list-title {
      transition: all 1s linear;
      position: sticky;
      top: 100px;
      div {
        background: #e6f7ff;
        border-top: 1px solid #e8e8e8;
        box-sizing: border-box;
        color: black;
      }
      .children-container {
        width: 600px;
        display: flex;
        transition: all 1s linear;
        div {
          height: 49px;
          border-top: none;
          transition: all 1s linear;
        }
      }
    }
    .onlyItem {
      width: 200px !important;
    }
  }
}
</style>