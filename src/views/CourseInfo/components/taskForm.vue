<template>
  <a-form
    :form="form"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 15 }"
    @submit="handleSubmit"
    hideRequiredMark
    autocomplete="off"
  >
    <a-form-item label="任务标题">
      <a-input
        v-decorator="[
          'taskTitle',
          { rules: [{ required: true, message: '请输入任务标题' }] },
        ]"
        placeholder="请填写任务标题"
      />
    </a-form-item>
    <a-form-item label="任务类型">
      <a-select
        v-decorator="[
          'taskType',
          {
            rules: [{ required: true, message: '请选择任务类型' }],
          },
        ]"
        placeholder="请选择提交的任务类型"
        @change="handleSelectChange"
      >
        <a-select-option value="video"> 视频 </a-select-option>
        <a-select-option value="document"> 文档 </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="任务说明">
      <a-textarea
        placeholder="选填：任务说明"
        auto-size
        v-decorator="['taskDesc']"
      />
    </a-form-item>
    <a-form-item label="说明文件">
      <div class="clearfix">
        <a-upload
          :file-list="fileList"
          :remove="handleRemove"
          :before-upload="beforeUpload"
          :headers="headers"
          accept=".doc,.docx"
        >
          <a-popover>
            <template slot="content">
              <span>可选择是否上传，仅支持.doc和.docx格式</span>
            </template>
            <a-button> <a-icon type="upload" /> 选择文件 </a-button>
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
    <a-form-item label="选择组长">
      <a-select
        mode="multiple"
        :size="size"
        placeholder="请选择小组组长"
        optionFilterProp="label"
        v-decorator="[
          'group_leader_ids',
          { rules: [{ required: true, message: '请选定小组组长' }] },
        ]"
      >
        <a-select-option
          v-for="item in student_List"
          :key="item.student_id"
          :value="item.student_id"
          :label="item.student_id + item.student_name"
        >
          {{ item.student_name }}
        </a-select-option>
      </a-select>

      <a-popover>
        <template slot="content">
          <span>可通过学生姓名或学号进行搜索选择</span>
        </template>
        <a-icon
          type="exclamation-circle"
          theme="twoTone"
          :style="{
            position: 'absolute',
            fontSize: '20px',
            margin: '10px 0 0 15px',
          }"
        />
      </a-popover>
    </a-form-item>
    <a-form-item label="截止时间">
      <a-date-picker
        format="YYYY-MM-DD HH:mm:ss"
        :disabled-date="disabledDate"
        style="width: 100%"
        placeholder="请选择任务截止时间"
        v-decorator="[
          'deadline',
          { rules: [{ required: true, message: '请规定任务截止时间' }] },
        ]"
      />
    </a-form-item>
    <!-- 编辑提交时不显示此按钮 -->
    <a-form-item :wrapper-col="{ span: 15, offset: 10 }" v-if="!isEdit">
      <a-button
        type="primary"
        html-type="submit"
        style="width: 100px"
        :loading="loading"
      >
        提交
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";
import { getStudentIdByClassId } from "@/api/student";
import { createTask, editTask } from "@/api/task";
import { uploadFile } from "@/api/uploadFile";
import { getGroupListByTaskId } from "@/api/group";
import formatDate from "@/utils/formatDate.js";
export default {
  props: {
    modelData: null,
    isEdit: false,
  },
  data() {
    return {
      loading: false,
      class_ids: [],
      student_List: [],
      size: "default",

      fileList: [],
      uploading: false,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },

      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      taskData: {
        course_id: null,
        task_title: "",
        task_type: "",
        task_desc: "",
        desc_file_url: "",
        deadline: "",
        group_count: "",
        group_leader_ids: [],
        task_id: "",
      },

      editTaskId: null,
      allLeader: [],
    };
  },
  watch: {
    // 观察编辑的数据, 把数据回填到表单
    async modelData(newVal) {
      this.editTaskId = newVal.task_id;
      this.allLeader = await this.fetchGroupList();
      this.form.setFieldsValue({
        taskTitle: newVal.task_title,
        taskType: newVal.task_type,
        taskDesc: newVal.task_desc,
        deadline: formatDate(newVal.deadline, true),
        group_leader_ids: this.allLeader,
      });
    },
  },
  methods: {
    // 获取分组列表
    async fetchGroupList() {
      let info = {};
      info.task_id = this.editTaskId;
      return await getGroupListByTaskId(info).then((res) => {
        return res.group_list.map((item) => item.group_leader);
      });
    },
    // 获取学生列表
    async fetchData() {
      let classinfo = {};
      classinfo.class_ids = this.class_ids;
      return await getStudentIdByClassId(classinfo).then((res) => {
        return res;
      });
    },
    //表单提交方法
    async handleSubmit(e) {
      if (!this.isEdit) {
        e.preventDefault();
      }
      await this.form.validateFields((err, values) => {
        console.log(values, "val");
        if (!err) {
          this.loading = true;
          this.taskData.task_title = values.taskTitle;
          this.taskData.task_type = values.taskType;
          this.taskData.deadline = new Date(values.deadline).getTime();
          this.taskData.group_count = values.group_leader_ids.length;
          this.taskData.group_leader_ids = JSON.stringify(
            values.group_leader_ids
          );
          this.taskData.task_desc = values.taskDesc || this.taskData.task_desc;
          this.taskData.task_id = this.editTaskId;
          if (this.isEdit) {
            // 编辑任务方法
            editTask(this.taskData).then((res) => {
              // console.log(res, "编辑任务返回的数据");
              // 编辑完毕重新获取任务列表;
              this.fileList = [];
              this.$message.success("任务编辑成功");
              this.$emit("fetchData");
              this.form.resetFields(); //重置表单数据
            });
          } else {
            // 新建任务方法
            createTask(this.taskData).then((res) => {
              if (res) {
                // console.log(res, "新建任务返回的数据");
                this.loading = false;
                this.fileList = [];
                this.$message.success("任务新建成功");
                this.form.resetFields(); //重置表单数据
              }
            });
          }
        }
      });
    },
    handleSelectChange(value) {
      this.form.setFieldsValue({
        taskType: `Hi, ${value === "document" ? "document" : "video"}!`,
      });
    },

    //日期组件方法
    moment,
    disabledDate(current) {
      // 不能选择今天之前的的日期
      return current && current < moment().endOf("day");
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
      formData.append("type", "doc");
      this.uploading = true;
      uploadFile(formData).then((res) => {
        this.taskData.desc_file_url = "/api/get_resource?file_id=" + res.url;
        // this.fileList = [];
        this.uploading = false;
        this.$message.success("文件上传成功");
      });
    },
  },
  async created() {
    //得到课程id，获取班级id数组
    this.taskData.course_id = this.$route.params.course_id;
    this.class_ids = this.$store.getters["course/class_ids"];
    this.class_ids = JSON.stringify(
      this.class_ids.map((item) => item.class_name)
    );
    this.student_List = await this.fetchData();
    console.log(this.student_List);

    // 拿到当前任务id,获取分组列表得到所有组长id回填表单数据
    if (this.modelData) {
      this.editTaskId = this.modelData.task_id;
      this.allLeader = await this.fetchGroupList();
      this.form.setFieldsValue({
        taskTitle: this.modelData.task_title,
        taskType: this.modelData.task_type,
        taskDesc: this.modelData.task_desc,
        deadline: moment(formatDate(this.modelData.deadline)),
        group_leader_ids: this.allLeader,
      });
    }
  },
};
</script>

