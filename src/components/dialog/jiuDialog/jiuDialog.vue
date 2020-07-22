<template>
  <!-- eslint-disable -->
  <div class="jiu-dialog" v-show="visible">
    <div class="dialog-relative" @click="onClickMask">
      <div class="dialog-body">
        <div class="jiu-container">
          <div v-for="(item, i) of list" :key="item.code" class="jiu-item" @click="onClickJiu(item.value)">
            <div class="jiu-img-box img-box">
              <img :src="item.url" alt />
            </div>
            <p>{{item.label}}</p>
          </div>
          <div class="jiu-item"></div>
          <div class="jiu-item"></div>
          <div class="jiu-item"></div>
          <div class="jiu-item"></div>
        </div>
        <div>
          <button class="cancel-btn">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
/**
 * dialog
 * visible  dialog show与否,请同步绑定
 *
 *
 */
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: () => {
        return [
          {
            url: "/static/img/wechat.png",
            label: "微信",
            value: "wechat"
          },
          {
            url: "/static/img/wechat.png",
            label: "微信",
            value: "wechat"
          }
        ];
      }
    }
  },
  mounted() {},
  methods: {
    onClickJiu(value) {
      this.$emit('onClickJiu', value)
    },
    onClickMask() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="less">
.jiu-dialog {
  position: fixed;
  padding: 0 !important;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  .dialog-relative {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .dialog-body {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    width: 320px;
  }
  .jiu-container {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 29px 0;
  }
  .jiu-item {
    width: 100px;
    text-align: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    line-height: 17px;
    .jiu-img-box {
      width: 40px;
    }
  }
  .cancel-btn {
    border: 0;
    width: 100%;
    background: transparent;
    border-top: 1px solid rgba(229, 229, 229, 1);
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(41, 43, 45, 1);
    line-height: 24px;
    padding: 15px 0;
  }
}
</style>
