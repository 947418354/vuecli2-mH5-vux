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
                  <img :src="eCardInfo.headerUrl" alt />
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
              <audio ref="audio" class="audio" :src="eCardInfo.audioUrl" controls autoplay></audio>
            </div>
          </div>
        </div>
        <div>
          <div class="audio-get-shadow-box">
            <!-- input-box的意思在于 input自替换时 通过其控制显示与否 -->
            <div v-show="!eCardInfo.audioUrl" class="input-box">
              <input
                class="opacity0-file-input"
                type="file"
                accept="audio/*"
                @change="changeAudio($event)"
              />
            </div>
            <button>录制音频</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 形象照片区 -->
    <!-- input变形块 -->
    <div>
      <div class="input-mutate-container">
        <div v-show="eCardInfo.imgUrl" class="img-box-item img-box">
          <img :src="eCardInfo.imgUrl" alt @click="onClickImg" />
          <x-icon
            type="ios-close"
            size="20"
            @click.stop="onClickClearImg"
            style="position: absolute;top: -10px;right:-20px;fill: rgba(0,0,0,0.3)"
          ></x-icon>
        </div>
        <div class="input-box-item">
          <x-icon
            type="ios-plus-empty"
            size="30"
            style="position: relative;top: 50%;transform: translateY(-50%);"
          ></x-icon>
          <input class="file-input" type="file" accept="image/*" @change="changeHeader($event)" />
        </div>
        <div class="tip-item" style="padding-left:13px;">
          <div>
            支持拍摄/上传图片
            <br />图片格式：比例3:2
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="xingxiang-img-container">
        <div class="img-container">
          <div class="img-box">
            <img :src="eCardInfo.imgUrl" alt @click="onClickImg" />
          </div>
          <!-- <input
            class="opacity0-file-input"
            type="file"
            accept="image/*"
            @change="changeHeader($event)"
          />-->
        </div>
      </div>
    </div>
    <video class="video" :src="eCardInfo.videoUrl" controls></video>
    <!-- 视频区 -->
    <!-- input变形块 -->
    <div v-show="!eCardInfo.videoUrl || true">
      <div class="input-video-mutate-container input-mutate-container">
        <div v-show="eCardInfo.videoUrl" class="video-box-item img-box-item">
          <!-- 此视频作为封面假视频使用 -->
          <div style="height: 100%; overflow: hidden;">
            <video
              :src="eCardInfo.videoUrl"
              @click="onClickFaceVideo"
              style="width:100%;height:100%;"
            ></video>
          </div>
          <x-icon
            type="ios-close"
            size="20"
            @click.stop="onClickClearVideo"
            style="position: absolute;top: -10px;right:-20px;fill: rgba(0,0,0,0.3)"
          ></x-icon>
        </div>
        <div v-show="!eCardInfo.videoUrl" class="input-box-item">
          <x-icon
            type="ios-plus-empty"
            size="30"
            style="position: relative;top: 50%;transform: translateY(-50%);"
          ></x-icon>
          <input class="file-input" type="file" accept="video/*" @change="changeVideo($event)" />
        </div>
        <div class="tip-item" style="padding-left:13px;">
          <div>
            支持拍摄/上传视频
            <br />视频格式：最大时长为1分钟
          </div>
        </div>
      </div>
    </div>
    <!-- 视频整块预览 -->
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
    <!-- 文本域块 -->
    <div>
      <div class="textarea-box">
        <textarea
          class="textarea"
          v-model="eCardInfo.introduction"
          cols="30"
          rows="10"
          placeholder="请输入个人简介…"
        ></textarea>
        <!-- <div class="tip">最多输入500字</div> -->
        <div class="tip">{{textareaHaveNum}}/500</div>
      </div>
    </div>
    <cropperDialog
      v-if="isCropperShow"
      :visible.sync="isCropperShow"
      :imgUrl="changeUrl"
      @confirm="cropperDialogConfirm"
    ></cropperDialog>
    <playVideoDialog :visible.sync="isPlayVideoDialog" :url="eCardInfo.videoUrl"></playVideoDialog>
  </div>
</template>

<script>
/* eslint-disable */
/**exitFullscreen()
 * 修改电子名片页
 * 拍照头像， 录音说明， 视频介绍。图片压缩
 */
