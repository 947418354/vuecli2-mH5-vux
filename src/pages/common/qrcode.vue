<template>
  <!-- eslint-disable -->
  <div class="p-qrcode">
    <div>
      <div class="tip">服务申请成功，请前往门店使用服务，并将如下二维码提供给门店核销。</div>
      <div>
        <img class="qrcode" :src="imgSrc" alt />
        <div class="img-text">安全检测（未使用）</div>
      </div>
    </div>
    <div class="other-tip">请截图转发给客户</div>
  </div>
</template>

<script>
/* eslint-disable */
import QRCode from "qrcode";
import requestCenter from "@/api/center";

export default {
  data() {
    return {
      originPage: this.$route.query.originPage,
      carNo: this.$route.query.carNo,
      imgSrc: ""
    };
  },
  created() {
    switch (this.originPage) {
      case "customerDetail":
        this.$store.commit("commontitle/COMMON_TITLE_SET_TEXT", "申请服务");
        requestCenter
          .agentServeService({ carNo: this.carNo })
          .then(res => {
            if (res.data.resultFlag) {
              QRCode.toDataURL(res.data.resultContent, {
                margin: 0
              })
                .then(url => {
                  console.log(url);
                  this.imgSrc = url;
                })
                .catch(err => {
                  console.error(err);
                });
            } else {
            }
          })
          .catch(err => {
            console.log("发生错误：", err);
          });

        break;

      default:
        break;
    }
  }
};
</script>

<style lang="less">
.p-qrcode {
  text-align: center;
  padding: 21px 30px;
  position: relative;
  .tip {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4a4a4a;
    line-height: 17px;
    text-align: left;
  }
  .qrcode {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4a4a4a;
    line-height: 17px;
    width: 180px;
    height: 180px;
    margin: 22px auto 8px;
  }
  .img-text {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8ba0b5;
    line-height: 20px;
  }
  .other-tip {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-bottom: 40px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4a4a4a;
    line-height: 25px;
  }
}
</style>
