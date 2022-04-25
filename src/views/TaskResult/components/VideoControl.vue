<template>
  <div class="relative" @contextmenu.prevent="">
    <div class="content">
      <div class="player" ref="player">
        <video
          preload="auto"
          style="object-fit: contain; width: 100%"
          :src="job_url"
          ref="videoEle"
        ></video>
        <!-- 弹幕区域 -->
        <DanmuControl
          ref="barrageMain"
          class="barrage-main"
          :work_id="work_id"
          :playState="playState"
          :fullScreenState="fullScreenState"
        />
        <!-- 视频控制条区域 -->
        <div class="control">
          <div @click="handlePlay">
            <a-icon type="play-circle" v-if="!playState" />
            <a-icon type="pause-circle" v-else />
          </div>
          <div style="height: 4px">
            <a-slider
              v-model="progressValue"
              class="progress"
              @change="handleChangeProgress"
              :min="0"
              :max="totalT"
              :step="0.00001"
            ></a-slider>
          </div>
          <div class="timer">
            <span class="progress_timer">00:00:00</span>/
            <span class="duration_timer">00:00:00</span>
          </div>
          <div style="position: relative" class="audioProgress">
            <a-icon type="sound" ref="audioProgress" />
            <div
              v-show="audioProAppear"
              style="
                display: inline-block;
                height: 100px;
                position: absolute;
                left: -14px;
                bottom: 30px;
                padding: 7px 0;
              "
            >
              <a-slider
                v-model="audioValue"
                vertical
                :default-value="30"
                @change="audioChange"
              />
            </div>
          </div>
          <div @click="handleSreen">
            <a-icon type="fullscreen" v-if="!fullScreenState" />
            <a-icon type="fullscreen-exit" v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DanmuControl from "./danmu/DanmuControl";
export default {
  components: {
    DanmuControl,
  },
  props: {
    job_url: "",
    work_id: "",
  },
  data() {
    return {
      playState: false, // 视频播放状态
      fullScreenState: false, //全屏true,非全屏false
      total: 0,
      myTime: "", //当前播放时间节点
      progressValue: 0,
      audioValue: 30,
      audioProAppear: false,
      percent: 0, //当前播放和总时间之间的差值
      totalT: 0, //总时间
    };
  },
  methods: {
    // 视频播放方法
    handlePlay() {
      var videoEle = document.querySelector("video");
      var progressTimer = document.querySelector(".progress_timer");
      var durationTimer = document.querySelector(".duration_timer");
      if (videoEle.paused) {
        videoEle.play();
        videoEle.addEventListener("timeupdate", () => {
          let { totalT, presentT } = { totalT: 0, presentT: 0 };
          totalT = videoEle.duration;
          var videoDuration = this.formatTime(totalT);
          durationTimer.innerHTML = videoDuration;

          presentT = videoEle.currentTime;
          var videoCurrent = this.formatTime(presentT);
          progressTimer.innerHTML = videoCurrent;

          this.totalT = totalT;
          this.progressValue = videoEle.currentTime;
          if (this.progressValue == this.totalT) {
            //进度条重置为0
            this.progressValue = 0;
            //停止播放
            videoEle.pause();
            this.playState = false;
          }
        });
        this.playState = true;
      } else {
        // 视频暂停
        videoEle.pause();
        this.playState = false;
      }
    },
    // 改变进度条方法
    handleChangeProgress() {
      var videoObj = document.querySelector("video");
      videoObj.currentTime = this.progressValue;
    },
    //实现全屏和退出全屏方法
    handleSreen() {
      if (!this.fullScreenState) {
        let playerObj = document.querySelector(".player");
        let barrageObj = document.querySelector(".barrage-main");
        if (playerObj.requestFullscreen) {
          playerObj.requestFullscreen();
          barrageObj.requestFullscreen();
        } else if (playerObj.mozRequestFullScreen) {
          playerObj.mozRequestFullScreen();
          barrageObj.mozRequestFullScreen();
        } else if (playerObj.webkitRequestFullScreen) {
          playerObj.webkitRequestFullScreen();
          barrageObj.webkitRequestFullScreen();
        }
        this.fullScreenState = true;
      } else {
        let de = document;
        if (de.exitFullscreen) {
          de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
          de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
          de.webkitCancelFullScreen();
        }
        this.fullScreenState = false;
      }
    },
    //时间格式化
    formatTime(t) {
      var h = parseInt(t / 3600);
      h = h < 10 ? "0" + h : h;
      var m = parseInt((t % 3600) / 60);
      m = m < 10 ? "0" + m : m;
      var s = parseInt(t % 60);
      s = s < 10 ? "0" + s : s;
      return h + ":" + m + ":" + s;
    },
    // 音量
    audioChange() {
      let videoObj = this.$refs.videoEle;
      videoObj.volume = this.audioValue / 100;
    },
  },
  mounted() {
    // 空格进行暂停和播放
    let videoObj = this.$refs.videoEle;
    console.log(videoObj);
    document.body.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        // 阻止按空格自动往下翻页
        e.preventDefault();
        this.handlePlay();
      }
    });

    // 音量
    const audioPro = document.querySelector(".audioProgress");
    audioPro.addEventListener("mouseover", () => {
      this.audioProAppear = true;
    });
    audioPro.addEventListener("mouseout", () => {
      this.audioProAppear = false;
    });

    //观察video宽度，设为非全屏,显示发送弹幕区域
    var resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // 如果视频宽度小于800则认为是非全屏状态
        if (entry.contentRect.width < 900) {
          this.fullScreenState = false;
        }
      }
    });
    resizeObserver.observe(videoObj);
  },
};
</script>

