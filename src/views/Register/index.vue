<template>
  <div class="register-container">
    <a-form
      :form="form"
      @submit="handleSubmit"
      :hideRequiredMark="true"
      autocomplete="off"
    >
      <div class="title-container">
        <div class="register">
          <div class="register-switch">注册（仅老师）</div>
        </div>
      </div>

      <a-form-item v-bind="formItemLayout">
        <a-input
          class="input-box"
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请填写姓名!' }],
            },
          ]"
        >
          <span slot="prefix" style="color: rgba(0, 0, 0, 0.5)">姓名：</span>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [
                {
                  message: '手机号码格式不正确',
                  pattern: new RegExp(
                    /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
                    'g'
                  ),
                },
                { required: true, message: '请填写手机号码!' },
              ],
            },
          ]"
          style="width: 100%"
        >
          <span slot="prefix" style="color: rgba(0, 0, 0, 0.5)">手机：</span>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" has-feedback>
        <a-input
          placeholder="6-18位任意字符"
          v-decorator="[
            'password',
            {
              rules: [
                {
                  message: '密码强度不符合要求',
                  pattern: new RegExp(/^.{6,18}$/),
                },
                {
                  required: true,
                  message: '请填写密码!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        >
          <span slot="prefix" style="color: rgba(0, 0, 0, 0.5)">密码：</span>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" has-feedback>
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: '请确认密码!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        >
          <span slot="prefix" style="color: rgba(0, 0, 0, 0.5)">确认：</span>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <a-button :loading="vloading" type="primary" html-type="submit">
          <router-link to="/login">返回登录页</router-link>
        </a-button>
        <a-button
          :loading="vloading"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          注 册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { postRegister } from "@/api/register.js";
export default {
  data() {
    return {
      vloading: false,
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    // 表单提交方法
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          if (err.name) {
            this.$message.warning(err.name.errors[0].message);
          } else if (err.phone) {
            this.$message.warning(err.phone.errors[0].message);
          } else if (err.password) {
            this.$message.warning(err.password.errors[0].message);
          } else if (err.confirm) {
            this.$message.warning(err.confirm.errors[0].message);
          }
        } else {
          this.vloading = true;
          this.postRegisterData(values);
        }
      });
    },
    // 注册方法
    async postRegisterData(values) {
      let resp = await postRegister({
        teacher_name: values.name,
        phone_num: values.phone,
        teach_pwd: values.password,
      });
      this.vloading = false;
      this.$message.success("注册成功！");
      if (resp === undefined) {
        return;
      }
      this.$router.push({ name: "Login" });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入的密码不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  position: relative;
  width: 100vw;
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.ant-form {
  background-color: white;
  height: 450px;
  min-width: 380px;
  padding: 40px;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .title-container {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 40px;
    div {
      color: #333;
    }
  }
  .ant-row {
    .ant-form-item-children {
      .ant-btn {
        width: 100px;
      }
      .login-form-button {
        margin-left: 100px;
      }
    }
  }
}
</style>

<style lang="scss">
.ant-form {
  .ant-input {
    border: 1px solid #e9e9e9;
    border-radius: 2px;
    box-shadow: 0 0 0 0;
    &:focus {
      border: 1px solid #007fff;
    }
  }
}
.register-container {
  .ant-input {
    text-indent: 20px;
  }
}
</style>