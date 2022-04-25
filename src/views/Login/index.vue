<template>
  <div class="login-container">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
      autocomplete="off"
    >
      <div class="left-banner">
        <div>
          <p class="banner-title">Co-Learn</p>
          <p class="banner-text">学生协作学习平台</p>
          <a href="/public/guide.docx" download="Co-Learn-Guide.docx">
            <a-popover title="Tips">
              <template slot="content">
                <span>
                  使用前可下载《使用须知》文件了解平台的相关功能和操作步骤！
                </span>
              </template>
              《使用指南》
            </a-popover>
          </a>
        </div>
      </div>
      <div class="right-banner">
        <div class="title-container">
          <div
            class="login-teacher"
            @click="teacherLogin"
            :class="{ loging: tec == true }"
          >
            老师登录
          </div>
          <div
            class="login-student"
            @click="studentLogin"
            :class="{ loging: tec == false }"
          >
            学生登录
          </div>
        </div>
        <div class="login-part">
          <a-form-item>
            <a-input
              v-decorator="[
                'loginId',
                {
                  rules: [{ required: true, message: '请输入账号' }],
                },
              ]"
              placeholder="手机号 / 学号"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码' }],
                },
              ]"
              :type="passwordType"
              placeholder="密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
              <a-icon
                @click="showPwd"
                slot="prefix"
                :type="passwordType === 'password' ? 'eye' : 'eye-invisible'"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox
              v-decorator="[
                'remember',
                {
                  valuePropName: 'checked',
                  initialValue: true,
                },
              ]"
            >
              <a-popover>
                <template slot="content">
                  <span>默认30天免登录！</span>
                </template>
                记住密码
              </a-popover>
            </a-checkbox>
            <a-button
              :loading="loading"
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              登录
            </a-button>
            <RouterLink
              :to="{
                name: 'Register',
              }"
            >
              <a-popover>
                <template slot="content">
                  <span>
                    注册功能仅老师使用，学生请使用老师提供的账号进行登录！
                  </span>
                </template>
                立即注册（仅老师）
              </a-popover>
            </RouterLink>
          </a-form-item>
        </div>
      </div>
      <!-- <div class="copy-right">Co-Learn ©2022 Created by Wu and Hu</div> -->
    </a-form>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      loading: false,
      tec: true,
      passwordType: "password",
    };
  },
  methods: {
    // 表单提交方法
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) {
          //表单验证错误
          if (err.loginId) {
            this.$message.warning(err.loginId.errors[0].message);
          } else if (err.password) {
            this.$message.warning(err.password.errors[0].message);
          }
        } else {
          //表单验证通过
          if (values.remember) {
            values.remember = 7;
          }
          values.tec = this.tec;
          this.loading = true;
          this.$store
            .dispatch("login/loginData", values)
            .then(() => {
              this.$router.push({
                name: "Home",
              });
              this.loading = false;
            })
            .catch((res) => {
              // console.log(res, "Login登录出错");
              this.loading = false;
            });
        }
      });
    },
    // 显示密码方法
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },

    //切换老师和学生的登录状态
    teacherLogin() {
      this.tec = true;
    },
    studentLogin() {
      this.tec = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
  border-radius: 2px;
  margin: 20px 0;
}
.login-container {
  width: 100vw;
  min-width: 500px;
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-form {
    background-color: white;
    // min-width: 380px;
    height: 450px;
    padding: 40px;
    border-radius: 12px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    flex-shrink: 0;
    display: flex;
    position: relative;
    .left-banner {
      background-color: white;
      border-right: 1px dashed #ccc;
      width: 400px;
      flex-shrink: 0;
      margin-right: 40px;
      padding-right: 40px;
      display: flex;
      align-content: space-around;
      flex-wrap: wrap;
      justify-content: center;
      div {
        position: relative;
        .banner-title {
          font-size: 60px;
          font-weight: 600;
          text-align: center;
          color: #1890ff;
          font-style: italic;
          margin: 0;
        }
        .banner-text {
          font-size: 30px;
          font-weight: 200;
          text-align: center;
          color: #1890ff;
          margin-bottom: 50px;
        }
        a {
          font-size: 16px;
          text-align: center;
          color: #1890ff;
          margin: 0 auto;
          position: absolute;
          left: 0;
          right: 0;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    @media screen and (max-width: 900px) {
      .left-banner {
        display: none;
      }
    }
    .right-banner {
      flex-shrink: 0;
      .title-container {
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;
        margin-bottom: 40px;
        color: #333;
        .login-teacher,
        .login-student {
          cursor: pointer;
          height: 35px;
        }
        .loging {
          border-bottom: 3px solid #1890ff;
          font-weight: bold;
        }
      }
    }
    .copy-right {
      position: absolute;
      bottom: -100px;
      left: 270px;
    }
  }
}
</style>

<style lang="scss">
.ant-input-affix-wrapper {
  .ant-input {
    border: 1px solid #e9e9e9;
    border-radius: 2px;
    box-shadow: 0 0 0 0;
    &:focus {
      border: 1px solid #007fff;
    }
  }
}

.ant-input-prefix {
  .anticon-eye,
  .anticon-eye-invisible {
    position: relative;
    left: 235px;
  }
}
</style>