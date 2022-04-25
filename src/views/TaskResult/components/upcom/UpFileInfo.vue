<template>
  <div>
    <!-- <a-button type="primary" @click="showModal"> model </a-button> -->
    <a-modal
      centered
      title="基本设置"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="作业标题">
          <a-input
            v-model="form.work_title"
            placeholder="请输入作业标题"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: '请填写作业标题!' }],
              },
            ]"
          />
        </a-form-model-item>
        <a-form-item label="作业封面">
          <div class="clearfix">
            <a-upload
              :file-list="fileList"
              list-type="picture-card"
              :show-upload-list="false"
              :remove="handleRemove"
              :before-upload="beforeUpload"
              :headers="headers"
              accept=".jpg,.jpeg,.png"
              @change="handleUpChange"
              class="avatar-uploader"
              v-decorator="[
                'img',
                {
                  rules: [{ required: true, message: '请选择作业封面!' }],
                },
              ]"
            >
              <a-popover placement="rightTop">
                <template slot="content">
                  <p>仅支持.jpg、.jpeg、.png格式图片</p>
                </template>
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="avatar"
                  :style="{ width: '86px', height: '86px', objectFit: 'cover' }"
                />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">选择图片</div>
                </div>
              </a-popover>
            </a-upload>
          </div>
        </a-form-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { uploadFile } from "@/api/uploadFile";
export default {
  props: {
    visibles: {
      required: true,
    },
  },
  data() {
    return {
      // model
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: {
        work_title: "",
        cover_url: "",
      },
      //加上Authorization头部
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
      size: "default",
      //上传组件数据
      fileList: [],
      loading: false,
      imageUrl: "",
    };
  },
  watch: {
    visibles() {
      this.visible = true;
    },
  },
  methods: {
    async handleOk(e) {
      if (!this.form.work_title || !this.form.cover_url) {
        this.$message.warning("请填写作品标题并上传封面图片！");
      } else {
        this.$emit("upWorkInfo", this.form);
        this.visible = false;
      }
    },
    handleCancel(e) {
      this.visible = false;
    },
    // model相关方法
    showModal() {
      this.visible = true;
    },
    // 上传组件方法
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    async handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("file", file);
      });
      formData.append("type", "img");
      await uploadFile(formData).then((res) => {
        this.form.cover_url = res.url;
        this.fileList = [];
        this.$message.success("图片上传成功");
      });
    },
    async handleUpChange() {
      if (!this.form.cover_url) {
        this.loading = true;
      }
      await this.handleUpload();
      if (!this.form.cover_url) {
        this.loading = true;
        return;
      } else {
        this.imageUrl = "/api/get_resource?file_id=" + this.form.cover_url;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>