<style lang="scss" scoped>
/*video样式*/
.video-box {
  overflow: hidden;
  background: #000;
  width: 750px;
  display: block;
  margin: 0 auto;
  -webkit-transition-duration: 300ms;
  -moz-transition-duration: 300ms;
  -ms-transition-duration: 300ms;
  -o-transition-duration: 300ms;
  transition-duration: 300ms;
  z-index: 10;
}
.video-box-body {
  width: 100%;
  height: 422px;
  overflow: hidden;
  position: relative;
}
.video-body {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 15;
}
.video-js {
  .vjs-control-bar {
    .vjs-icon-custombutton {
      font-family: VideoJS;
      font-weight: normal;
      font-style: normal;
    }
    .vjs-icon-custombutton:before {
      content: "\f108";
      font-size: 1.8em;
      line-height: 1.67;
    }
  }
}
* {
  margin: 0;
  padding: 0;
}
/* 去掉全屏时显示的自带控制条 */
video::-webkit-media-controls {
  display: none !important;
}
.wrap h3 {
  text-align: center;
  height: 100px;
  line-height: 100px;
}
.player {
  width: 100%;
  height: 461.25px;
  margin: 0 auto;
  position: relative;
  background-color: black;
}
.player video {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
}
.control {
  display: flex;
  align-items: center;
}
.player .control {
  position: absolute;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  z-index: 999;
}
.player .control div {
  display: inline-block;
  line-height: 40px;
  margin: 0px 10px;
  font-size: 22px;
  color: #fff;
  cursor: pointer;
}
.player .control div:nth-child(2) {
  width: 460px;
  height: 12px;
  overflow: hidden;
  flex: 1;
  margin: 0 10px;
}
.player .control .progress {
  display: block;
  width: 100%;
  height: 12px;
  margin-left: 0;
}
.player .control .timer {
  font-size: 12px;
}
// 弹幕全屏
.player .barrage-main {
  width: 100%;
}
.expand {
  width: 50px;
}
.el-tooltip {
  vertical-align: super;
}
.a-slider__button {
  border: none;
  width: 10px;
  height: 10px;
  margin: 0 10px;
}
.a-slider__button-wrapper {
  height: 0;
}
.baseParamPressimg {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss">
.progress {
  height: 4px;
  transition: all 0.2s ease-in-out;
  .ant-slider-track {
    background-color: #00a1d6;
  }
  .ant-slider-handle {
    border: none;
    opacity: 0;
  }
}
</style>