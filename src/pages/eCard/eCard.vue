<template>
  <div class="p-e-card">
    <div class="block">
      <div class="traditional-card-container">
        <div style="display: flex; justify-content: between;">
          <div style="width: 30%;">
            <div style="position: relative; width: 50px; height: 50px;">
              <input
                type="file"
                accept="image/*"
                @change="changeHeader($event)"
                style="position: absolute; width: 100%; height: 100%; opacity: 0;"
              />
              <img :src="headerSrc" alt style="width: 100%; height: 100%;" />
            </div>
          </div>
          <div>
            <div>张三</div>
            <div>某某经理</div>
            <div>{{eCardInfo.orgName}}</div>
          </div>
        </div>
        <div>电话: 18912341234</div>
        <div>微信: {{microMessageNum}}</div>
        <div>地址: {{address}}</div>
      </div>
    </div>
    <!-- 音频块 -->
    <div>
      <div class="audio-container">
        <div class="img-box">
          <img :src="headerSrc" alt />
        </div>
        <div class="audio-box">
          <div @click="clickAudioPlay">覆盖audio</div>
          <audio ref="audio" class="audio" :src="audioSrc" controls autoplay></audio>
        </div>
      </div>
    </div>

    <div>
      <div>
        <button>录制音频</button>
        <input type="file" accept="audio/*" @change="changeaudio($event)" />
      </div>
    </div>
    <div>
      <video class="video" :src="videoSrc" controls></video>
      <!-- 自定义视频控件 -->
      <div style="position:relative;">
        <video id="customVideo" class="video" :src="cdnVideoSrc"></video>
        <div class="custom-video-controls">
          <div>
            <button @click.stop="clickPlay">播放/暂停</button>
          </div>
        </div>
      </div>
      <div>
        <button>录制视频</button>
        <input type="file" accept="video/*" @change="changeVideo($event)" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 个人电子名片页
 * 拍照头像， 录音说明， 视频介绍。
 */

export default {
  data() {
    return {
      eCardInfo: {
        orgName: '某某城某某部',  // 机构名称
      },
      headerSrc: unHeaderImg,
      audioSrc: "",
      videoSrc: "",
      customVideo: "",
      readCurrentTimeInterval: '',
      videoCurrentTime: '',   // 视频当前时间,双精度浮点型 单位秒
      cdnVideoSrc: ""
    };
  },
  mounted() {
    this.customVideo = document.getElementById("customVideo");
    this.readCurrentTimeInterval = setInterval(() => {
      this.videoCurrentTime = this.customVideo.currentTime;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.readCurrentTimeInterval)
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
          this.audioSrc = res.currentTarget.result;
        };
      }
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
    clickAudioPlay() {
      const audio = this.$refs.audio;
      audio.play();
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
    }
  }
};
</script>

<style lang="less">
.p-e-card {
  .traditional-card-container {
    padding: 10px;
    border: 1px solid #000;
  }

  .audio-container {
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
    }
  }
  .video {
    width: 100%;
  }
  .custom-video-controls {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
  }
}
</style>