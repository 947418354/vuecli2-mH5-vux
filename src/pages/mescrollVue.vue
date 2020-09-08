<template>
  <!-- eslint-disable -->
  <MescrollVue :down="mescrollDown" :up="mescrollUp" class="scroll-cont">
    <!-- 以下内容插入默认插槽div下 -->
    <div class="card-three" v-for="(item, i) of mescrollVueList" :key="item.id">
      <div class="inline-block">
        <div class="img-box">
          <img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg" alt />
        </div>
      </div>
      <div class="inline-block">昵称</div>
      <div class="browser-action inline-block">浏览动作</div>
      <div class="inline-block">2020/06/06 22:00:00</div>
    </div>
    <!-- 无数据时,此元素将被索引到,被给他插入孩纸 不可省略 -->
    <div id="nodata" class="m-list-nodata"></div>
  </MescrollVue>
</template>

<script>
/* eslint-disable */
/**
 * 三方库 mescroll.js 的简化使用示例
 */
import MescrollVue from "mescroll.js/mescroll";

export default {
  data() {
    return {
      mescrollVueList: [],
      mescrollDown: {
        isLock: true
      },
      // 上拉配置
      mescrollUp: {
        callback: this.upCallback,
        noMoreSize: 1, // 列表条数大于等于noMoreSize时 会显示htmlNodata
        page: {
          size: 10
        },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: "nodata", // 父布局的id;
          // icon: './static/mescroll/mescroll-empty.png', // 图标,支持网络图
          tip: "暂无相关数据~" // 提示
        },
        htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据了 --</p>'
      }
    };
  },
  components: {
    MescrollVue
  },
  methods: {
    upCallback(page, mescroll) {
      // console.log("上拉回调");
      if (page.num === 1) {
        this.mescrollVueList = [];
      }
      setTimeout(() => {
        const behandList = [];
        for (let i = 0; i < page.size; i++) {
          behandList.push({
            id: page.num * page.size + i + "",
            headerUrl:
              "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg",
            nickName: "昵称",
            action: "浏览行为",
            dateTime: "2020/06/06 22:00:00"
          });
        }
        const resultContent = {
          list: behandList,
          total: 50
        };
        const { list, total } = resultContent;
        this.mescrollVueList = this.mescrollVueList.concat(list || []);
        // if (isNumber(list.length)) {
        this.$nextTick(() => {
          if (this.mescrollVueList.length >= total) {
            mescroll.endBySize(list.length, total);
          } else {
            mescroll.endSuccess(list.length);
          }
        });
        // }
      }, 2000);
      /*
      const payload = {
        page: page.num,
        pageSize: page.size,
      };
      request
        .queryMsProduct(payload)
        .then(res => {
          if (res.data.resultFlag) {
            const { rows, total } = res.data.resultContent;
            this.mescrollVueList = this.mescrollVueList.concat(rows || []);
            this.$nextTick(() => {
              if (this.mescrollVueList.length === total) {
                mescroll.endBySize(rows.length, total);
              } else {
                mescroll.endSuccess(rows.length);
              }
            });
          } else {
            mescroll.endSuccess(0);
          }
        })
        .catch(err => {
          console.log("发生错误：", err);
        });*/
    }
  }
};
</script>

<style lang="less">
.m-list-nodata > div {
  padding: 15.714286rem 0 1.071429rem;
  background: url("~assets/img/pagestatus/003.png") no-repeat scroll center;
  background-size: 20rem;
}
</style>
