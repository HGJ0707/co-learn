<template>
  <div class="choose-container">
    <a-button @click="showModal2" class="choose-member-btn">
      选择组员
    </a-button>
    <a-modal
      centered
      title="选择组员"
      :visible="visible2"
      :confirm-loading="confirmLoading2"
      @ok="handleOk2"
      @cancel="handleCancel2"
      okText="确认"
      cancelText="取消"
    >
      <p>
        <a-form
          autocomplete="off"
          hideRequiredMark
          :form="form2"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 15 }"
          @submit="handleChooseMembersBtn"
        >
          <a-form-item label="选择组员">
            <a-select
              mode="multiple"
              :size="size"
              placeholder="请选择小组成员"
              v-decorator="[
                'group_members',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择小组成员!',
                    },
                  ],
                },
              ]"
            >
              <a-select-option
                v-for="item in student_List"
                :key="item.student_id"
                :value="item.student_id"
              >
                {{ item.student_name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </p>
    </a-modal>
  </div>
</template>

<script>
import { getStudentIdByClassId } from "@/api/student";
export default {
  props: {
    task_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formLayout: "horizontal",
      form2: this.$form.createForm(this, { name: "coordinated2" }),
      size: "default",
      //弹出框数据
      visible2: false,
      confirmLoading2: false,
      student_List: [],
    };
  },

  methods: {
    //选择组员方法
    handleChooseMembersBtn(e) {
      e.preventDefault();
      this.form2.validateFields((err, values) => {
        if (!err) {
          this.$emit(
            "handleChooseMembersBtn",
            values.group_members,
            async (res) => {
              // console.log("回调res2", res);
              //重置表单数据
              this.form2.resetFields();
              //重新获取获取学生列表
              this.student_List = await this.fetchStudentList();
            }
          );
        }
      });
    },

    //弹出框方法
    showModal2() {
      this.visible2 = true;
    },
    handleOk2(e) {
      this.confirmLoading2 = true;
      this.handleChooseMembersBtn(e);
      this.visible2 = false;
      this.confirmLoading2 = false;
    },
    handleCancel2(e) {
      this.visible2 = false;
      this.form2.resetFields(); //重置表单数据
    },
    //获取学生列表
    async fetchStudentList() {
      let classinfo = {};
      classinfo.class_ids = this.$store.getters["course/class_ids"];
      classinfo.class_ids = JSON.stringify(
        classinfo.class_ids.map((item) => item.class_name)
      );
      classinfo.task_id = this.task_id;
      getStudentIdByClassId(classinfo).then((res) => {
        this.student_List = res;
        console.log(this.student_List, "学生列表-choose");
      });
    },
  },

  async created() {
    this.fetchStudentList();
  },
};
</script>


<style lang="scss" scoped>
.choose-member-btn {
  color: #e6a23c;
  transition: all 0.3s linear;
  &:hover {
    transition: all 0.3s linear;
    border-color: #e6a23c;
    box-shadow: 0 0px 28px rgb(0 0 0 / 9%);
  }
}
</style>