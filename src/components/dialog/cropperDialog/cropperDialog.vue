<template>
  <div class="my-cropper-dialog">
    <div class="dialog-relative">
      <div>
        <div class="image-container">
          <img id="clip_image" :src="imgUrl" />
        </div>
        <div class="mask"></div>
        <div class="crop_loading">
          <span class="crop_mask"></span>
          <div class="crop_content">
            <!-- <img src="${loadingGIF}" /> -->
            <div class="crop_text">正在上传...</div>
          </div>
        </div>
        <div class="btn-container">
          <div id="cancel_clip" @click="clickCancel">取消</div>
          <div id="clip_button" @click="clickConfirm">选取</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**请用v-if控制此dialog的存在与否? */
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  props: {
    visible: {},
    imgUrl: {},
    opt: {      // 构建cropper实例时的配置参数
      default: () => ({}),
      type: Object
    },
  },
  data() {
    return {
      preview: null
    };
  },
  mounted() {
    this.preview = document.getElementById("clip_image");
    // const opt = {
    //   resultObj: null
    // };
    // const cropper = new Cropper(image, {
    //   crop(event) {
    //     console.log(event.detail.x);
    //     console.log(event.detail.y);
    //     console.log(event.detail.width);
    //     console.log(event.detail.height);
    //     console.log(event.detail.rotate);
    //     console.log(event.detail.scaleX);
    //     console.log(event.detail.scaleY);
    //   }
    // });
    this.cropper = new Cropper(this.preview, {
      aspectRatio: this.opt.aspectRatio || 5 / 4,   // 裁剪区定型,宽高比
      autoCropArea: this.opt.autoCropArea || 1,
      viewMode: 1,
      guides: this.opt.aspectRatio == "Free" ? false : true,
      cropBoxResizable: this.opt.aspectRatio == "Free" ? false : true,
      cropBoxMovable: this.opt.aspectRatio == "Free" ? false : true,
      dragCrop: this.opt.aspectRatio == "Free" ? false : true,
      background: false,
      checkOrientation: true,
      checkCrossOrigin: true,
      zoomable: false,
      zoomOnWheel: false,
      center: false,
      toggleDragModeOnDblclick: false,
      ready: () => {
        // console.log(self.cropper.rotate(90))
        if (this.opt.aspectRatio == "Free") {
          let cropBox = self.cropper.cropBox;
          cropBox.querySelector("span.cropper-view-box").style.outline = "none";
          self.cropper.disable();
        }
      }
    });
  },
  methods: {
    clickConfirm() {
      let self = this;
      let image = new Image();
      let croppedCanvas;
      let roundedCanvas;

      // Crop
      // 显示上传中的状态
      // document.querySelector(".crop_loading").style.display = "block";
      setTimeout(function() {
        croppedCanvas = self.cropper.getCroppedCanvas();
        // Round
        roundedCanvas = self.getRoundedCanvas(croppedCanvas);
        let imgData = croppedCanvas.toDataURL();
        image.src = imgData;
        self.$emit("confirm", imgData);
        self.$emit("update:visible", false);

        //判断图片是否大于100k,不大于直接上传，反之压缩
        /*if (imgData.length < 100 * 1024) {
          //图片上传
          self.postImg(imgData);
        } else {
          image.onload = function() {
            //压缩处理
            let data = self.compress(image, self.Orientation);
            //图片上传
            self.postImg(data);
          };
        }*/
      }, 20);
    },
    clickCancel() {
      this.$emit("update:visible", false);
    },
    //获取裁剪图片资源
    getRoundedCanvas(sourceCanvas) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let width = sourceCanvas.width;
      let height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;

      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.rect(0, 0, width, height);
      context.fill();

      return canvas;
    }
  }
};
</script>

<style lang="less">
.my-cropper-dialog {
  position: fixed;
  padding: 0 !important;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #000;
  .dialog-relative {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

#clip_container.container {
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}
#clip_container.container > div.image-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#clip_image {
  max-width: 100%;
}
.mask,
.btn-container {
  position: absolute;
  width: 100%;
  height: 130px;
  bottom: 0;
}
.btn-container > div {
  position: absolute;
  bottom: 50px;
  color: white;
  font-size: 20px;
  &#cancel_clip {
    left: 20px;
  }
  &#clip_button {
    right: 20px;
  }
}
.mask {
  z-index: 8;
  background: #000;
  opacity: 0.5;
}
.btn-container {
  z-index: 9;
}
.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}
.crop_loading,
.crop_success {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  .crop_mask {
    position: absolute;
    height: 100px;
    width: 100px;
    border-radius: 5px;
    background: rgba(17, 17, 17, 0.7);
    z-index: 8;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
.crop_loading .crop_content {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  height: 100px;
  width: 100px;
  vertical-align: middle;
  color: #fff;
  font-size: 16px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9;
}
.crop_loading .crop_content img {
  margin-top: 15px;
  margin-bottom: 10px;
}
.crop_success .crop_success_text {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  width: 120px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-wrap-box {
  overflow: hidden;
}

.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}

.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.cropper-dashed {
  position: absolute;

  display: block;

  opacity: 0.5;
  border: 0 dashed #eee;
}

.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: 0.75;
}

.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}

.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}

.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: 0.1;
}

.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}

.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #39f;
}

.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}

.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}

.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}

.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 15px;
  height: 15px;
  cursor: se-resize;
  opacity: 1;
}

@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}

.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #39f;
}

.cropper-invisible {
  opacity: 0;
}

.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>