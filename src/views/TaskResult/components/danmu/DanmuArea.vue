<template>
  <section
    class="barrage-wrapper"
    ref="barrageWrapper"
    :style="{ height: percent + '%' }"
  >
    <div class="barrage-main">
      <div
        class="barrage-main-dm"
        :class="{ 'ani-pause': isPause, 'ani-running': !isPause }"
        ref="barrageMainDm"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // 弹幕源数组
    arr: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 当前弹幕
    currentDanmu: null,
    // 弹幕是否为暂停状态
    isPause: {
      type: Boolean,
    },
    // 弹幕占比
    percent: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      // 每行弹幕数最大值
      MAX_DM_COUNT: 5,
      // 行数
      CHANNEL_COUNT: 5,
      // 弹幕数组
      barrages: [],
      // dom池
      domPool: [],
      intervalDM: null,
      // 取弹幕时间间隔
      interValTime: 1000,
      // 滚动弹幕的通道
      hasPosition: [],
      // 弹幕容器
      barrageMainDm: null,
      // 弹幕容器宽度
      barMainWidth: 2000,
      // 自定义弹幕样式属性列表
      dmStyles: ["color", "fontSize"],
      currentPlayTime: null,
      danmuArray: [],
      danmuItem: null,
    };
  },
  async mounted() {
    this.barrageMainDm = this.$refs.barrageMainDm;
    // 缓存容器宽度
    this.barMainWidth = 2000;
    // 初始化弹幕dom组
    this.init();
  },
  watch: {
    arr: function (list) {
      this.danmuArray = list;
      // console.log(this.danmuArray, "danmulist");
    },
    currentDanmu: function (curDanmu) {
      this.currentDanmu = curDanmu;
      this.danmuItem = curDanmu;
    },
    isPause(val) {
      if (val) {
        // 暂停弹幕
        this.pauseDm();
      } else {
        // 播放弹幕
        this.fn();
      }
    },
    percent(val) {
      this.CHANNEL_COUNT = val / 10;
    },
  },
  methods: {
    fn() {
      var videoObj = document.querySelector("video");
      videoObj.ontimeupdate = () => {
        this.currentPlayTime = videoObj.currentTime;
        // console.log("视频弹幕时间", videoObj.currentTime, this.danmuArray);
        // 播放当前发送的弹幕
        if (this.danmuItem) {
          this.playDm(this.danmuItem);
          this.danmuItem = null;
        }
        // 播放获取的弹幕列表
        if (
          this.danmuArray.length &&
          this.danmuArray[0].danmu_time < videoObj.currentTime
        ) {
          this.playDm(this.danmuArray.shift());
        }
      };
    },
    init() {
      // 先new一些div 重复利用这些DOM
      for (let j = 0; j < this.CHANNEL_COUNT; j++) {
        let doms = [];
        for (let i = 0; i < this.MAX_DM_COUNT; i++) {
          let dom = document.createElement("div");
          dom.className = "barrage-item";
          dom.style.transform = `translate3d(${this.barMainWidth}px,0,0)`;
          // DOM的通道是固定的 所以设置好top就不需要再改变了
          dom.style.top =
            j * (this.barrageMainDm.clientHeight / this.CHANNEL_COUNT) + "px";
          // 每次到animationend结束的时候 就是弹幕划出屏幕了 将DOM位置重置 再放回DOM池
          dom.addEventListener("animationend", (e) => {
            dom.className = "barrage-item";
            dom.style.transform = `translate3d(${this.barMainWidth}px,0,0)`;
            dom.style.animation = null;
            // 清空自定义样式
            this.dmStyles.forEach((key) => {
              dom.style[key] = null;
            });
            // 动画结束后设置当前dom为空闲状态
            if (this.domPool[i][j]) {
              this.domPool[i][j].isFree = false;
            }
          });
          // 放入该通道的DOM池
          doms.push({
            row: j,
            col: i,
            el: dom,
            isUse: false,
            isFree: false,
          });
        }
        this.domPool.push(doms);
      }
      // hasPosition 标记每个通道目前是否有位置
      for (let i = 0; i < this.CHANNEL_COUNT; i++) {
        this.hasPosition[i] = true;
      }
    },
    // 播放弹幕
    playDm(barrage) {
      let channel;
      if (
        barrage.direction == "default" &&
        (channel = this.getChannel()) != -1
      ) {
        let domItem = this.getFreeChannelDom(channel);
        if (domItem) {
          this.shootDanmu(domItem, barrage, channel);
        }
      }
    },
    // 获取弹幕通道
    getChannel() {
      for (let i = 0; i < this.CHANNEL_COUNT; i++) {
        if (this.hasPosition[i] && this.domPool[i].length) return i;
      }
      return -1;
    },
    // 获取空闲通道中空闲的dom
    getFreeChannelDom(channel) {
      let item;
      item = this.domPool[channel].find((it) => !it.isFree);
      return item;
    },
    // 根据DOM和弹幕信息发射弹幕
    shootDanmu(domItem, dmItem, channel) {
      // 设置当前通道为false
      this.hasPosition[channel] = false;
      let dom = domItem.el;
      // 是否已经使用的dom
      if (!domItem.isUse && this.barrageMainDm) {
        domItem.isUse = true;
        this.barrageMainDm.appendChild(domItem.el);
      }
      domItem.isFree = true;
      dom.innerText = dmItem.content;
      dom.className = dmItem.isSelf ? "barrage-item self-dm" : "barrage-item";
      dom.style.animation = "barrage-run 7s linear";
      // 弹幕全部显示之后 才能开始下一条弹幕
      // 大概 dom.clientWidth * 10 的时间 该条弹幕就从右边全部划出到可见区域 再加1秒保证弹幕之间距离
      setTimeout(() => {
        this.hasPosition[channel] = true;
      }, dom.clientWidth * 10 + 1000);
    },
    // 暂停弹幕
    pauseDm() {
      // console.log("暂停弹幕");
    },
  },
};
</script>
<style  lang="scss">
.barrage-wrapper {
  * {
    margin: 0px;
    padding: 0px;
  }
  z-index: 1;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  .barrage-item {
    z-index: 99;
    position: absolute;
    left: 0px;
    top: 0px;
    transform: translateX(-100%);
    padding: 5px 0px;
    user-select: none; // 禁用选择文字
    position: absolute;
    white-space: pre;
    cursor: pointer;
    pointer-events: none;
    perspective: 500px;
    display: inline-block;
    will-change: transform;
    font-size: 25px;
    color: rgb(255, 255, 255);
    font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;
    font-weight: bold;
    line-height: 1.125;
    opacity: 1;
    text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px,
      rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
    &:hover {
      color: red;
      animation-play-state: paused !important;
      z-index: 150;
    }
  }
  .top-item {
    z-index: 100;
  }
  .barrage-main {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .barrage-main-dm {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
.self-dm {
  border: 2px solid red;
  box-sizing: border-box;
}
@keyframes barrage-run {
  0% {
    // transform: translate3d(500px, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes barrage-fade {
  0% {
    visibility: visible;
  }
  100% {
    visibility: hidden;
  }
}
.ani-pause {
  & div {
    animation-play-state: paused !important;
  }
}
.ani-running {
  & div {
    animation-play-state: running !important;
  }
}
</style>