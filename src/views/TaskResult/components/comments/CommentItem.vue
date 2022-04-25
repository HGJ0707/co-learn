<template>
  <div class="comment-container">
    <a-comment>
      <template slot="actions">
        <!-- 评论时间 -->
        <a-tooltip slot="datetime">
          <span>{{ comment.create_time }}</span>
        </a-tooltip>
        <!-- 评论点赞 -->
        <span key="comment-basic-like" v-if="!isRemark">
          <a-tooltip title="Like">
            <a-icon
              type="like"
              :theme="likeState ? 'twoTone' : 'outlined'"
              @click="like"
            />
          </a-tooltip>
          <span style="padding-left: '8px'; cursor: 'auto'">
            {{ comment.like_count }}
          </span>
        </span>
        <!-- 回复评论 -->
        <span
          v-if="!isRemark"
          slot="actions"
          key="comment-basic-reply-to"
          class="replybox"
          @click="handleReplyto(comment.id, comment.username)"
        >
          <!-- 当前评论的id和评论者名字 -->
          <a-anchor :target-offset="targetOffset" :affix="false">
            <a-anchor-link href="#my-textarea" title="回复" />
          </a-anchor>
        </span>
      </template>
      <!-- 评论人 -->
      <a
        slot="author"
        style="font-size: 13px; font-weight: 600"
        v-if="!isRemark"
        >{{ comment.username ? comment.username : "访客" }}</a
      >
      <a
        slot="author"
        style="font-size: 13px; font-weight: 600"
        v-if="isRemark"
        >{{ comment.teacher_name }}</a
      >
      <!-- 评论内容 -->
      <p slot="content" class="comment-content">{{ comment.content }}</p>
      <!-- 头像 -->
      <a-avatar
        slot="avatar"
        src=""
        alt="xxx"
        class="avatarSty"
        v-if="!isRemark"
        :style="{ background: avaBgr }"
        ><span>{{
          comment.username ? comment.username.slice(-2) : "访客"
        }}</span>
      </a-avatar>
      <a-avatar
        v-if="isRemark"
        slot="avatar"
        src=""
        alt="xxx"
        class="avatarSty"
        :style="{ background: avaBgr }"
        ><span>{{ comment.teacher_name.slice(-2) }}</span>
      </a-avatar>
      <slot name="childComment"></slot>
    </a-comment>
    <a-divider />
  </div>
</template>

<script>
import { commentLike } from "@/api/comment";
import moment from "moment";
const colorList = [
  "#86e3cd",
  "#d1e6a6",
  "#ffde95",
  "#fa887a",
  "#ccabdb",
  "#5e8286",
  "#81c9dc",
  "#198bdb",
];
let colorListLen = colorList.length;
export default {
  props: {
    comment: "",
    parent_user: "",
    commentLikeList: null,
    isRemark: false,
  },
  data() {
    return {
      targetOffset: undefined,
      action: null,
      moment,
      userId: this.$store.getters["login/user"],
      userName: this.$store.getters["login/userName"],
      likeInfo: {
        uid: this.$store.getters["login/uid"],
        comment_id: this.comment.id,
        state: false,
      },
      avaBgr: "#1890ff",
    };
  },
  computed: {
    // 显示当前用户已经点赞的评论标志
    likeState: function () {
      return this.commentLikeList.has(this.comment.id);
    },
  },
  methods: {
    handleReplyto(commentId, comment_user) {
      this.$emit("handleReplyto", {
        commentId,
        comment_user,
      });
    },
    like() {
      if (!this.commentLikeList.has(this.comment.id)) {
        this.comment.like_count++;
        this.likeInfo.state = true;
      } else {
        this.comment.like_count--;
        this.likeInfo.state = false;
      }
      console.log(this.likeInfo, "点赞信息");
      commentLike(this.likeInfo).then((res) => {
        this.$emit("fetchCommentList", async (res) => {
          // this.$message.success("点赞成功！");
        });
      });
    },
    // 获取头像背景颜色
    getAvatarColor() {
      let index = Math.floor(Math.random() * colorListLen);
      // console.log(colorList[index], "随机颜色");
      this.avaBgr = colorList[index];
    },
  },
  mounted() {
    this.targetOffset = window.innerHeight / 2;
  },
  created() {
    // 随机获取头像颜色
    this.getAvatarColor();
  },
};
</script>
<style lang="scss" >
.ant-comment-avatar {
  span {
    span {
      background-color: transparent !important;
    }
  }
}
.reply-to {
  padding-left: 5px;
  color: #409eff;
  font-weight: 600;
  font-size: 12px;
}

.ant-comment-actions {
  margin: 0px;
  li {
    span {
      font-size: 12px;
      color: #99a2aa;
      margin-right: 7px;
      a {
        color: #99a2aa;
      }
    }
    :hover {
      color: #409eff;
    }
  }
}
.replybox {
  position: relative;
  top: 2px;
  .ant-anchor-wrapper {
    display: inline-block;
    padding: 0;
    .ant-anchor-ink {
      display: none;
    }
    .ant-anchor-link {
      padding: 0;

      a {
        font-size: 12px;
        color: #99a2aa;
      }
      :hover {
        color: #409eff;
      }
    }
  }
}

.comment-content {
  font-size: 14px;
  margin: 5px 0px;
}

.ant-comment-inner {
  padding: 5px 0;
}

.avatarSty {
  margin-right: 12px;
}
</style>
