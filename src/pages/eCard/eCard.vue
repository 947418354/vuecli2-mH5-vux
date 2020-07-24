<template>
  <div class="p-e-card">
    <div class="block">
      <div class="traditional-card-container">
        <div style="display: flex; justify-content: between;">
          <div class="header-item">
            <!-- 给img-box设置背景默认两性图片,真实头像有则覆盖其上 -->
            <div
              class="img-box"
              :class="{male: eCardInfo.userGender === 'M',famale: eCardInfo.userGender === 'F'}"
              style="position: relative; width: 50px; height: 50px;"
            >
              <input
                type="file"
                accept="image/*"
                @change="changeHeader($event)"
                style="position: absolute; width: 100%; height: 100%; opacity: 0;"
              />
              <img
                v-lazy="{src: eCardInfo.headImgUrl, error: '/app/static/img/defaultHead.png'}"
                alt
                style="width: 100%; height: 100%;"
              />
            </div>
          </div>
          <div class="name-item">
            <!-- 姓名职位同行 -->
            <div class="name-container">
              <div class="name-div">{{eCardInfo.userName}}</div>
              <div class="post-div">{{eCardInfo.postName}}</div>
            </div>
            <div class="organ">{{eCardInfo.orgName}}</div>
          </div>
        </div>
        <!-- 分割线 -->
        <div style="border-top: 1px dashed #fff;margin:18px 0;"></div>
        <!-- 附属信息 -->
        <div class="addition-item">电话: 18912341234</div>
        <div class="addition-item">微信: {{eCardInfo.microMessageNum}}</div>
        <div class="addition-item">地址: {{eCardInfo.address}}</div>
      </div>
    </div>
    <!-- 浏览 点赞 评分块 -->
    <div>
      <div class="browser-container">
        <div class="browser-item">
          <div class="img-box" style="width:14px;">
            <img src="@/assets/img/eCard/browserIcon.png" alt />
          </div>
          <span style="padding-left:6px;">浏览 {{eCardInfo.browseNo}}人</span>
        </div>
        <div class="prise-item">
          <div class="img-box" style="width:14px;">
            <img src="@/assets/img/eCard/priseIcon.png" alt />
          </div>
          <span style="padding-left:3px;">靠谱 {{eCardInfo.praiseNo}}</span>
        </div>
        <div class="star-box">
          <span style="vertical-align: middle;">评分:</span>
          <!-- <Rater
            :value="Number(eCardInfo.avgScore)"
            disabled
            :font-size="16"
            style="vertical-align: middle;"
          ></Rater> -->
          <rater :value="Number(eCardInfo.avgScore)"></rater>
          <!-- <div>☆☆☆☆☆</div>
          <div class="real-star">★★★★★</div>-->
        </div>
      </div>
    </div>
    <!-- 音频块 -->
    <div v-show="eCardInfo.audioUrl">
      <div class="audio-container">
        <div class="img-box">
          <img :src="headerSrc" alt />
        </div>
        <div style="padding-left:5px;">
          <div class="audio-box">
            <!-- 单击表面音频根据 音频的有无 进行播放/选择文件操作 -->
            <input
              v-show="!eCardInfo.audioUrl"
              class="file-input"
              type="file"
              accept="audio/*"
              @change="changeAudio($event)"
            />
            <div @click="clickAudioPlay">{{audioDuration}}"</div>
            <audio ref="audio" class="audio" :src="eCardInfo.audioUrl" controls autoplay></audio>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div>
        <button>录制音频</button>
        <input type="file" accept="audio/*" @change="changeaudio($event)" />
      </div>
    </div>
    <!-- 视频块 -->
    <div>
      <!-- 自定义视频控件 -->
      <div
        id="video-container"
        class="video-container"
        @webkitfullscreenchange="fullscreenchange"
        style="position:relative;"
      >
        <div ref="videoBox" class="video-box">
          <video id="customVideo" class="video" :src="cdnVideoSrc" autoplay></video>
          <div class="custom-video-controls">
            <div>
              <button @click.stop="clickPlay">播放/暂停</button>
              <button @click.stop="clickFullScreen">全屏与否</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button>录制视频</button>
        <input type="file" accept="video/*" @change="changeVideo($event)" />
      </div>
    </div>
    <!-- 文本域块 -->
    <div>
      <div class="textarea-box">
        <textarea
          class="textarea"
          v-model="eCardInfo.introduction"
          cols="30"
          rows="10"
          placeholder="我的个人简介..."
        ></textarea>
        <div class="tip">右下角提示信息</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 个人电子名片页
 * 拍照头像， 录音说明， 视频介绍。
 */
