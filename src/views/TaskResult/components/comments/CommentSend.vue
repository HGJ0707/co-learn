<template>
  <div class="comment-send-container">
    <a-comment id="comment-area">
      <div slot="content">
        <a-form-item class="avatar-item"
          >{{ this.$store.getters["login/userName"] ? this.$store.getters["login/userName"].slice(-2) : "访客" }}
        </a-form-item>
        <a-form-item class="text-item">
          <a-textarea
            id="my-textarea"
            :rows="2"
            v-model="commentInfo.comment_content"
            placeholder="快来发送评论吧~~~"
          />
        </a-form-item>
        <a-form-item class="btn-box">
          <a-button
            html-type="submit"
            :loading="submitting"
            type="primary"
            @click="handleSubmit"
            >发表评论</a-button
          >
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>
<script>
import { sendComment } from "@/api/comment";
export default {
  data() {
    return {
      submitting: false,
      commentInfo: {
        uid: this.$store.getters["login/uid"],
        comment_content: "",
        work_id: this.work_id,
        parent_id: null, // #如果是评论就不传
      },
    };
  },
  props: {
    work_id: "",
    sendInfo: {},
  },
  watch: {
    work_id: {
      async handler(newVal) {
        this.work_id = newVal;
        // console.log("this.work_id-send", this.work_id);
      },
      immediate: true, //immediate:true代表如果在 wacth 里声明了之后，就会立即先去执行里面的
      deep: true, //deep，默认值是 false，代表是否深度监听。
    },
    sendInfo: {
      async handler(newVal) {
        this.sendInfo = newVal;
        document
          .querySelector("#my-textarea")
          .setAttribute(
            "placeholder",
            "回复: " + "@" + this.sendInfo.comment_user
          );
      },
      // immediate: true, //immediate:true代表如果在 wacth 里声明了之后，就会立即先去执行里面的
      deep: true, //deep，默认值是 false，代表是否深度监听。
    },
  },
  methods: {
    // 发送评论
    async handleSubmit() {
      if (!this.commentInfo.comment_content) {
        return;
      }
      this.submitting = true;
      if (this.sendInfo.commentId) {
        this.commentInfo.parent_id = this.sendInfo.commentId;
      }
      console.log(this.commentInfo, "提交评论");
      await sendComment(this.commentInfo)
        .then((res) => {
          this.submitting = false;
          this.commentInfo.comment_content = "";
          document
            .querySelector("#my-textarea")
            .setAttribute("placeholder", "");
          this.$message.success("评论成功！");
          // 提交评论后重新获取评论
          this.$emit("fetchCommentList", () => {});
          this.$emit("reload");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.comment-container {
  .ant-comment-inner {
    .ant-comment-content {
      .ant-comment-content-detail > div {
        display: flex;
        margin: 0;
        height: 52px;
        .avatar-item {
          width: 52px;
          background: #1890ff;
          text-align: center;
          line-height: 52px;
          border-radius: 50%;
          margin: 0;
          span {
            height: 52px;
            line-height: 52px;
            color: white;
          }
        }
        .text-item {
          flex-grow: 1;
          padding-left: 20px;
          margin: 0;
          height: 52px;
          textarea {
            height: 52px;
          }
        }
        .btn-box {
          padding-left: 20px;
          height: 52px;
          button {
            height: 52px;
          }
        }
      }
    }
  }
}
.ant-comment-avatar {
  margin: 0;
}
</style>