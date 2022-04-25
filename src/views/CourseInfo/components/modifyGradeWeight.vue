<template>
  <div>
    <a-button type="primary" class="globalBtn" @click="showModal"
      >{{ type === "docwork" ? "文档权重" : "视频权重" }}
    </a-button>
    <a-modal
      v-model="visible"
      :title="title"
      on-ok="handleOk"
      centered
      :width="1000"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> 取消 </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          确认
        </a-button>
      </template>
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        ref="weightFrom"
        :rules="rules"
        hideRequiredMark
      >
        <div class="form-label-box">
          <a-form-model-item label="评论/条" prop="comment_unit">
            <a-input
              v-model.number="form.comment_unit"
              placeholder="每条评论分值"
            />
          </a-form-model-item>
          <a-form-model-item label="总分比" prop="comment_weight">
            <a-select v-model="form.comment_weight" placeholder="评论占总分比">
              <a-select-option :value="0"> 0% </a-select-option>
              <a-select-option :value="10"> 10% </a-select-option>
              <a-select-option :value="20"> 20% </a-select-option>
              <a-select-option :value="30"> 30% </a-select-option>
              <a-select-option :value="40"> 40% </a-select-option>
              <a-select-option :value="50"> 50% </a-select-option>
              <a-select-option :value="60"> 60% </a-select-option>
              <a-select-option :value="70"> 70% </a-select-option>
              <a-select-option :value="80"> 80% </a-select-option>
              <a-select-option :value="90"> 90% </a-select-option>
              <a-select-option :value="100">100% </a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
        <div class="form-label-box">
          <a-form-model-item label="点赞/个" prop="like_unit">
            <a-input
              v-model.number="form.like_unit"
              placeholder="每个点赞分值"
            />
          </a-form-model-item>
          <a-form-model-item label="总分比" prop="like_weight">
            <a-select v-model="form.like_weight" placeholder="点赞占总分比">
              <a-select-option :value="0"> 0% </a-select-option>
              <a-select-option :value="10"> 10% </a-select-option>
              <a-select-option :value="20"> 20% </a-select-option>
              <a-select-option :value="30"> 30% </a-select-option>
              <a-select-option :value="40"> 40% </a-select-option>
              <a-select-option :value="50"> 50% </a-select-option>
              <a-select-option :value="60"> 60% </a-select-option>
              <a-select-option :value="70"> 70% </a-select-option>
              <a-select-option :value="80"> 80% </a-select-option>
              <a-select-option :value="90"> 90% </a-select-option>
              <a-select-option :value="100">100% </a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
        <div class="form-label-box">
          <a-form-model-item label="获赞/个" prop="belike_unit">
            <a-input
              v-model.number="form.belike_unit"
              placeholder="每个获得点赞分值"
            />
          </a-form-model-item>
          <a-form-model-item label="总分比" prop="belike_weight">
            <a-select
              v-model="form.belike_weight"
              placeholder="获得点赞占总分比"
            >
              <a-select-option :value="0"> 0% </a-select-option>
              <a-select-option :value="10"> 10% </a-select-option>
              <a-select-option :value="20"> 20% </a-select-option>
              <a-select-option :value="30"> 30% </a-select-option>
              <a-select-option :value="40"> 40% </a-select-option>
              <a-select-option :value="50"> 50% </a-select-option>
              <a-select-option :value="60"> 60% </a-select-option>
              <a-select-option :value="70"> 70% </a-select-option>
              <a-select-option :value="80"> 80% </a-select-option>
              <a-select-option :value="90"> 90% </a-select-option>
              <a-select-option :value="100">100% </a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
        <div class="form-label-box" v-if="type == 'videowork'">
          <a-form-model-item label="弹幕/条" prop="danmu_unit">
            <a-input
              v-model.number="form.danmu_unit"
              placeholder="每条弹幕分值"
            />
          </a-form-model-item>
          <a-form-model-item label="总分比" prop="danmu_weight">
            <a-select v-model="form.danmu_weight" placeholder="弹幕占总分比">
              <a-select-option :value="0"> 0% </a-select-option>
              <a-select-option :value="10"> 10% </a-select-option>
              <a-select-option :value="20"> 20% </a-select-option>
              <a-select-option :value="30"> 30% </a-select-option>
              <a-select-option :value="40"> 40% </a-select-option>
              <a-select-option :value="50"> 50% </a-select-option>
              <a-select-option :value="60"> 60% </a-select-option>
              <a-select-option :value="70"> 70% </a-select-option>
              <a-select-option :value="80"> 80% </a-select-option>
              <a-select-option :value="90"> 90% </a-select-option>
              <a-select-option :value="100">100% </a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
        <div class="form-label-box">
          <a-form-model-item label="老师评分" prop="teacher_mark_weight">
            <a-select
              v-model="form.teacher_mark_weight"
              placeholder="老师评分占总分比"
            >
              <a-select-option :value="0"> 0% </a-select-option>
              <a-select-option :value="10"> 10% </a-select-option>
              <a-select-option :value="20"> 20% </a-select-option>
              <a-select-option :value="30"> 30% </a-select-option>
              <a-select-option :value="40"> 40% </a-select-option>
              <a-select-option :value="50"> 50% </a-select-option>
              <a-select-option :value="60"> 60% </a-select-option>
              <a-select-option :value="70"> 70% </a-select-option>
              <a-select-option :value="80"> 80% </a-select-option>
              <a-select-option :value="90"> 90% </a-select-option>
              <a-select-option :value="100">100% </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="学生评分" prop="student_mark_weight">
            <a-select
              v-model="form.student_mark_weight"
              placeholder="学生评分占总分比"
            >
              <a-select-option :value="0"> 0% </a-select-option>
              <a-select-option :value="10"> 10% </a-select-option>
              <a-select-option :value="20"> 20% </a-select-option>
              <a-select-option :value="30"> 30% </a-select-option>
              <a-select-option :value="40"> 40% </a-select-option>
              <a-select-option :value="50"> 50% </a-select-option>
              <a-select-option :value="60"> 60% </a-select-option>
              <a-select-option :value="70"> 70% </a-select-option>
              <a-select-option :value="80"> 80% </a-select-option>
              <a-select-option :value="90"> 90% </a-select-option>
              <a-select-option :value="100">100% </a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { modifyGradeWeight } from "@/api/course";
