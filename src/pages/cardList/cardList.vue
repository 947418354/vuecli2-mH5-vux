<template>
  <div class="page card-list-page">
    <!-- 自定义头标题,样式见根组件全局样式 -->
    <div class="header-title-height">
      <div class="zh-header-container">
        <div class="left-item">
          <div style="position: relative">
            <x-icon
              class="x-icon-svg"
              type="ios-arrow-thin-left"
              size="40"
              @click="goBack"
            ></x-icon>
          </div>
        </div>
        <div class="title">页标题</div>
        <div class="right-item">
          <button>编辑</button>
        </div>
      </div>
    </div>
    <!-- 横向卡片 两部分 左边图片-->
    <div class="card-two">
      <div>
        <div class="img-box">
          <img :src="imgUrl" alt />
        </div>
      </div>
      <div class="body-block">
        <div class="title">
          {item.title}}是多少实打实打算说到底说到底是谁的实打实的都是
        </div>
        <div class="content">
          {item.summary}}sd士大夫士大夫士大夫士大夫士大夫士大夫士大夫士大夫士大夫士大夫士大夫士大夫手动阀手动阀
        </div>
        <div class="date">
          <span>{formatterDateTime(item.gmtModified)}}</span>
        </div>
      </div>
    </div>
    <!-- 横向卡片 三部分 第三部分日期 -->
    <div class="card-three">
      <!-- <div class="inline-block">{{ele.id}}</div> -->
      <div class="item-content">
        <div class>
          <div class="img-box">
            <img :src="imgUrl" alt />
          </div>
        </div>
        <div class="body-block" style="width: 49%">
          <div>
            <div class="title">{item.title}}</div>
            <div class="content">{item.summary}}</div>
          </div>
        </div>
        <div class="data-item" style="width: 23%">
          <span class="date-span">{formatterDateTime(item.gmtModified)}}</span>
        </div>
      </div>
    </div>
    <Swipeout>
      <swipeout-item
        v-for="(item, index) in 3"
        :key="index"
        transition-mode="follow"
      >
        <div slot="right-menu">
          <button class="opt-btn bg"></button>
          <swipeout-button type="primary" class="delete-icon" />
        </div>
        <div slot="content" class="card-three" style="background: red">
          <!-- <div class="inline-block">{{ele.id}}</div> -->
          <div class="item-content">
            <div class>
              <div class="img-box">
                <img :src="imgUrl" alt />
              </div>
            </div>
            <div class="body-block" style="width: 49%">
              <div>
                <div class="title">{item.title}}</div>
                <div class="content">{item.summary}}</div>
              </div>
            </div>
            <div class="data-item" style="width: 23%">
              <span class="date-span"
                >{formatterDateTime(item.gmtModified)}}</span
              >
            </div>
          </div>
        </div>
      </swipeout-item>
    </Swipeout>
  </div>
</template>

<script>
/**
 * 卡片列表页
 * 枚举部分常用卡片列表卡片布局
 */
import { Swipeout, SwipeoutItem, SwipeoutButton } from "vux";

export default {
  data() {
    return {
      imgUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg",
    };
  },
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
  },
  methods: {
    goBack() {
      history.back();
    },
  },
};
</script>

<style lang="less">
.card-list-page {
  .card-two {
    height: 90px; // 跟内部img-box高度保持一致 2处
    display: flex;
    box-sizing: content-box;
    padding: 19px 0;
    // border-bottom: 2px solid #eeeeee;
    & + .card-two {
      border-top: 2px solid #eeeeee;
    }
    .img-box {
      width: 120px;
      height: 90px;
    }
    .body-block {
      height: 100%;
      padding-left: 12px;
      overflow-x: hidden;
      flex-shrink: 1;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      flex-grow: 1;
    }
    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(41, 43, 45, 1);
      line-height: 22px;
      flex-shrink: 0;
    }
    .content {
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 17px;
      overflow-x: hidden;
      overflow-y: hidden;
      flex-grow: 1;
    }
    .date {
      bottom: 0;
      position: absolute;
      flex-shrink: 0;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(178, 180, 180, 1);
      line-height: 17px;
    }
  }
  .card-three {
    height: 80px;
    // border-bottom: 2px solid #eeeeee;
    & + .card-three {
      border-top: 1px solid #9b9b9b;
    }
    .item-content {
      height: 100%;
      display: flex;
      & > .inline-block {
        height: 100%;
        position: relative;
        vertical-align: middle;
      }
    }
    .img-box {
      width: 80px;
      height: 80px;
    }
    .body-block {
      color: #bbb;
      padding-left: 10px;
    }
    .title {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 20px;
    }
    .content {
      word-break: break-all;
    }
    .date-item {
      position: relative;
    }
    .date-span {
      top: 50%;
      transform: translate(0, -50%);
      position: absolute;
    }
  }
  .opt-btn {
    border: none;
    width: 80px;
    height: 100%;
    background-image: url("../../assets/img/eCard/star.png");
  }
}
</style>