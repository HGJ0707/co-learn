<template>
  <div class="barrage-container">
    <div
      @click="handleClick"
      class="barrage-main"
      style="
        width: 100%;
        height: 461.25px;
        position: relative;
        margin: 0px auto;
        opacity: 1;
      "
    >
      <!-- 弹幕区域。确保父元素是相对定位，弹幕容器是绝对定位。arr:弹幕内容数组  percent:弹幕显示行数（10代表一样） -->
      <DanmuArea
        :arr="arr"
        :currentDanmu="currentDanmu"
        :isPause="!playState"
        :percent="30"
        v-show="isShow"
      />
    </div>
    <!-- 弹幕操作区域 -->
    <div class="barrage-control" :class="{ show: fullScreenState }">
      <!-- 开启/关闭弹幕 -->
      <a-tooltip>
        <template slot="title"> 开启/关闭弹幕 </template>
        <a-switch
          checked-children="开"
          un-checked-children="关"
          default-checked
          @click="isShow = !isShow"
        />
      </a-tooltip>
      <!-- 发送弹幕 -->
      <a-input-search
        placeholder="快来发送弹幕吧~~~"
        enter-button="发送"
        v-model="sendContent"
        @search="sendBarrage"
        style="
          flex-shrink: 1;
          margin-left: 50px;
          width: 400px;
          border-radius: 0px;
        "
      />
    </div>
  </div>
</template>

<script>
import DanmuArea from "./DanmuArea";
import { getDanmuList, sendDanmu } from "@/api/danmu";
export default {
  components: {
    DanmuArea,
  },
  props: {
    playState: null,
    fullScreenState: true,
    work_id: "",
  },
  data() {
    return {
      arr: [],
      currentDanmu: null,
      isShow: true,
      isJs: false,
      direction: "default",
      sendContent: null,
      danmuInfo: {
        uid: this.$store.getters["login/uid"],
        content: "",
        work_id: this.work_id,
        danmu_birth_time: "",
      },
    };
  },
  async mounted() {
    let res = await this.fetchDanmuList();
    let newarr = [];
    res.map((item) => {
      newarr.push(Object.assign(item, { direction: "default" }));
    });
    this.arr = newarr;
  },
  methods: {
    handleClick() {
      this.$emit("handleClick");
    },
    // 获取弹幕列表
    async fetchDanmuList() {
      let work = {};
      work.work_id = this.work_id;
      return await getDanmuList(work).then((res) => {
        // 按弹幕生成时间排序
        res.list = res.list.sort((a, b) => {
          return a.danmu_time - b.danmu_time;
        });
        return res.list;
      });
    },
    // 发送弹幕
    sendBarrage() {
      if (this.sendContent != "" && this.sendContent != null) {
        var videoObj = document.querySelector("video");
        this.danmuInfo.content = this.sendContent;
        this.danmuInfo.danmu_birth_time = videoObj.currentTime;
        // console.log(this.danmuInfo, "发送的弹幕信息");
        sendDanmu(this.danmuInfo).then((res) => {
          this.$message.success("弹幕发送成功");
        });
        this.currentDanmu = {
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: "white",
            fontSize: "25px",
          },
        };
      }
      this.sendContent = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.barrage-control {
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 8px #e5e9ef;
  height: 50px;
}
.show {
  display: none;
}
.ant-input-search {
  .ant-input-wrapper {
    input {
      border-radius: 0px;
    }
    .ant-input-group-addon {
      button {
        border-radius: 0px;
      }
    }
  }
}
</style>

<style lang="scss">
.ant-input-search {
  .ant-input-wrapper {
    input {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    .ant-input-group-addon {
      button {
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
    }
  }
}
</style>