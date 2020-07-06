<template>
  <div class="m-rater-comp">
    <div>
      <div class="img-box">
        <img src="./img/no.png" alt />
      </div>
      <div class="img-box">
        <img src="./img/no.png" alt />
      </div>
      <div class="img-box">
        <img src="./img/no.png" alt />
      </div>
      <div class="img-box">
        <img src="./img/no.png" alt />
      </div>
      <div class="img-box">
        <img src="./img/no.png" alt />
      </div>
    </div>
    <div class="have-container" :style="{ 'width': value / 5 * 100 + '%'}">
      <div class="img-box">
        <img src="./img/have.png" alt />
      </div>
      <div class="img-box">
        <img src="./img/have.png" alt />
      </div>
      <div class="img-box">
        <img src="./img/have.png" alt />
      </div>
      <div class="img-box">
        <img src="./img/have.png" alt />
      </div>
      <div class="img-box">
        <img src="./img/have.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 评分组件 总分5
 */
export default {
  props: {
    value: {}
  },
  watch: {
    value: {
      handler: function(n, o) {
        n / 5 * 100 + '%'
      }
    }
  }
};
</script>

<style lang="less">
.m-rater-comp {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  .img-box {
    width: 15px;
    & + .img-box {
      margin-left: 1px;
    }
  }
  .have-container {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>