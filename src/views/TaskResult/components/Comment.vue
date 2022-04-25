<template>
  <div class="comment-container">
    <div class="comment-title">
      <span> {{ `共 ${commentCount} 条评论 ` }}</span>
    </div>
    <!-- 发起评论 -->
    <CommentSend
      @reload="reload"
      @fetchCommentList="fetchCommentList"
      :sendInfo="sendInfo"
      :work_id="work_id"
    />
    <!-- 展示老师评语         （要改）      -->
    <div class="teacherComment" v-if="teacherRemark.length">
      <div class="teacherComment-title">老师评语</div>
      <CommentItem
        v-for="(item, index) in teacherRemark"
        :key="'remark-' + index"
        :comment="item"
        :isRemark="true"
      />
    </div>
    <!-- 展示评论 -->
    <div class="studentComment" v-if="this.comments">
      <div class="studentComment-title">评论</div>
      <CommentShow
        @handleReplyto="handleReplyto"
        @fetchCommentList="fetchCommentList"
        :commentList="comments"
        :commentLikeList="commentLikeList"
      />
    </div>
    <a-divider />
    <!-- 发起评论（下滑展示） -->
    <div class="fixedSendComment" v-show="isShow">
      <CommentSend
        @reload="reload"
        @fetchCommentList="fetchCommentList"
        :sendInfo="sendInfo"
        :work_id="work_id"
      />
    </div>
  </div>
</template>

<script>
import CommentSend from "./comments/CommentSend";
import CommentShow from "./comments/CommentShow";
import CommentItem from "./comments/CommentItem";
import { getCommentList, getLikeList } from "@/api/comment";
export default {
  components: {
    CommentSend,
    CommentShow,
    CommentItem,
  },
  props: {
    work_id: {
      type: String,
    },
  },
  data() {
    return {
      comments: null,
      teacherRemark: [],
      commentCount: 0,
      // 回复相关
      sendInfo: {
        commentId: "",
        comment_user: "",
      },
      isShow: false,
      // 获取点赞列表参数
      getLike: {
        student_id: this.$store.getters["login/user"],
        uid: this.$store.getters["login/uid"],
        work_id: null,
      },
      commentLikeList: new Set(),
    };
  },
  watch: {
    work_id: {
      async handler(newVal) {
        this.work_id = newVal;
        this.getLike.work_id = newVal;
        if (newVal) {
          //获取评论列表
          this.comments = await this.fetchComment();
          console.log(this.comments, "评论列表");
          // 获取点赞列表
          let likeList = await this.fetchLikeList();
          this.commentLikeList = new Set(likeList.map((item) => item.id));
          console.log(this.commentLikeList, "当前用户点赞列表");
        }
      },
      immediate: true, //immediate:true代表如果在 wacth 里声明了之后，就会立即先去执行里面的
      deep: true, //deep，默认值是 false，代表是否深度监听。
    },
  },
  methods: {
    // 获取评论列表
    async fetchComment() {
      let info = {};
      info.work_id = this.work_id;
      return await getCommentList(info).then((res) => {
        // 评论总量
        this.commentCount = res.comment_list.length + res.teacher_remark.length;
        this.teacherRemark = res.teacher_remark;
        return this.changeCommentListStyle(res.comment_list);
      });
    },
    // 获取点赞列表
    async fetchLikeList() {
      return await getLikeList(this.getLike).then((res) => {
        return res;
      });
    },

    changeCommentListStyle(commentList) {
      // console.log(commentList, "没有变化的list");
      const idToItemMap = new Map();
      commentList.forEach((item) => {
        idToItemMap.set(item.id, {
          comment_user_uid: item.comment_user_uid,
          id: item.id,
          comment_user: item.comment_user,
          content: item.content,
          like_count: item.like_count,
          work_id: item.work_id,
          create_time: item.create_time,
          update_time: item.update_time,
          state: item.state,
          username: item.username,
          childs: [],
          parent_id: item.parent_id,
        });
      });
      const idMap = {};
      commentList.forEach((item) => {
        idMap[item.id] = idToItemMap.get(item.id);
        // console.log(idMap, "idMap");
        if (item.parent_id) {
          idToItemMap.get(item.parent_id).childs.push(item.id);
        }
      });
      return idMap;
    },
    // 重新获取评论列表和点赞列表
    async fetchCommentList(callback) {
      let res = await this.fetchComment();
      this.comments = res;
      callback(res);
      let likeList = await this.fetchLikeList();
      this.commentLikeList = new Set(likeList.map((item) => item.id));
      console.log("重新获取评论列表和点赞列表");
    },

    handleReplyto(data) {
      this.sendInfo.commentId = data.commentId;
      this.sendInfo.comment_user = data.comment_user;
    },
    reload() {
      this.$emit("reload");
    },
  },
  mounted() {
    // 显示下滑评论框
    window.onscroll = () => {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      if (t >= 1000) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.comment-container {
  .comment-title {
    font-size: 16px;
    margin: 20px 0px 20px;
    display: flex;
    justify-content: space-between;
  }
  .teacherComment,
  .studentComment {
    margin-top: 30px;
    .teacherComment-title,
    .studentComment-title {
      font-size: 16px;
      margin: 10px 0px 0px;
      color: #1890ff;
    }
  }
  .studentComment {
    margin-bottom: 80px;
  }
  .fixedSendComment {
    position: fixed;
    bottom: 0px;
    background-color: white;
    width: 820px;
    height: 120px;
  }

  scroll-behavior: smooth;
}
</style>
