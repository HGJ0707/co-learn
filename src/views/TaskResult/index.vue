<template>
  <a-layout id="components-layout-demo-fixed" class="home-container">
    <div
      :style="{
        background: '#fff',
        padding: '50px',
        minHeight: minHeight + 'px',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        position: 'relative',
      }"
    >
      <div class="main-work-content">
        <!-- 左边主展示区域 -->
        <div class="work-show-area">
          <!-- 作业显示区域 -->
          <div class="work-area" v-if="job_url">
            <!-- 视频作业 -->
            <div class="video-show" v-if="taskType == 'video'">
              <VideoControl
                :job_url="job_url"
                :work_id="work_id"
                style="margin-bottom: 50px"
              />
            </div>
            <!-- 文档作业 -->
            <div class="document-show" ref="file" v-else>
              <div class="example" :spinning="spinning">
                <a-spin tip="文件加载中..." />
              </div>
            </div>
          </div>
          <a-empty v-else description="作业未上传" class="empty" />
          <!-- 评分区域 -->
          <div class="rate-container" v-if="work_id">
            <div class="teacher-remark" v-if="isTeacher">
              <a-input-search
                placeholder="老师评语："
                enter-button="提交评语"
                v-model="uploadInfo.content"
                @search="UpTeacherMark"
                style="flex-shrink: 1; width: 400px; border-radius: 0px"
              />
            </div>
            <div class="like-style">
              <span style="font-size: 16px">点赞：</span
              ><a-icon
                type="like"
                :theme="uploadInfo.is_like ? 'twoTone' : 'outlined'"
                @click="workLikeChange"
                style="font-size: 22px"
              />
            </div>
            <a-popover title="Tips" style="position: relative; top: -5px">
              <template slot="content">
                <span>参与星级评分可以增加平时成绩哦！</span>
              </template>
              <span style="font-size: 16px">星级评分：</span
              ><a-rate
                allow-half
                style="font-size: 25px"
                v-model="rateValue"
                @change="handleRateChange"
              />
            </a-popover>
          </div>
          <!-- 评论区域 -->
          <Comment ref="commentCom" :work_id="work_id" v-if="work_id" />
        </div>
        <!-- 右边作业上传区域 -->
        <UpArea @changeJobUrl="changeJobUrl" @fetchWorkId="fetchWorkId" />
      </div>
    </div>
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner"><a-icon type="arrow-up" /></div>
      </a-back-top>
    </div>
  </a-layout>
</template>

