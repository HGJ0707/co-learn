<template>
  <div class="modify-container">
    <a-button @click="showModal" class="modify-group-name-btn">
      修改组名
    </a-button>
    <a-modal
      centered
      title="修改组名"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="确认"
      cancelText="取消"
    >
      <p>
        <a-form
          autocomplete="off"
          hideRequiredMark
          :form="form"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          @submit="handleGroupNameBtn"
        >
          <a-form-item label="修改组名">
            <a-input
              v-decorator="[
                'groupName',
                { rules: [{ required: true, message: '请输入小组名称!' }] },
              ]"
              placeholder="请输入小组名称"
            />
          </a-form-item>
        </a-form>
      </p>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    group_name: "",
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      //弹出框数据
      visible: false,
      confirmLoading: false,
    };
  },

  methods: {
    //修改组名方法
    handleGroupNameBtn(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("handleGroupNameBtn", values.groupName, (res) => {
            // console.log("回调res", res);
            this.form.resetFields(); //重置表单数据
          });
        }
      });
    },

    //弹出框方法
    showModal() {
      this.visible = true;
      this.form.setFieldsValue({
        groupName: this.group_name,
      });
    },
    handleOk(e) {
      this.confirmLoading = true;
      this.handleGroupNameBtn(e);
      this.visible = false;
      this.confirmLoading = false;
    },
    handleCancel(e) {
      this.visible = false;
      this.form.resetFields(); //重置表单数据
    },
  },
};
</script>

<style lang="scss" scoped>
.modify-group-name-btn {
  color: #67c23a;
  transition: all 0.3s linear;
  &:hover {
    transition: all 0.3s linear;
    border-color: #67c23a;
    box-shadow: 0 0px 28px rgb(0 0 0 / 9%);
  }
}
</style>>
