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
        <button class="select-btn" @click.stop="slotProps.onClick">{{value | value2name(data)}} ⏷</button>
      </template>
    </popupSinglePicker>
  </div>
</template>

<script>
/* eslint-disable */
import popupSinglePicker from "../popup-single-picker";
import value2name from '../../filters/value2name'

export default {
  props: {
    value: [String, Number],
    data: Array,
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