export default {
  props: {
    type: "",
  },
  data() {
    return {
      loading: false,
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        comment_unit: 0,
        comment_weight: 0,
        like_unit: 0,
        like_weight: 0,
        belike_unit: 0,
        belike_weight: 0,
        teacher_mark_weight: 0,
        student_mark_weight: 0,
        danmu_unit: 0,
        danmu_weight: 0,
      },
      rules: {
        comment_unit: [
          {
            required: true,
            message: "请输入每条评论分值",
            trigger: "change",
          },
          {
            type: "number",
            message: "请输入一个数字",
            trigger: "change",
          },
        ],
        comment_weight: [
          {
            required: true,
            message: "请选择评论占比",
            trigger: "change",
          },
        ],
        like_unit: [
          {
            required: true,
            message: "请输入每个点赞分值",
            trigger: "change",
          },
          {
            type: "number",
            message: "请输入一个数字",
            trigger: "change",
          },
        ],
        like_weight: [
          {
            required: true,
            message: "请选择点赞占比",
            trigger: "change",
          },
        ],
        belike_unit: [
          {
            required: true,
            message: "请输入每个获得点赞分值",
            trigger: "change",
          },
          {
            type: "number",
            message: "请输入一个数字",
            trigger: "change",
          },
        ],
        belike_weight: [
          {
            required: true,
            message: "请选择获得点赞占比",
            trigger: "change",
          },
        ],
        teacher_mark_weight: [
          {
            required: true,
            message: "请选择老师评分占比",
            trigger: "change",
          },
        ],
        student_mark_weight: [
          {
            required: true,
            message: "请选择学生评分占比",
            trigger: "change",
          },
        ],
        danmu_unit: [
          {
            required: true,
            message: "请输入每条弹幕分值",
            trigger: "change",
          },
          {
            type: "number",
            message: "请输入一个数字",
            trigger: "change",
          },
        ],
        danmu_weight: [
          {
            required: true,
            message: "请选择弹幕占比",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    title() {
      return this.type === "docwork"
        ? "调整文档作业成绩权重"
        : "调整视频作业成绩权重";
    },
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.loading = true;
      console.log(this.form);
      this.$refs.weightFrom.validate((valid) => {
        if (valid) {
          if (this.type === "docwork") {
            if (
              this.form.comment_weight +
                this.form.like_weight +
                this.form.belike_weight +
                this.form.student_mark_weight +
                this.form.teacher_mark_weight !==
              100
            ) {
              this.$message.warning("比例总和不等于100，请检查重新提交！");
              this.loading = false;
              return;
            }
          }
          if (this.type === "videowork") {
            if (
              this.form.comment_weight +
                this.form.like_weight +
                this.form.belike_weight +
                this.form.student_mark_weight +
                this.form.teacher_mark_weight +
                this.form.danmu_weight !==
              100
            ) {
              this.$message.warning("比例总和不等于100，请检查重新提交！");
              this.loading = false;
              return;
            }
          }
          let info = {};
          info.course_id = this.$store.getters["course/course_id"];
          info.type = this.type;
          info.work_weight = this.form;
          modifyGradeWeight(info).then((res) => {
            if (!res) {
              this.$message.success("修改成功！");
              this.visible = false;
              this.loading = false;
              this.$emit("fetchGrade");
            }
          });
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
  created() {
    console.log(this.type);
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.form-label-box {
  display: flex;
  justify-content: space-around;
}
</style>

<style lang="scss">
.form-label-box {
  .ant-form-item-label {
    width: 70px;
  }
  .ant-form-item-control {
    width: 160px;
  }
}
</style>