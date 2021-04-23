<template>
  <!-- eslint-disable -->
  <div class="c-selector">
    <popupSinglePicker
      title="表单条目标题"
      v-model="pickerValue"
      placeholder="请选择"
      :data="data"
    >
      <template slot="default" slot-scope="slotProps">
        <button v-show="!value" class="select-btn" @click.stop="slotProps.onClick">{{placeholder}} <span class="iconfont">&#xe629;</span></button>
        <button v-show="value" class="select-btn" @click.stop="slotProps.onClick">{{value | value2name(data)}} <span class="iconfont">&#xe629;</span></button>
      </template>
    </popupSinglePicker>
  </div>
</template>

<script>
/* eslint-disable */
/**
 * 此组件依赖阿里图标字体
 * \static\font
 * \src\assets\appG.less
 */
import popupSinglePicker from "../popup-single-picker";
import value2name from '../../filters/value2name'

export default {
  props: {
    value: [String, Number],
    data: Array,
    placeholder: String,
  },
  data() {
    return {
      pickerValue: this.value
    };
  },
  watch: {
    pickerValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      if (val !== this.pickerValue) this.pickerValue = val
    },
  },
  components: {
    popupSinglePicker,
  },
  methods: {},
  filters: {
    value2name
  },
};
</script>

<style lang="less">
.c-selector {
  .select-btn {
  }
}
</style>
