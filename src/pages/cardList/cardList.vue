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
    <div
      class="card-with-img"
      v-for="(item, i) of browserList"
      :key="i"
    >
      <!-- <div class="inline-block">{{ele.id}}</div> -->
      <div class="item-content">
        <div class="inline-block" style="width: 24%;">
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
    },
  }
};
</script>

<style lang="less">
.card-list-page {
  .card-with-img {
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