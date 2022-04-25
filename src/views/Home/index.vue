<template>
  <div class="home-container">
    <div class="home-content">
      <div class="hot-item-box" v-for="item in workList" :key="item.work_id">
        <a
          :href="[
            'taskresult/' +
              '?group_name=' +
              item.group_name +
              '&task_id=' +
              item.task_id +
              '&task_type=' +
              item.task_type +
              '&leader_id=' +
              item.group_leader +
              '&work_id=' +
              item.id,
          ]"
        >
          <div class="hot-item-imgBox">
            <img
              :src="[
                item.cover_url
                  ? '/api/get_resource?file_id=' + item.cover_url
                  : reserveSrc,
              ]"
            />
          </div>
        </a>
        <a
          :href="[
            'taskresult/' +
              '?group_name=' +
              item.group_name +
              '&task_id=' +
              item.task_id +
              '&task_type=' +
              item.task_type +
              '&leader_id=' +
              item.group_leader +
              '&work_id=' +
              item.id,
          ]"
        >
          <div class="hot-item-info">
            <p class="hot-item-title">
              {{ item.work_title }}
            </p>
            <div class="hot-item-footer">
              <div class="hot-item-groupname">
                <span><a-icon type="team" />{{ item.group_name }}</span>
              </div>
              <div>
                <span><a-icon type="like" />{{ item.like_count }}</span>
                <span><a-icon type="message" />{{ item.comment_count }}</span>
                <span><a-icon type="eye" />{{ item.pageviews }}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <a-spin class="loading" :spinning="isLoading" />
      <a-empty
        v-if="isEmpty"
        description="没有更多了"
        style="width: 100%; margin-bottom: 50px"
      />
    </div>
    <!-- 回到顶部 -->
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner"><a-icon type="arrow-up" /></div>
      </a-back-top>
    </div>
  </div>
</template>

<script>
import { getHotWorkList } from "@/api/task";
export default {
  data() {
    return {
      page: 0,
      limit: 10,
      workList: [],
      isLoading: false,
      isEmpty: false,
      hotListInfo: {
        page: 0,
        limit: 10,
      },
      reserveSrc: "http://co-learn.cc/public/abc.jpg",
    };
  },
  methods: {
    async fetchWorkList() {
      console.log(this.hotListInfo, "hotinfo");
      return await getHotWorkList(this.hotListInfo).then((res) => {
        if (res && res.length) {
          console.log("res", res);
          return res;
        } else {
          this.isEmpty = true;
          this.isLoading = false;
        }
      });
    },
    // 加载更多
    async fetchMore() {
      this.isLoading = true;
      this.hotListInfo.page++;
      const res = await this.fetchWorkList();
      this.workList = this.workList.concat(res);
      this.isLoading = false;
    },
    lazyLoading() {
      // 正在加载中
      if (this.isLoading) {
        return;
      }
      // 滚动到底部，再加载的处理事件
      // 获取 可视区高度`、`滚动高度`、`页面高度`
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      const range = 100;
      const dec = Math.abs(scrollTop + clientHeight - scrollHeight);
      // 到了底部区域内继续获取数据
      if (dec <= range) {
        this.fetchMore();
      }
    },
  },
  async created() {
    this.workList = await this.fetchWorkList();
    window.addEventListener("scroll", this.lazyLoading);
  },
  destroyed() {
    window.removeEventListener("scroll", this.lazyLoading);
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  justify-content: center;
  .home-content {
    display: flex;
    flex-wrap: wrap;
    width: 1152px;
    box-sizing: border-box;
    margin-top: 64px;
    .hot-item-box {
      width: 525px;
      height: 150px;
      cursor: pointer;
      box-sizing: border-box;
      margin-bottom: 50px;
      display: flex;
      margin-right: 100px;
      .hot-item-imgBox {
        margin-right: 10px;
        img {
          width: 225px;
          height: 150px;
          object-fit: cover;
          border-radius: 2px;
        }
      }
      a {
        color: inherit;
      }
      .hot-item-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 150px;
        .hot-item-title {
          font-size: 20px;
          font-weight: 600;
          color: black;
          width: 290px;
          overflow: hidden; /*超出隐藏*/
          text-overflow: ellipsis; /*文本溢出时显示省略标记*/
          display: -webkit-box; /*设置弹性盒模型*/
          -webkit-line-clamp: 2; /*文本占的行数,如果要设置2行加...则设置为2*/
          -webkit-box-orient: vertical; /*子代元素垂直显示*/
          &:hover {
            color: #1890ff;
          }
        }
        .hot-item-footer {
          span {
            font-size: 12px;
            margin-right: 20px;
            i {
              padding-right: 5px;
              font-size: 14px;
            }
          }
          .hot-item-groupname {
            margin-bottom: 5px;
            span {
              &:hover {
                color: #1890ff;
              }
            }
          }
        }
      }
    }
    .hot-item-box:nth-child(2n) {
      margin-right: 0;
    }
  }
  .loading {
    height: 100px;
    width: 100%;
  }
}
</style>