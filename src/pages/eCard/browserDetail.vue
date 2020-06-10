<template>
  <div class="page browser-detail-page">
    <div class="info-list-block">
      <div class="info-list-container">
        <div class="info">
          <div class="inline-block">
            <div class="img-box">
              <img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg" alt />
            </div>
          </div>
          <div class="inline-block">昵称</div>
        </div>
        <!-- <div class="flex-item"> -->
          <MescrollVue
            :down="mescrollDown"
            :up="mescrollUp"
            class="flex-item scroll-cont"
            @init="mescrollInit"
          >
            <div class="item" v-for="(ele, i) of browserList" :key="ele.id">
              <!-- <div class="inline-block">{{ele.id}}</div> -->
              <div class="browser-action inline-block">浏览动作</div>
              <div class="inline-block">2020/06/06 22:00:00</div>
            </div>
            <!-- 无数据时,此元素将被索引到,被给他插入孩纸 -->
            <div id="nodata" class="m-list-nodata"></div>
          </MescrollVue>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
/**
浏览详情页
 */
import MescrollVue from "mescroll.js/mescroll";

export default {
  data() {
    return {
      browserList: [],
      mescroll: "",
      mescrollDown: {
        isLock: true
      },
      // 上拉配置
      mescrollUp: {
        callback: this.upCallback,
        noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于1页的数量才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        page: {
          size: 25
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
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      console.log("上拉回调");
      if (page.num === 1) {
        this.browserList = [];
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
        this.browserList = this.browserList.concat(list || []);
        // if (isNumber(list.length)) {
        this.$nextTick(() => {
          if (this.browserList.length >= total) {
            mescroll.endBySize(list.length, total);
          } else {
            mescroll.endSuccess(list.length);
          }
        });
        // }
      }, 2000);
      /*request
        .queryMsProduct()
        .then(res => {
          if (res.data.resultFlag) {
            const { rows, total } = res.data.resultContent;
            this.browserList = this.browserList.concat(rows || []);
            if (isNumber(rows.length)) {
              this.$nextTick(() => {
                if (this.browserList.length === total) {
                  mescroll.endBySize(rows.length, total);
                } else {
                  mescroll.endSuccess(rows.length);
                }
              });
            }
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
.browser-detail-page {
  .info-list-block {
    height: 100%;
  }
  .info-list-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .info {
      text-align: left;
      padding: 10px;
      .inline-block {
        vertical-align: middle;
      }
      .img-box {
        width: 50px;
        height: 50px;
      }
    }
    .flex-item {
      flex-grow: 1;
      flex-shrink: 1;
      overflow: auto;
      background: greenyellow;
    }
    .scroll-cont {
      background: pink;
    }
    .item {
      margin: 10px;
      display: flex;
      justify-content: space-between;
    }
    .browser-action {
      color: #aaa;
    }
  }
}
</style>