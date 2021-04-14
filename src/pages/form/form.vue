<template>
  <!-- eslint-disable -->
  <div>
    <!-- <singlePicker
      v-model="pickerValue"
      :data="data"
    ></singlePicker> -->
    <popupSinglePicker
      title="表单条目标题"
      v-model="pickerValue"
      placeholder="请选择"
      :data="data"
    ></popupSinglePicker>
    <popupSinglePicker
      title="表单条目标题"
      v-model="pickerValue"
      placeholder="请选择"
      :data="data"
    >
      <template slot="default" slot-scope="slotProps">
        <div @click.stop="slotProps.onClick">自定义展示</div>
      </template>
    </popupSinglePicker>
    <selector v-model="pickerValue" placeholder="请选择" :data="data"></selector>
  </div>
</template>

<script>
/* eslint-disable */
import singlePicker from "@/components/rVux/components/picker";
import popupSinglePicker from "@/components/rVux/components/popup-single-picker";
import selector from "@/components/rVux/components/selector";
import { PopupPicker } from "vux";

export default {
  props: {},
  data() {
    return {
      pickerValue: "b",
      data: [
        {
          name: "2019届5班",
          value: "a",
        },
        {
          name: "2019届4班",
          value: "b",
        },
      ],
      pickerValue1: ["b"],
      data1: [
        [
          {
            name: "2019届5班",
            value: "a",
          },
          {
            name: "2019届4班",
            value: "b",
          },
        ],
      ],
    };
  },
  watch: {
    pickerValue: {
      immediate: true,
      handler: function (n) {
        console.log(n);
      },
    },
  },
  components: {
    singlePicker,
    popupSinglePicker,
    selector,
    PopupPicker,
  },
  methods: {},
};
</script>

<style lang="less">
</style>