import rater from '@/components/rater/rater'
// import { Rater } from "vux";

export default {
  data() {
    return {
      eCardInfo: {
        orgName: "某某城某某部", // 机构名称
        microMessageNum: "",
        avgScore: 3.5,
        userGender: 'M',
      },
      headerSrc: "",
      audioDuration: 0, // 音频时长
      videoSrc: "",
      customVideo: "",
      videoContainerElement: null, // 自定义视频控件外部容器
      readCurrentTimeInterval: "",
      videoCurrentTime: "", // 视频当前时间,双精度浮点型 单位秒
      cdnVideoSrc: "https://v-cdn.zjol.com.cn/276982.mp4",
      fullScreenEnabled: "",
      isFullScreen: false // 用于指示自定义视频是否处于全屏
      /**
       * https://v-cdn.zjol.com.cn/280443.mp4
https://v-cdn.zjol.com.cn/276982.mp4
https://v-cdn.zjol.com.cn/276984.mp4
https://v-cdn.zjol.com.cn/276985.mp4
       */
    };
  },
  watch: {
    // 对文本域双向绑定的值做字数限制, 调整需改两处
    "eCardInfo.introduction": {
      handler: function() {
        if (this.eCardInfo.introduction.length > 500) {
          this.eCardInfo.introduction = String(
            this.eCardInfo.introduction
          ).slice(0, 500);
        }
      }
    }
  },
  components: {
    rater
  },
  mounted() {
    this.customVideo = document.getElementById("customVideo");
    this.videoContainerElement = document.getElementById("video-container");
    customVideo.addEventListener('waiting', () => {
      console.log('video waiting事件')
    })
    // 元素全屏change事件 存在兼容性问题,需加浏览器前缀
    // this.videoContainerElement.addEventListener("webkitfullscreenchange", event => {
    //   console.log('监听到事件', event)
    //   // document.fullscreenElement will point to the element that
    //   // is in fullscreen mode if there is one. If not, the value
    //   // of the property is null.
    //   if (document.fullscreenElement) {
    //     console.log(
    //       `Element: ${document.fullscreenElement.id} entered fullscreen mode.`
    //     );
    //   } else {
    //     console.log("Leaving full-screen mode.");
    //   }
    // });
    this.fullScreenEnabled = !!(
      document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled ||
      document.webkitSupportsFullscreen ||
      document.webkitFullscreenEnabled ||
      document.createElement("video").webkitRequestFullScreen
    );
    this.readCurrentTimeInterval = setInterval(() => {
      this.videoCurrentTime = this.customVideo.currentTime;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.readCurrentTimeInterval);
  },
  methods: {
    changeHeader(e) {
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = res => {
        this.headerSrc = res.currentTarget.result;
      };
    },
    changeaudio(e) {
      let file = e.target.files[0];
      if (file instanceof File) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = res => {
          this.eCardInfo.audioUrl = res.currentTarget.result;
        };
      }
    },
    clickAudioPlay() {
      const audio = this.$refs.audio;
      audio.play();
    },
    changeVideo(e) {
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = res => {
        console.log(res);
        this.videoSrc = res.currentTarget.result;
      };
    },
    // 自定义视频控件点击播放/暂停
    clickPlay() {
      let isPlaying =
        this.customVideo.currentTime > 0 &&
        !this.customVideo.paused &&
        !this.customVideo.ended &&
        this.customVideo.readyState > 2;
      if (!isPlaying) {
        this.customVideo.play();
      } else {
        this.customVideo.pause();
      }
    },
    clickFullScreen() {
      if (this.fullScreenEnabled) {
        if (this.isFullScreen) {
          // 退出全屏api 在pc谷歌端 只有document支持
          const videoContainer = this.videoContainerElement;
          if (videoContainer.exitFullscreen) videoContainer.exitFullscreen();
          else if (videoContainer.mozExitFullScreen)
            videoContainer.mozExitFullScreen();
          else if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
          else if (videoContainer.msExitFullscreen)
            videoContainer.msExitFullscreen();
          this.isFullScreen = false;
          this.$refs.videoBox.style.width = "auto";
          this.$refs.videoBox.style.height = "66vw";
          this.$refs.videoBox.style.transform = "rotate(0deg)";
        } else {
          const videoContainer = this.videoContainerElement;
          if (videoContainer.requestFullscreen)
            videoContainer.requestFullscreen();
          else if (videoContainer.mozRequestFullScreen)
            videoContainer.mozRequestFullScreen();
          else if (videoContainer.webkitRequestFullScreen)
            videoContainer.webkitRequestFullScreen();
          else if (videoContainer.msRequestFullscreen)
            videoContainer.msRequestFullscreen();
          this.isFullScreen = true;
          this.$refs.videoBox.style.width = "100vh";
          this.$refs.videoBox.style.height = "100vw";
          this.$refs.videoBox.style.transform = "rotate(90deg)";
        }
      } else {
        alert("此浏览器不支持全屏");
      }
    },
    fullscreenchange(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less">
.p-e-card {
  .traditional-card-container {
    padding: 10px;
    color: #fff;
    border: 1px solid #000;
    background: linear-gradient(
      315deg,
      rgba(65, 198, 247, 1) 0%,
      rgba(31, 150, 235, 1) 100%
    );
    border-radius: 14px;
    .header-item {
      .img-box {
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        &.male {
          // background-image: url("~assets/img/user/user-head-male.png");
        }
        &.famale {
          // background-image: url("~assets/img/user/user-head-female.png");
        }
      }
    }
    .name-container {
      display: flex;
      align-items: center;
    }
    .name-div {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 28px;
    }
    .post-div {
      padding-left: 10px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
    }
    .organ {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      margin-top: 6px;
    }
    .addition-item + .addition-item {
      margin-top: 10px;
    }
  }

  .browser-container {
    display: flex;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 16px;
    .browser-item {
      width: 30%;
    }
    .prise-item {
      width: 30%;
      display: flex;
      align-items: center;
    }
    .star-box {
      width: 40%;
      position: relative;
    }

    .real-star {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      overflow-x: hidden;
    }
  }

  .audio-container {
    display: flex;
    align-items: center;
    .img-box {
      width: 50px;
      height: 50px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .audio-box {
      display: inline-block;
      display: inline-block;
      width: 167px;
      height: 40px;
      background: rgba(31, 149, 235, 1);
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      &::before {
        display: block;
        content: "";
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-right: 5px solid rgba(31, 149, 235, 1);
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translate(0, -50%);
      }
      .file-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        opacity: 0;
      }
    }
  }
  .video-container {
    .video-box {
      position: relative;
      transform-origin: 50vw 50vw;
    }
  }
  .video {
    width: 100%;
    height: 100%;
    background: yellowgreen;
  }
  .custom-video-controls {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
  }
  .textarea-box {
    position: relative;
    .textarea {
      width: 100%;
    }
    .tip {
      position: absolute;
      right: 5px;
      bottom: 5px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(181, 182, 183, 1);
      line-height: 17px;
    }
  }
}
</style>