// import Cropper from "cropperDialogjs";
import cropperDialog from "@/components/dialog/cropperDialog/cropperDialog";
import playVideoDialog from "@/components/dialog/playVideoDialog/playVideoDialog";
import lrz from "lrz";
import axios from "axios";

export default {
  data() {
    return {
      eCardInfo: {
        headerUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg",
        videoUrl: "",
        introduction: ""
      },
      changeUrl: "",
      audioLocalUrl: "", // 音频本地url
      videoLocalUrl: "", // 视频本地url
      customVideo: "",
      readCurrentTimeInterval: "",
      videoCurrentTime: "", // 视频当前时间,双精度浮点型 单位秒
      cdnVideoSrc: "",
      formModel: {
        callNum: "18912341234",
        microMessageNum: "weixinnum"
      },
      isCropperShow: false,
      isPlayVideoDialog: false
    };
  },
  computed: {
    textareaHaveNum: function() {
      return this.eCardInfo.introduction.length;
    }
  },
  watch: {
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
    cropperDialog,
    playVideoDialog
  },
  mounted() {
    this.customVideo = document.getElementById("customVideo");
    this.readCurrentTimeInterval = setInterval(() => {
      this.videoCurrentTime = this.customVideo.currentTime;
    }, 1000);
  },
  beforeDestroy() {
    // 清除本地音视频url
    URL.revokeObjectURL(this.audioLocalUrl);
    URL.revokeObjectURL(this.videoLocalUrl);
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
    onClickImg() {
      this.isViewImgDialog = true;
    },
    changeAudio(e) {
      // 'http://music.163.com/song/media/outer/url?id=562598065.mp3'
      // 选取文件时的需求限制,根据业务需求配置
      const xuqiuConfig = {
        isTimeLimit: true, // 选择的音频是否限制时长?
        timeLimit: 60 // 时间限制多少? 单位秒.isTimeLimit为true时有意义
      };
      let file = e.target.files[0];
      if (file instanceof File) {
        URL.revokeObjectURL(this.audioLocalUrl);
        this.audioLocalUrl = URL.createObjectURL(file);
        if (xuqiuConfig.isTimeLimit) {
          var audioElement = new Audio(this.audioLocalUrl);
          var duration;
          audioElement.addEventListener("loadedmetadata", _event => {
            duration = audioElement.duration;
            console.log(duration + "s");
            if (duration > xuqiuConfig.timeLimit) {
              this.$vux.alert.show({
                title: "选择文件失败!",
                content: "音频文件限制时长60s",
                onShow() {
                  // console.log("Plugin: I'm showing");
                },
                onHide() {
                  // console.log("Plugin: I'm hiding");
                }
              });
            } else {
              this.tempSaveAudio(file);
            }
          });
        } else {
          this.tempSaveAudio(file);
        }
        // 用新的文件input替换旧的文件input 以实现input的files清空 就可以重复选择同一文件了
        const input = document.createElement("input");
        input.classList.add("opacity0-file-input");
        input.type = "file";
        input.accept = "audio/*";
        input.addEventListener("change", this.changeAudio);
        e.target.replaceWith(input);
      }
    },
    // 选择的符合要求的音频进行暂存,并渲染到页面
    tempSaveAudio(file) {
      this.audioFile = file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = res => {
        this.eCardInfo.audioUrl = res.currentTarget.result;
      };
    },
    clickAudioPlay() {
      const audio = this.$refs.audio;
      audio.play();
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
      const xuqiuConfig = {
        isTimeLimit: true, // 选择的音频是否限制时长?
        timeLimit: 600 // 时间限制多少? 单位秒.isTimeLimit为true时有意义
      };
      let file = e.target.files[0];
      if (file instanceof File) {
        URL.revokeObjectURL(this.videoLocalUrl);
        this.videoLocalUrl = URL.createObjectURL(file);
        if (xuqiuConfig.isTimeLimit) {
          var videoElement = document.createElement("video");
          videoElement.addEventListener("loadedmetadata", _event => {
            duration = videoElement.duration;
            console.log(duration + "s");
            if (duration > xuqiuConfig.timeLimit) {
              this.$vux.alert.show({
                title: "选择文件失败!",
                content: "视频文件限制时长60s",
                onShow() {
                  // console.log("Plugin: I'm showing");
                },
                onHide() {
                  // console.log("Plugin: I'm hiding");
                }
              });
            } else {
              this.tempSaveVideo(file);
            }
          });
          videoElement.src = this.videoLocalUrl;
          var duration;
        } else {
          this.tempSaveVideo(file);
        }
        // 用新的文件input替换旧的文件input 以实现input的files清空 就可以重复选择同一文件了
        const input = document.createElement("input");
        input.classList.add("file-input");
        input.type = "file";
        input.accept = "video/*";
        input.addEventListener("change", this.changeVideo);
        e.target.replaceWith(input);
      }
    },
    // 选择的符合要求的视频频进行暂存,并渲染到页面
    tempSaveVideo(file) {
      this.videoFile = file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = res => {
        this.eCardInfo.videoUrl = res.currentTarget.result;
      };
    },
    onClickClearVideo() {
      this.eCardInfo.videoUrl = "";
      this.videoFile = "";
    },
    // 点击选择的视频假封面
    onClickFaceVideo() {
      this.isPlayVideoDialog = true;
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
    clickSave: async function() {
      // axios并发请求准备
      const iterable = [];
      // 如果更改了图片,图片压缩上传
      if (
        this.eCardInfo.imgUrl &&
        this.eCardInfo.imgUrl.indexOf("http") !== 0
      ) {
        // 压缩并上传
        await lrz(this.eCardInfo.imgUrl)
          .then(rst => {
            // 处理成功会执行
            iterable.push(this.uploadImageLrz(rst.base64));
          })
          .catch(err => {
            console.log(err);
            // 处理失败会执行
            this.$vux.alert.show({
              title: "温馨提示",
              content: "网络异常，稍后重试"
            });
          });
        /*const formData = new FormData();
        formData.append("file", this.imgFile, this.imgFile.name);
        formData.append("uploadType", 1);
        iterable.push(
          apiFile.fileUpload(formData).then(res => {
            this.eCardInfo.imgUrl = res.data.resultContent.url;
          })
        );*/
      }
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
          apiECard.eCardUpdate(this.eCardInfo).then(() => {
            this.saveSuccess();
          });
        })
      );
    },
    // 保存成功调用,保存请求成功后
    saveSuccess() {
      this.$vux.toast.show({
        text: "保存成功"
      });
    },
    // 发起上传压缩图片64码
    uploadImageLrz(files) {
      return apiAccount
        .uploadImageByBase64({
          imageData: files.replace(/^data:image\/(jpeg|jpg|png);base64,/, "")
        })
        .then(res => {
          if (res.data) {
            const { url, fileName } = res.data.resultContent;
            this.eCardInfo.imgUrl = url;
            // return res.data.resultContent;
          }
        })
        .catch(err => {
          console.log(err);
          this.$vux.alert.show({
            title: "温馨提示",
            content: "网络异常,稍后重试"
          });
          return false;
        });
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
  .input-mutate-container {
    display: flex;
    align-items: center;
    .img-box-item {
      width: 80px;
      height: 80px;
      position: relative;
      img {
        height: 100%;
        object-fit: cover;
      }
    }
    .input-box-item {
      width: 80px;
      height: 80px;
      border: 1px dashed #d9d9d9;
      text-align: center;
      position: relative;
      .file-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .tip-item {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(181, 182, 183, 1);
      line-height: 20px;
    }
  }
  .xingxiang-img-container {
    .img-container {
      position: relative;
    }
  }
  .input-video-mutate-container {
    .video-box-item {
      video {
        object-fit: cover;
      }
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
  .textarea-box {
    border-radius: 4px;
    border: 1px solid rgba(230, 232, 237, 1);
    background: rgba(255, 255, 255, 1);
    padding: 10px;
    .textarea {
      width: 100%;
      border: 0;
      background: transparent;
      outline: none;
      resize: none;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 20px;
      &::-webkit-scrollbar {
        display: none;
      }
      &::-webkit-input-placeholder {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(181, 182, 183, 1);
        line-height: 20px;
      }
    }
    .tip {
      text-align: right;
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