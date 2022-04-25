<template>
  <div class="delete-container">
    <a-button @click="showModal3" class="delete-member-btn">
      删除组员
    </a-button>
    <a-modal
      centered
      title="删除组员"
      :visible="visible3"
      :confirm-loading="confirmLoading3"
      @ok="handleOk3"
      @cancel="handleCancel3"
      okText="确认"
      cancelText="取消"
    >
      <p>
        <a-form
          autocomplete="off"
          hideRequiredMark
          :form="form3"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 15 }"
          @submit="handleDeleteMembersBtn"
        >
          <a-form-item label="删除组员">
            <a-select
              mode="multiple"
              :size="size"
              placeholder="请选择要删除的小组成员"
              v-decorator="[
                'delete_members',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择要删除的小组成员!',
                    },
                  ],
                },
              ]"
            >
              <a-select-option
                v-for="item in deleteStuList"
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
export default {
  props: {
    task_id: {
      type: String,
      required: true,
    },
    deleteStuList: [],
  },
  data() {
    return {
      formLayout: "horizontal",
      form3: this.$form.createForm(this, { name: "coordinated3" }),
      size: "default",
      visible3: false,
      confirmLoading3: false,
    };
  },

  methods: {
    //删除组员的方法
    handleDeleteMembersBtn(e) {
      e.preventDefault();
      this.form3.validateFields((err, values) => {
        if (!err) {
          this.$emit(
            "handleDeleteMembersBtn",
            values.delete_members,
            async (res) => {
              // console.log("回调res3", res);
              //重置表单数据
              this.form3.resetFields();
            }
          );
        }
      });
    },

    //弹出框方法
    showModal3() {
      this.visible3 = true;
    },
    handleOk3(e) {
      this.confirmLoading3 = true;
      this.handleDeleteMembersBtn(e);
      this.visible3 = false;
      this.confirmLoading3 = false;
    },
    handleCancel3(e) {
      this.visible3 = false;
      this.form3.resetFields(); //重置表单数据
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-member-btn {
  color: #f56c6c;
  transition: all 0.3s linear;
  &:hover {
    transition: all 0.3s linear;
    border-color: #f56c6c;
    box-shadow: 0 0px 28px rgb(0 0 0 / 9%);
  }
}
</style>