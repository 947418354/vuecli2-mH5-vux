<template>
  <!-- eslint-disable -->
  <div class="m-switch">
    <div></div>
    <div style="height: 100%;">
      <input class="checkbox" type="checkbox" :checked="value" @change="onChangeCheckbox" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
/**
 * switch组件 支持样式覆盖
 * v-model
 * @onChange  变化时emit
 */
export default {
  model: {
    prop: "value",
    event: "changeCheckbox"
  },
  props: {
    value: {
      required: true,
    }
  },
  methods: {
    onChangeCheckbox(e) {
      this.$emit("changeCheckbox", e.target.checked);
      this.$emit('onChange')
    }
  }
};
</script>

<style lang="less">
/**  switch里checkbox定型宽高比3:2
 样式重设时更改点
 .m-switch width height
 .checkbox border-radius
 */
.m-switch {
  display: inline-block;
  width: 30px;
  height: 20px;
  .checkbox {
    appearance: none;
    border-radius: 10px;
    overflow: hidden;
    margin: 0;
    outline: 0;
    border: 1px solid #DFDFDF;
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    &:checked {
      background: #35c759;
      &::after {
        transform: translateX(50%);
      }
    }
    &::after {
      box-shadow: 0 0.071429rem 0.214286rem rgba(0, 0, 0, 0.4);
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 66.66%;
      height: 100%;
      border-radius: 50%;
      background-color: #fdfdfd;
      transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    }
  }
}
</style>