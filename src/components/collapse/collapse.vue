<template>
  <!-- eslint-disable -->
  <div class="comp-collapse">
    <div class="flex-between" @click="onClickSpindle">
      <slot name="title">
        <div class="title">{{title}}</div>
      </slot>
      <div class="item-right">
        <x-icon v-show="isExtend" type="ios-arrow-up" size="30"></x-icon>
        <x-icon v-show="!isExtend" type="ios-arrow-down" size="30"></x-icon>
      </div>
    </div>
    <el-collapse-transition>
    <!-- <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave"> -->
      <div v-show="isExtend" class="collapse-wrap">
        <div ref="content1">
          <slot></slot>
        </div>
      </div>
    <!-- </transition> -->
    </el-collapse-transition>
  </div>
</template>

<script>
/* eslint-disable */
// 为什么用函数式组件有问题？？？
import ElCollapseTransition from "./collapseTransition";

export default {
  props: {
    title: {},
  },
  data() {
    return {
      isExtend: false,
      contentHeight: 0
    };
  },
  watch: {
    // isExtend: {
    //   handler: function(n) {
    //     if (n) {
    //       this.contentHeight = this.$refs.content1.clientHeight + "px";
    //     } else {
    //       this.contentHeight = 0;
    //     }
    //   }
    // }
  },
  components: {
    ElCollapseTransition
  },
  methods: {
    onClickSpindle() {
      this.isExtend = !this.isExtend;
    },
    beforeEnter(el) {
      // addClass(el, 'collapse-transition');
      console.log("beforeEnter执行el", el);
      el.classList.add("collapse-transition");
      if (!el.dataset) el.dataset = {};

      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;

      el.style.height = "0";
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },

    enter(el) {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + "px";
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = "";
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }

      el.style.overflow = "hidden";
    },

    afterEnter(el) {
      // for safari: remove class then reset height is necessary
      // removeClass(el, 'collapse-transition');
      el.classList.remove("collapse-transition");
      el.style.height = "";
      el.style.overflow = el.dataset.oldOverflow;
    },

    beforeLeave(el) {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    },
    leave(el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        // addClass(el, 'collapse-transition');
        el.classList.add("collapse-transition");
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
    },

    afterLeave(el) {
      // removeClass(el, 'collapse-transition');
      el.classList.remove("collapse-transition");
      el.style.height = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
  }
};
</script>

<style lang="less">
@keyframes height0ToAuto {
  0% {
    height: 0;
  }
  100% {
    height: auto;
  }
}
.comp-collapse {
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
  .item-right {
    display: flex;
    align-items: center;
  }
  .collapse-wrap {
    will-change: height;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid #ebeef5;
    // height: 0;
    // transition: height 2s;
  }
  .collapse-transition {
    color: red;
    transition: 10s height ease-in-out, 10s padding-top ease-in-out,
      10s padding-bottom ease-in-out;
  }
}
</style>