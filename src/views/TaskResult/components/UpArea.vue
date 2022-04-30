<template>
  <div class="up-container">
    <!-- 组员信息显示 -->
    <div class="group-area">
      <div class="group-name">{{ this.$route.query.group_name }}</div>
      <div class="group-member">
        <div class="group-member-item-title">小组成员</div>
        <div v-if="groupMembers">
          <div
            class="group-member-item"
            v-for="(item, index) in groupMembers"
            :key="index"
          >
            <span>{{ item.student_name }}</span
            ><span>{{ item.student_id.slice(0, -5) + "*****" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="isHost">
        <!-- 视频上传 -->
        <div class="video-work" v-if="taskType == 'video'">
          <div class="clearfix">
            <a-upload
              :file-list="fileList"
              :remove="handleRemove"
              :before-upload="beforeUpload"
              :headers="headers"
              accept="video/mp4"
            >
              <a-popover>
                <template slot="content">
                  <span>
                    请上传MP4视频格式，视频大小限制1G，强烈建议使用<a
                      href="https://arctime.org/"
                      target="blank"
                      >ArcTime</a
                    >等压缩工具将视频压缩后进行上传！
                  </span>
                </template>
                <a-button class="up-select">
                  <a-icon type="upload" /> 选择视频
                </a-button>
              </a-popover>
            </a-upload>
            <!-- 视频上传按钮 -->
            <a-button
              type="primary"
              :disabled="fileList.length === 0"
              :loading="uploading"
              style="margin-top: 16px"
              @click="handleUpload"
            >
              {{ uploading ? "上传中..." : "开始上传" }}
            </a-button>
            <!-- 视频上传进度条 -->
            <a-progress :percent="pro" :style="{ marginTop: '10px' }" />
          </div>
        </div>
        <!-- 文档上传 -->
        <div class="document-work" v-else>
          <div class="clearfix">
            <a-upload
              :file-list="fileList"
              :remove="handleRemove"
              :before-upload="beforeUpload"
              :headers="headers"
              accept=".doc,.docx"
            >
              <a-button class="up-select">
                <a-icon type="upload" /> 上传文档
              </a-button>
            </a-upload>
            <a-button
              type="primary"
              :disabled="fileList.length === 0"
              :loading="uploading"
              style="margin-top: 16px"
              @click="docHandleUpload"
            >
              {{ uploading ? "上传中..." : "开始上传" }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <UpFileInfo @upWorkInfo="upWorkInfo" :visibles="visibles" />
  </div>
</template>

<script>
// 引入 SDK
import TcVod from "vod-js-sdk-v6";
import UpFileInfo from "./upcom/UpFileInfo";
import { getGroupMembers } from "@/api/group";
import { submitWork } from "@/api/task";
import { getFileSignature, uploadFile } from "@/api/uploadFile";
export default {
  components: {
    UpFileInfo,
  },
  data() {
    return {
      isHost: false,
      task_id: null,
      leader_id: null,
      taskType: this.$route.query.task_type,
      groupMembers: [],
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
      progressData: 0,
      // 上传签名
      signature: "",
      //文件上传相关
      fileList: [],
      uploading: false,
      job_url: "",
      data: [],
      container: {
        hash: "",
        worker: null,
      },
      chunkCount: 0,
      upChunkCount: 0,
      visibles: false,
    };
  },
  computed: {
    pro() {
      console.log(1111111111111);
      return this.progressData;
    },
  },
  methods: {
    // 视频上传方法
    async handleUpload() {
      this.uploading = true;

      // 获取上传签名的函数
      function fetchSignature() {
        return getFileSignature().then((res) => {
          return res.signature;
        });
      }
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("files[]", file);
      });
      const tcVod = new TcVod({
        getSignature: fetchSignature, // 前文中所述的获取上传签名的函数
      });
      const uploader = tcVod.upload({
        mediaFile: fileList[0], // 媒体文件（视频或音频或图片），类型为 File
      });
      console.log("777", uploader);
      uploader.on("media_progress", (info) => {
        this.progressData = (info.percent * 100).toFixed(0) * 1;
        // console.log("进度", info.percent, this.progressData); // 进度
      });
      uploader
        .done()
        .then((doneResult) => {
          console.log("上传完回调", doneResult, doneResult.video.url);
          this.job_url = doneResult.video.url;
          this.fileList = [];
          this.uploading = false;
          this.visibles = true;
        })
        .catch(function (err) {
          console.log("文件上传错误", err);
        });
    },

    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      // 上传文件大小限制
      if (file.size > 1024 * 1024 * 1024) {
        this.$message.warning("文件大小超过1G，请在压缩后重新上传！");
        return false;
      }
      this.fileList = [...this.fileList, file];
      return false;
    },
    docHandleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("files[]", file);
      });
      formData.append("type", "doc");
      this.uploading = true;
      uploadFile(formData).then((res) => {
        this.job_url = "/api/get_resource?file_id=" + res.url;
        this.fileList = [];
        this.uploading = false;
        this.visibles = true;
      });
    },

    // 公共提交作业方法
    upWorkInfo(formInfo) {
      //把返回的url赋值给job_url
      console.log(formInfo, "formInfo");
      this.$emit("changeJobUrl", this.job_url);
      let workInfo = {};
      workInfo.leader_id = this.leader_id;
      workInfo.task_id = this.task_id;
      workInfo.work_file_url = this.job_url;
      workInfo.current_student_id = this.$store.getters["login/user"];
      workInfo.work_title = formInfo.work_title;
      workInfo.cover_url = formInfo.cover_url;
      submitWork(workInfo).then((res) => {
        // 提交作业后获取work_id
        console.log("作业提交成功", res);
        this.$router.push({
          name: "TaskResult",
          query: {
            group_name: this.$route.query.group_name,
            task_id: this.$route.query.task_id,
            task_type: this.$route.query.task_type,
            leader_id: this.$route.query.leader_id,
            work_id: res.work_id,
          },
        });
        this.$emit("fetchWorkId", res.work_id);
        // location.reload();
        this.$message.success("作业上传成功");
      });
    },

    //获取组员
    async fetchGroupMembers() {
      let info = {};
      info.task_id = this.task_id;
      info.leader_id = this.leader_id;
      return await getGroupMembers(info).then((res) => {
        if (res.length) {
          return res.map((item) => {
            return {
              student_name: item.student_name,
              student_id: item.student_id,
            };
          });
        }
      });
    },
  },

  async created() {
    this.task_id = this.$route.query.task_id;
    this.leader_id = this.$route.query.leader_id;
    // 获取组员
    this.groupMembers = await this.fetchGroupMembers();
    this.isHost = this.groupMembers.some((item) => {
      return item.student_id == this.$store.getters["login/user"];
    });
  },
};
</script>

<style lang="scss" scoped>
.up-container {
  width: 250px;
  margin-left: 50px;
  flex-shrink: 0;
  .group-name {
    width: 100%;
    font-size: 20px;
    height: 37px;
    line-height: 37px;
    color: white;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #1890ff;
    border-radius: 3px;
  }
  .group-member {
    background-color: #f4f4f4;
    border-radius: 3px;
    margin-top: 20px;
    max-height: 400px;
    overflow-y: auto;
    .group-member-item {
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding: 0px 25px;
      display: flex;
      justify-content: space-between;
      :hover {
        color: #1890ff;
      }
    }
    .group-member-item-title {
      font-size: 16px;
      color: black;
      border-bottom: 1px solid #e8e8e8;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
  .video-work,
  .document-work {
    border: 2px dashed #ccc;
    padding: 30px;
    text-align: center;
    margin: 20px 0px 20px 0px;
  }
}
</style>