<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
@import './assets/boot.less';
/**
全局样式
 */
body {
  margin: 0;
  font-weight: 400;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.page {
  padding-top: 60px;
  height: 100%;
  box-sizing: border-box;
}
.page > div {
  padding: 10px;
}

/**头标题 */
.header-title-height {
  height: 64px;
}
.zh-header-container {
  height: 64px;
  padding: 20px 10px 0;
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 44px;
  font-size: 17px;
  font-weight: bolder;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff;
  .left-item {
    vertical-align: middle;
    width: 25%;
    text-align: left;
  }
  .x-icon-svg {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
  .title {
    vertical-align: middle;
    height: 60px;
    padding: 15px 0;
    font-size: 17px;
    line-height: 30px;
    text-align: center;
    width: 50%;
  }
  .right-item {
    vertical-align: middle;
    width: 25%;
    text-align: right;
  }

  /*
  打包样式
  */
  // 样式将图片打包成base64
  .share-icon {
    display: inline-block;
    margin-bottom: -8px;
    width: 30px;
    height: 30px;
    // background: url("~assets/img/common/icon-share.png") no-repeat scroll center;
    background-size: 20px 20px;
    font-size: 0;
  }
}
</style>