<script>
import UpArea from "./components/UpArea";
import Comment from "./components/Comment";
import VideoControl from "./components/VideoControl";
import {
  UploadStar,
  getStar,
  giveLikeToWork,
  getLikeToWork,
  workPageView,
  getWorkInfo,
} from "@/api/task";
import { uploadRemark } from "@/api/comment";
//预览word文件相关
import axios from "axios";
const docx = require("docx-preview");
window.JSZip = require("jszip");
export default {
  components: {
    UpArea,
    Comment,
    VideoControl,
  },
  data() {
    return {
      minHeight: 400,
      spinning: true,
      isTeacher: this.$store.getters["login/status"],
      // query传过来的参数
      taskType: this.$route.query.task_type,
      work_id: this.$route.query.work_id,

      //作业链接(判断是否上传了作业)
      job_url: null,
      rateValue: 0,
      uploadInfo: {
        uid: this.$store.getters["login/uid"],
        teacher_id: null,
        score: 0,
        work_id: this.$route.query.work_id,
        content: "",
        is_like: 0,
      },
    };
  },
  watch: {
    job_url: "previewWord",
    // work_id: "fetchStar",
  },
  methods: {
    MHeight() {
      this.minHeight = window.innerHeight - 164;
    },
    // 获取UpArea传过来的作业url地址
    changeJobUrl(url) {
      this.job_url = url;
    },
    // 提交作业后拿到work_id
    fetchWorkId(work_id) {
      this.work_id = work_id;
      this.uploadInfo.work_id = work_id;
    },
    // 获取作品详情
    async fetchWorkInfo() {
      return await getWorkInfo(this.uploadInfo).then((res) => {
        return res.job_url;
      });
    },
    // 获取星级评分和作品点赞
    async fetchStarAndLike() {
      await getStar(this.uploadInfo).then((res) => {
        if (res) {
          this.rateValue = res.mark / 20;
        }
      });
      await getLikeToWork(this.uploadInfo).then((res) => {
        if (res) {
          this.uploadInfo.is_like = res.is_like;
        }
      });
    },
    //提交老师评语并且重新获取获取评论列表
    UpTeacherMark() {
      if (!this.uploadInfo.content) {
        return;
      }
      uploadRemark(this.uploadInfo).then((res) => {
        this.$refs.commentCom.fetchCommentList(() => {});
        this.uploadInfo.content = null;
        this.$message.success("提交成功");
      });
    },
    // 提交星级评分
    handleRateChange(value) {
      this.uploadInfo.score = value * 20;
      UploadStar(this.uploadInfo).then((res) => {
        this.$message.success(
          `你已成功给当前作业评分：${this.uploadInfo.score}分`
        );
      });
    },
    // 提交作品点赞
    workLikeChange() {
      this.uploadInfo.is_like = !this.uploadInfo.is_like;
      giveLikeToWork(this.uploadInfo).then((res) => {
        console.log(res, "作品点赞返回结果");
      });
    },

    //渲染word文件
    previewWord() {
      if (this.job_url && this.taskType == "document") {
        axios({
          method: "get",
          responseType: "blob",
          url: this.job_url,
        }).then(({ data }) => {
          this.spinning = false;
          docx.renderAsync(data, this.$refs.file);
        });
      }
    },
    // 生成随机Uid
    getRandom() {
      let randomUid = "";
      for (let i = 0; i < 6; i++) {
        randomUid += Math.floor(Math.random() * 8 + 1);
      }
      return randomUid - 0;
    },
  },
  async created() {
    this.MHeight();
    // 老师身份
    if (this.isTeacher) {
      this.uploadInfo.teacher_id = this.$store.getters["login/user"];
    } else {
      this.uploadInfo.teacher_id = null;
    }

    // 浏览量
    if (this.work_id) {
      workPageView(this.uploadInfo).then((res) => {
        // console.log("浏览量");
      });
      // 一开始就获取作品链接
      this.job_url = await this.fetchWorkInfo();
      this.fetchStarAndLike();
    }

    // 对未登录用产生随机uid
    let randomUid = this.getRandom();
    localStorage.uid = randomUid;
    if (!this.$store.getters["login/uid"]) {
      this.$store.commit("login/setUid", randomUid);
    }
  },
  mounted() {
    let that = this;
    window.onresize = function () {
      that.MHeight();
    };
    //预览word文件,url需要依靠created里面的数据，但是mounted不会等待created,所以需要手动延时才能拿到Url
    setTimeout(() => {
      this.previewWord();
    }, 1000);
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.ant-layout-content {
  min-width: 1120px;
  flex: 1;
  height: 100%;
  .main-work-content {
    width: 1120px;
    display: flex;
    justify-content: center;
    .work-show-area {
      flex-grow: 1;
      position: relative;
      .work-area {
        font-size: 0px;
        .document-show {
          width: 100%;
          max-height: 700px;
          border: 1px solid #ccc;
          overflow: auto;
        }
        .danmu-send {
          font-size: 30px;
          height: 50px;
          box-shadow: 0 0 8px #e5e9ef;
        }
      }
      .rate-container {
        display: flex;
        height: 60px;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px solid #e8e8e8;
        .teacher-remark {
          flex-grow: 1;
          margin-right: 50px;
        }
        .like-style {
          margin-right: 30px;
          transition: all 0.1s linear;
          i {
            cursor: pointer;
            transition: all 0.1s linear;
            &:hover {
              color: #1890ff;
              transition: all 0.1s linear;
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
}
</style>