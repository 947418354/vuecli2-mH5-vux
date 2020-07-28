<template>
  <!-- eslint-disable -->
  <div class="zh-view-img-dialog" v-show="visible">
    <div class="dialog-relative" @click="onClickMask">
      <div>
        <div id="view-img-dialog-img" class="img-box">
          <img :src="url" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
/**
 * 全屏图片查看dialog
 * visible  dialog show与否,请同步绑定
 * url  图片的url,支持链接和base64
 * @onLongPress  图片长按事件
 */
export default {
  props: {
    visible: {
      type: Boolean
    },
    url: {}
  },
  mounted() {
    this.listenerLongPress('view-img-dialog-img', this.onLongPressImg, 2000)
  },
  methods: {
    onClickMask() {
      this.$emit("update:visible", false);
    },
    onLongPressImg() {
      this.$emit('onLongPress')
    },
    listenerLongPress(id, func, timeout = 500) {
      var timeOutEvent;
      document
        .querySelector("#" + id)
        .addEventListener("touchstart", function(e) {
          // 开启定时器前先清除定时器，防止重复触发
          clearTimeout(timeOutEvent);
          // 开启延时定时器
          timeOutEvent = setTimeout(function() {
            // 调用长按之后的逻辑函数func
            func();
          }, timeout);
        });

      document
        .querySelector("#" + id)
        .addEventListener("touchmove", function(e) {
          // 长按过程中，手指是不能移动的，若移动则清除定时器，中断长按逻辑
          clearTimeout(timeOutEvent);
          /* e.preventDefault() --> 若阻止默认事件，则在长按元素上滑动时，页面是不滚动的，按需求设置吧 */
        });

      document
        .querySelector("#" + id)
        .addEventListener("touchend", function(e) {
          // 若手指离开屏幕时，时间小于我们设置的长按时间，则为点击事件，清除定时器，结束长按逻辑
          clearTimeout(timeOutEvent);
        });
    }
  }
};
</script>

<style lang="less">
.zh-view-img-dialog {
  position: fixed;
  padding: 0 !important;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #000;
  z-index: 10;
  .dialog-relative {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .img-box {
    width: 100%;
    & > img {
    }
  }
}
</style>
