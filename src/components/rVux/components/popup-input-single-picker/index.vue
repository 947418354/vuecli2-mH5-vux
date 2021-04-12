<template>
  <!-- eslint-disable -->
  <div class="c-popup-input-single-picker vux-cell-box">
    <popupSinglePicker :value="popupPickerValue" @input="onInput" :title="title" :data="data" :placeholder="placeholder"></popupSinglePicker>
    <div class="weui-cell vux-x-input" :class="{'weui-cell_access': !disabled}" v-show="showCell">
      <div class="weui-cell__bd weui-cell__primary">
        <input v-model="inputValue" class="weui-input" placeholder="请输入" type="text">
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import popupSinglePicker from "../popup-single-picker";

export default {
  props: {
    valueTextAlign: {
      type: String,
      default: "right",
    },
    title: String,
    cancelText: String,
    confirmText: String,
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: String,
    columns: {
      type: Number,
      default: 1,
    },
    fixedColumns: {
      type: Number,
      default: 0,
    },
    value: {
      type: String,
    },
    showName: Boolean,
    inlineDesc: [String, Number, Array, Object, Boolean],
    show: Boolean,
    displayFormat: Function,
    isTransferDom: {
      type: Boolean,
      default: true,
    },
    columnWidth: Array,
    popupStyle: Object,
    popupTitle: String,
    disabled: Boolean,
  },
  data() {
    return {
      showCell: false,
      popupPickerValue: '',
      inputValue: '',
      isSelectOther: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(n) {
        if (n === '') {
          this.isSelectOther ? this.showCell = true : this.showCell = false
        } else {
          const vObj = this.data.find(ele => ele.value === n)
          if(!vObj || vObj.other) {
            this.showCell = true
            const otherObj = this.data.find(ele => ele.other)
            this.popupPickerValue = otherObj.value
          } else {
            this.showCell = false
            this.popupPickerValue = vObj.value
          }
        }
      },
    },
    inputValue: {
      handler(v) {
        this.$emit('input', v)
      },
    }
  },
  components: {
    popupSinglePicker,
  },
  methods: {
    onInput(v){
      console.log('接收popupSinglePicker的input执行', v)
      const vObj = this.data.find(ele => ele.value === v)
      if (vObj.other) {
        this.isSelectOther = true
        this.$emit('input', this.inputValue)
      } else {
        this.isSelectOther = false
        this.$emit('input', vObj.value)
      }
    },
  },
};
</script>

<style lang="less">
.c-popup-input-single-picker {
}
</style>
