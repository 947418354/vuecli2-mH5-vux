<template>
  <div
    v-transfer-dom
    :class="{'vux-1px-b': type !== 'onlyback' && type !== 'login'}"
    class="m-header-container">
    <!-- 常规头部 -->
    <div
      class="m-normal-header">
      <div class="left-container">
        <div
          v-if="!leftCb"
          @click="goBack">
          <i
            v-if="!hasLeft"
            class="back"
          />
        </div>
        <slot name="left"/>
      </div>
      <div class="default-container">
        {{ title }}
        <div
          v-if="!title"
          class="default-slot">
          <slot/>
        </div>
      </div>
      <div class="right-container">
        <button
          v-show="getIsComplete()"
          type="text"
          @click="onClickComplete">完成
        </button>
        <slot name="right"/>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
import { TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'FixedCommonHeader',
  directives: {
    TransferDom,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'normal',
    },
    hasLeft: {
      type: Boolean,
      default: false,
    },
    hasRight: {
      type: Boolean,
      default: false,
    },
    leftCb: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      isStateBar: !(!true),
      specPages: ['register', 'forget', 'deleteAccount'],
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    goBack() {
      // console.log('H5标题栏返回事件goBack执行')
      const currentRouteName = this.$router.currentRoute.name
      if (this.specPages.indexOf(currentRouteName) !== -1 && global.isYxx) {
        window.jsbridge.closeWebView()
        return
      }
      history.back()
    },
    onClickComplete: debounce(() => {
      eventBus.$emit('ebOnClickComplete')
    }, 500),
    getIsComplete() {
      return this.$router.currentRoute.name === 'editECard'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~theme/mixin';

.m-header-container {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;

  .m-index-header,
  .m-normal-header,
  .m-main-header {
    position: relative;
    box-sizing: content-box;
    height: 44px;
    padding: 26px 10px 0;
    .left-container {
      position: absolute;
      left: 10px;
      bottom: 0;
      width: 50px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #64728d;
      &>div {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .back {
          display: block;
          width: 20px;
          height: 20px;
          margin-left: 10px;
          background: url('~assets/img/common/icon-head-back.png') no-repeat scroll center;
          background-size: 20px auto;
        }
      }
    }
    .default-container {
      // width: 100%;
      height: 44px;
      font-size: 17px;
      font-weight: bold;
      text-align: center;
      line-height: 44px;
      padding: 0 50px;
      @include text-truncate;
      .default-slot {
        width: 100%;
        height: 100%;
      }
    }
    .right-container {
      position: absolute;
      right: 10px;
      bottom: 0;
      min-width: 50px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      color: #1D96EB;
    }
  }
  .title-no-state-bar {
    padding-top: 0;
  }
  .m-index-header {
    position: absolute;
    top: -64px;
    left: 0;
    right: 0;
    background: #fff;
    // transform: translateY(-100%);
    transform: translate(0);
    transition: all .2s ease-out;
    &.animation{
      // transform: translate(0);
      transform: translateY(100%);
    }
  }
}
@media only screen and (device-width: 375px) and
(device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .m-header-container {
    .m-index-header,
    .m-normal-header,
    .m-main-header{
      // padding-top: 44px;
      background-color: #fff;
    }
    .title-no-state-bar {
      padding-top: 0;
    }
    .m-index-header{
      top: -88px;
    }
  }
}
@media only screen and (device-width: 414px) and (device-height: 896px) {
  .m-header-container {
    .m-index-header,
    .m-normal-header,
    .m-main-header{
      // padding-top: 44px;
      background-color: #fff;
    }
    .title-no-state-bar {
      padding-top: 0;
    }
    .m-index-header{
      top: -88px;
    }
  }
}
</style>
