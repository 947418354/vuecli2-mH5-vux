<template>
  <!-- eslint-disable -->
  <div class="my-play-video-dialog" v-show="visible">
    <div class="dialog-relative" @click="onClickMask">
      <div>
        <div class="video-box">
          <video :src="url" controls @click.stop=""></video>
        </div>
      </div>
      <div class="close" @click.stop="onClickMask">×</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
/**
 * 全屏弹窗式播放视频dialog
 * visible  dialog show与否,请同步绑定
 * 
 * 
 */
export default {
  props: {
    visible: {
      type: Boolean
    },
    url: {}
  },
  mounted() {
    
  },
  methods: {
    onClickMask() {
      this.$emit("update:visible", false);
    },
    
  }
};
</script>

<style lang="less">
.my-play-video-dialog {
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
  .video-box {
    video {
      width: 100%;
    }
  }
  .close {
    position: absolute;
    top: 30px;
    right: 15px;
    color: #fff;
  }
}
</style>
