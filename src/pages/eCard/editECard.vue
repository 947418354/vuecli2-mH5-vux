<template>
  <!-- eslint-disable -->
  <div class="p-edit-e-card">
    <div>
      <div class="edit-tradition-container">
        <div>
          <div class="form-item">
            <div class="label-box">头像:</div>
            <div class="value-box">
              <div class="img-box-gen-shadow">
                <input
                  class="opacity0-file-input"
                  type="file"
                  accept="image/*"
                  @change="changeHeader($event)"
                />
                <div class="img-box">
                  <img id="header-img" :src="eCardInfo.headerUrl" alt />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="label-box">电话:</div>
            <div class="value-box">
              <input type="text" v-model="formModel.callNum" />
            </div>
          </div>
          <div>
            <div class="label-box">微信:</div>
            <div class="value-box">
              <input type="text" v-model="formModel.microMessageNum" />
            </div>
          </div>
          <div>
            <div class="label-box">地址:</div>
            <div class="value-box">
              <input type="text" v-model="eCardInfo.address" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 音频块 -->
    <div>
      <div class="audio-block-container">
        <div>
          <div class="audio-container">
            <div class="audio-box">
              <!-- <div @click="clickAudioPlay">覆盖audio</div> -->
              <div @touchstart.prevent="touchstart" @touchend.prevent="touchend">覆盖audio</div>
              <audio ref="audio" class="audio" :src="audioSrc" controls autoplay></audio>
            </div>
          </div>
        </div>
        <div>
          <div class="audio-get-shadow-box">
            <input
              class="opacity0-file-input"
              type="file"
              accept="audio/*"
              @change="changeaudio($event)"
            />
            <button>录制音频</button>
          </div>
        </div>
      </div>
    </div>

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
    <cropperDialog
      v-if="isCropperShow"
      :visible.sync="isCropperShow"
      :imgUrl="changeUrl"
      @confirm="cropperDialogConfirm"
    ></cropperDialog>
  </div>
</template>

<script>
/* eslint-disable */
/**
 * 个人电子名片页
 * 拍照头像， 录音说明， 视频介绍。
 */
// import Cropper from "cropperDialogjs";
import cropperDialog from "@/components/cropperDialog/cropperDialog";
import axios from "axios";

export default {
  data() {
    return {
      eCardInfo: {
        headerUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
      },
      changeUrl: "",
      audioSrc: "",
      videoSrc: "",
      customVideo: "",
      readCurrentTimeInterval: "",
      videoCurrentTime: "", // 视频当前时间,双精度浮点型 单位秒
      cdnVideoSrc: "",
      formModel: {
        callNum: "18912341234",
        microMessageNum: "weixinnum"
      },
      isCropperShow: false
    };
  },
  components: {
    cropperDialog
  },
  mounted() {
    this.customVideo = document.getElementById("customVideo");
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
      if (file instanceof File) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = res => {
          this.changeUrl = res.currentTarget.result;
          this.isCropperShow = true;
        };
      }
    },
    cropperDialogConfirm(img64) {
      this.eCardInfo.headerUrl = img64;
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
    // 自定义音频触摸开始事件, 实现长按删除确认框
    touchstart() {
      var _this = this;
      this.long = setTimeout(() => {
        _this.long = 0;
        //执行长按要执行的内容，如弹出菜单
        // console.log("执行长按操作");
        this.$vux.confirm.show({
          // 组件除show外的属性
          content: "是否删除此条录音?",
          onConfirm() {
            // console.log('确认框确认事件', _this)
            _this.eCardInfo.audioUrl = "";
          }
        });
      }, 1000);
      console.log("指向定时器的变量", this.long);
      return false;
    },
    // 自定义音频触摸结束事件, 实现长按删除确认框
    touchend(index) {
      var that = this;
      clearTimeout(this.long);
      if (that.long != 0) {
        //这里写要执行的内容（尤如onclick事件）
      }
      return false;
    },
    changeVideo(e) {
      let file = e.target.files[0];
      if (file instanceof File) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = res => {
          this.videoSrc = res.currentTarget.result;
        };
      }
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
    },
    // 点击保存
    clickSave() {
      // axios并发请求准备
      const iterable = [];
      // 判断文件是否有改变?
      if (
        this.eCardInfo.audioUrl &&
        this.eCardInfo.audioUrl.indexOf("data:audio/") !== -1
      ) {
        const formData = new FormData();
        formData.append("file", this.audioFile, this.audioFile.name);
        // 遍历器加入第一个promise,并发送第一波的某个请求
        iterable.push(apiFile.fileUpload(formData));
      }
      if (
        this.eCardInfo.videoUrl &&
        this.eCardInfo.videoUrl.indexOf("data:video/") !== -1
      ) {
        const formData = new FormData();
        formData.append("file", this.videoFile, this.videoFile.name);
        console.log("视频64:", this.eCardInfo.videoUrl);
        iterable.push(apiFile.fileUpload(formData));
      }
      // axios并发核心api all,spread
      axios.all(iterable).then(
        axios.spread((res1, res2) => {
          this.eCardInfo.audioUrl = res1.data.resultContent.url;
          this.eCardInfo.videoUrl = res2.data.resultContent.url;
          // 发送第二波请求
          apiECard.eCardUpdate(this.eCardInfo).then(() => {});
        })
      );
    }
  }
};
</script>

<style lang="less">
.p-edit-e-card {
  & > div {
    padding: 10px;
  }
  .edit-tradition-container {
    .img-box-gen-shadow {
      position: relative;
    }
    .opacity0-file-input {
      position: absolute;
      width: 60px;
      height: 60px;
      opacity: 0;
    }
    .img-box {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .label-box,
    .value-box {
      display: inline-block;
    }
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
    background: #ccc;
  }
  .custom-video-controls {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
  }
}
</style>