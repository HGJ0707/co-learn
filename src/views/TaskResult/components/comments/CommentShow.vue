<template>
  <div comment-show-area>
    <CommentItem
      @handleReplyto="handleReplyto"
      @fetchCommentList="fetchCommentList"
      v-for="(item1, index) in parentList"
      :key="'parent-' + index"
      :comment="item1"
      :commentLikeList="commentLikeList"
    >
      <!-- 二层留言 -->
      <template #childComment v-if="!isEmpty(item1.childs)">
        <ReplyItem
          @handleReplyto="handleReplyto"
          @fetchCommentList="fetchCommentList"
          v-for="(item2, index) in traverse(item1.childs, [])"
          :key="'children-' + index"
          :comment="item2"
          :parent_user="commentList[item2.parent_id].username"
          :commentLikeList="commentLikeList"
        ></ReplyItem>
      </template>
    </CommentItem>
    <!-- <a-divider /> -->
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
import ReplyItem from "./relpyItem";
export default {
  components: {
    CommentItem,
    ReplyItem,
  },
  props: {
    commentList: null,
    commentLikeList: null,
  },
  data() {
    return {
      parentList: [],
    };
  },
  watch: {
    async commentList() {
      this.parentList = [];
      await this.fetchParentList();
      // this.traverse();
    },
  },
  methods: {
    isEmpty(ls) {
      return ls.length === 0;
    },
    fetchParentList() {
      // console.log("重新执行fetchParentList");
      Object.keys(this.commentList).forEach((id) => {
        if (!this.commentList[id].parent_id) {
          this.parentList.push(this.commentList[id]);
        }
      });
    },
    traverse(ids, res) {
      // console.log("重新执行traverse");
      if (!ids) return null;
      ids.forEach((id) => {
        res.push(this.commentList[id]);
        if (this.commentList[id].childs.length > 0) {
          this.traverse(this.commentList[id].childs, res);
        }
      });
      return res;
    },
    handleReplyto(data) {
      this.$emit("handleReplyto", {
        commentId: data.commentId,
        comment_user: data.comment_user,
      });
    },
    fetchCommentList(callback) {
      this.$emit("fetchCommentList", callback);
    },
  },
  async created() {
    await this.fetchParentList();
  },
};
</script>