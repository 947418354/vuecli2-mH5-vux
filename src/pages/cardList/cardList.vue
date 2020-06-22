<template>
  <div class="page card-list-page">
    <!-- 自定义头标题,样式见根组件全局样式 -->
    <div class="header-title-height">
      <div class="zh-header-container">
        <div class="left-item">
          <div style="position: relative;">
            <x-icon class="x-icon-svg" type="ios-arrow-thin-left" size="40" @click="goBack"></x-icon>
          </div>
        </div>
        <div class="title">页标题</div>
        <div class="right-item">
          <button>编辑</button>
        </div>
      </div>
    </div>
    <!-- 横向卡片 两部分 -->
    <div class="card-two" v-for="(item, i) of browserList" :key="i" @click="clickTraceLog(item)">
      <div>
        <div class="img-box">
          <img :src="item.coverUrl" alt />
        </div>
      </div>
      <div class="body-block">
        <div class="title">{{item.title}}</div>
        <div class="content">{{item.summary}}</div>
        <div class="date"><span>{{formatterDateTime(item.gmtModified)}}</span></div>
      </div>
    </div>
    <!-- 横向卡片 三部分 第三部分日期 -->
    <div class="card-three" v-for="(item, i) of browserList" :key="i">
      <!-- <div class="inline-block">{{ele.id}}</div> -->
      <div class="item-content">
        <div class="inline-block">
          <div class="img-box">
            <img :src="item.coverUrl" alt />
          </div>
        </div>
        <div class="body-block inline-block" style="width: 49%;">
          <div>
            <div class="title">{{item.title}}</div>
            <div class="content">{{item.summary}}</div>
          </div>
        </div>
        <div class="inline-block" style="width: 23%;">
          <span class="date-span">{{formatterDateTime(item.gmtModified)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 卡片列表页
 * 枚举部分常用卡片列表卡片布局
 */
export default {
  methods: {
    goBack() {
      history.back();
    }
  }
};
</script>

<style lang="less">
.card-list-page {
  .card-two {
    height: 80px;
    display: flex;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(41, 43, 45, 1);
      line-height: 22px;
      flex-shrink: 0;
    }
    .content {
      word-break: break-all;
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
      flex-shrink: 0;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(178, 180, 180, 1);
      line-height: 17px;
    }
    .img-box {
      width: 120px;
      height: 90px;
    }
    .body-block {
      height: 100%;
      padding-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .card-three {
    height: 80px;
    .title {
      color: #000;
    }
    .content {
      word-break: break-all;
    }
    .item-content {
      height: 100%;
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
    }
    .date-span {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>