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
            <a-progress
              :percent="progressData"
              :style="{ marginTop: '10px' }"
            />
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
import UpFileInfo from "./upcom/UpFileInfo";
import { getGroupMembers } from "@/api/group";
import { submitWork } from "@/api/task";
import {
  uploadFile,
  uploadFileSnippet,
  uploadCheckSnippet,
  uploadMerge,
} from "@/api/uploadFile";
const SIZE = 10 * 1024 * 1024; // 视频切片大小
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
      //文件上传相关
      fileList: [],
      uploading: false,
      job_url: null,
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
    progressData() {
      return ((this.upChunkCount / this.chunkCount) * 100).toFixed(0) * 1;
    },
  },
  methods: {
    // 视频上传方法
    async handleUpload() {
      this.uploading = true;
      //1.读取文件
      const { fileList } = this;
      console.log(this.fileList, fileList[0].name, "list");
      //2.产生切片
      const fileChunkList = this.createFileChunk(fileList[0]);
      // console.log(fileChunkList, "chunkList");
      //3.生成文件hash（web-worker）
      this.container.hash = await this.calculateHash(fileChunkList);
      // console.log(this.container.hash, "hash");
      //4.根据 hash 验证文件是否曾经已经被上传过,获取已上传分片列表
      const uploadedList = await uploadCheckSnippet(
        JSON.stringify(this.container.hash)
      ).then((res) => {
        // console.log("已上传的分片", res);
        return res;
      });
      this.data = fileChunkList.map(({ file }, index) => ({
        fileHash: this.container.hash,
        index,
        hash: this.container.hash + "-" + index,
        chunk: file,
        size: file.size,
      }));
      // console.log(this.data, "上传的视频数据");
      //5.上传切片，同时过滤已上传的切片
      await this.uploadChunks(uploadedList);
    },

    // 生成文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = [];
      // 每个切片为10M
      const chunkCount = Math.ceil(file.size / size);
      this.chunkCount = chunkCount;
      let cur = 0,
        count = 0;
      while (count < chunkCount) {
        fileChunkList.push({ file: file.slice(cur, cur + size) });
        cur += size;
        count++;
      }
      return fileChunkList;
    },

    // 生成文件hash（web-worker）
    calculateHash(fileChunkList) {
      return new Promise((resolve) => {
        this.container.worker = new Worker("/hash.js");
        this.container.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = (e) => {
          const { percentage, hash } = e.data;
          this.hashPercentage = Number(percentage.toFixed(0));
          if (hash) {
            resolve(hash);
          }
        };
      });
    },

    // 上传切片，同时过滤已上传的切片
    async uploadChunks(uploadedList = []) {
      const requestList = this.data
        .filter(({ hash }) => !uploadedList.includes(hash))
        .map(({ chunk, fileHash, index }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", fileHash);
          formData.append("index", index);
          return formData;
        })
        .map(
          async (formData) =>
            await uploadFileSnippet(formData).then((res) => {
              if (!res) {
                this.uploading = false;
                this.fileList = [];
                this.$message.warning("上传失败，请重新上传");
                return;
              } else {
                this.upChunkCount++;
              }
            })
        );

      await Promise.all(requestList);
      // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
      // 5.合并切片
      if (requestList.length === this.data.length) {
        let fileInfo = {};
        fileInfo.hash = this.container.hash;
        fileInfo.total = this.data.length;
        fileInfo.name = this.fileList[0].name;
        fileInfo.type = "video";
        await uploadMerge(fileInfo).then((res) => {
          //把返回的url赋值给job_url
          this.job_url = "/api/get_resource?file_id=" + res.url;
          this.fileList = [];
          this.upChunkCount = 0;
          this.uploading = false;
          this.visibles = true;
        });
      }
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