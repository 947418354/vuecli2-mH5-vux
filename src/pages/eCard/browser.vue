<template>
  <div class="page browser-page">
    <div class="browser-block">
      <div class="browser-container">
        <MescrollVue :down="mescrollDown" :up="mescrollUp" class="scroll-cont" @init="mescrollInit">
          <!-- 以下内容插入默认插槽div下 -->
          <div class="card-three" v-for="(ele, i) of browserList" :key="ele.id">
            <div class="inline-block">
              <div class="img-box">
                <img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg" alt />
              </div>
            </div>
            <div class="inline-block">昵称</div>
            <div class="browser-action inline-block">浏览动作</div>
            <div class="inline-block">2020/06/06 22:00:00</div>
          </div>
        </MescrollVue>
      </div>
    </div>
    <jiuDialog></jiuDialog>
  </div>
</template>

<script>
/**
 * 浏览痕迹页
 */
import MescrollVue from "mescroll.js/mescroll";
import jiuDialog from '@/components/dialog/jiuDialog/jiuDialog'

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
        noMoreSize: 1, // 列表条数大于等于noMoreSize时 会显示htmlNodata
        page: {
          size: 15
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
    MescrollVue,
    jiuDialog
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      // console.log("上拉回调");
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
        this.$nextTick(() => {
          if (this.browserList.length >= total) {
            mescroll.endBySize(list.length, total);
          } else {
            mescroll.endSuccess(list.length);
          }
        });
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
.browser-page {
  .browser-block {
    height: 100%;
  }
  .browser-container {
    height: 100%;
    .scroll-cont {
      background: pink;
    }
    .card-three {
      margin: 10px;
      &:last-child {
        border-bottom: 1px solid rgba(155, 155, 155, 0.2);
      }
    }
    .card-three > .inline-block {
      vertical-align: middle;
    }
    .img-box {
      width: 50px;
      height: 50px;
    }
    .browser-action {
      color: #bbb;
    }
  }
}
</style>