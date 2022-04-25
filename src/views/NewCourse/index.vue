<template>
  <div
    class="course-container"
    :style="{
      minHeight: minHeight + 'px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexWrap: 'wrap',
    }"
  >
    <a-form
      :form="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 15 }"
      @submit="handleSubmit"
      hideRequiredMark
      autocomplete="off"
    >
      <a-form-item label="课程名称">
        <a-input
          v-decorator="[
            'className',
            {
              rules: [{ required: true, message: '请输入课程名称!' }],
            },
          ]"
          placeholder="请填写课程名称"
        />
      </a-form-item>
      <a-form-item label="课程描述">
        <a-textarea
          auto-size
          v-decorator="[
            'classDescription',
            {
              rules: [{ required: true, message: '请输入课程描述!' }],
            },
          ]"
          placeholder="请填写课程描述"
        />
      </a-form-item>
      <a-form-item label="选择班级">
        <a-select
          mode="multiple"
          :size="size"
          @change="handleChange"
          v-decorator="[
            'chooseClass',
            {
              rules: [{ required: true, message: '请选择班级' }],
            },
          ]"
          placeholder="请选择上课班级"
        >
          <a-select-option
            v-for="item in classData"
            :key="item.class_name"
            :value="item.class_name"
          >
            {{ item.class_name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="课程封面">
        <div class="clearfix">
          <a-upload
            :file-list="fileList"
            :remove="handleRemove"
            :before-upload="beforeUpload"
            :headers="headers"
            accept=".jpg,.jpeg,.png"
            v-decorator="[
              'img',
              {
                rules: [{ required: true, message: '请选择课程封面!' }],
              },
            ]"
          >
            <a-popover title="Tips">
              <template slot="content">
                <p>仅支持.jpg、.jpeg、.png格式图片</p>
              </template>
              <a-button> <a-icon type="upload" /> 选择图片 </a-button>
            </a-popover>
          </a-upload>
          <a-button
            type="primary"
            :disabled="fileList.length === 0"
            :loading="uploading"
            style="margin-top: 16px"
            @click="handleUpload"
          >
            {{ uploading ? "上传中" : "点击上传" }}
          </a-button>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 15, offset: 10 }">
        <a-button
          type="primary"
          html-type="submit"
          :loading="loading"
          style="width: 100px"
        >
          确认
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getClass } from "@/api/student";
import { createCourse } from "@/api/course";
import { uploadFile } from "@/api/uploadFile";
export default {
  data() {
    return {
      minHeight: 600,
      loading: false,
      classData: null,

      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      //加上Authorization头部
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
      size: "default",
      //上传组件数据
      fileList: [],
      uploading: false,

      class: [],
      courseInfo: {
        course_name: "",
        course_desc: "",
        teacher_id: this.$store.getters["login/user"],
        course_img: "",
        class_id_list: [],
      },
    };
  },
  methods: {
    MHeight() {
      this.minHeight = window.innerHeight - 64;
    },
    // 获取班级列表
    async fetchData() {
      return await getClass().then((res) => {
        return res.class_list;
      });
    },
    //表单提交
    async handleSubmit(e) {
      e.preventDefault();
      await this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          this.courseInfo.course_name = values.className;
          this.courseInfo.course_desc = values.classDescription;
          this.courseInfo.class_id_list = this.class.map((item) => {
            return { class_name: item };
          });
          this.courseInfo.class_id_list = JSON.stringify(
            this.courseInfo.class_id_list
          );
          console.log(this.courseInfo, "上传的数据");
          createCourse(this.courseInfo).then((res) => {
            this.loading = false;
            this.$message.success("课程新建成功");
            this.form.resetFields(); //重置表单数据
            this.$router.push({
              name: "CourseList",
            });
          });
        } else {
          console.log("新建课程错误！");
        }
      });
    },
    //选择器方法
    handleChange(value) {
      this.class = value;
    },

    //手动上传组件方法
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
    handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("file", file);
      });
      formData.append("type", "img");
      this.uploading = true;
      uploadFile(formData).then((res) => {
        this.courseInfo.course_img = res.url;
        // this.fileList = [];
        this.uploading = false;
        this.$message.success("图片上传成功");
      });
    },
  },
  async created() {
    this.MHeight();
    this.classData = await this.fetchData();
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
.course-container {
  form {
    width: 520px;
  }
}

//上传组件样式
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
</style>

<style lang="scss">
// form表单label标签的字体大小和表格长度
// 设置form表单字体
.ant-form-item-label {
  label {
    font-size: 16px;
  }
}

// 表单长度
.ant-form-item-control {
  width: 430px;
}
</style>