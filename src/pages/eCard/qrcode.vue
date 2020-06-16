<template>
  <div>
    <div class="order-result">
      <div class="result-info">
        <img src="/images/my_wallet_withdraw_deposit_succeed@2x.png" alt />
        订单支付成功！
      </div>
      <div id="qrCode">
        <div id="code"></div>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "",
  props: {},
  data() {
    return {};
  },

  watch: {},
  methods: {},
  components: {
    QRCode
  },

  computed: {},

  beforeMount() {},

  mounted() {
    var canvas = document.getElementById("canvas");
    QRCode.toCanvas(canvas, "https://www.baidu.com", error => {
      if (error) console.log(error);
      console.log("Qrcode generated");
    });
  }
};
</script>
<style lang='' scoped>
</style>