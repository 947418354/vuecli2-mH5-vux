<template>
  <div class="page comment-list-page">
    <div>
      <div class="comment-list-container">
        <MescrollVue :down="mescrollDown" :up="mescrollUp" class="scroll-cont" @init="mescrollInit">
          <div class="item" v-for="(item, i) of browserList" :key="item.id">
            <div>
              <div class="info-container">
                <div>
                  <div class="img-box"><img :src="item.headerUrl" alt=""></div>
                </div>
                <div>
                  <div>昵称</div>
                  <div>{{item.dateTime}}</div>
                </div>
              </div>
              <div>
                <span>评分: </span><Rater v-model="item.score" disabled></Rater>
              </div>
              <div class="comment-divtext">评论文字很长的评论评论文字很长的评论评论文字很长的评论评论文字很长的评论评论文字很长的评论评论文字很长的评论评论文字很长的评论</div>
            </div>
            <div>
              <XSwitch v-model="item.isShow" title=""></XSwitch>
              <div>{{formatterIsShow(item.isShow)}}</div>
            </div>
          </div>
          <!-- 无数据时,此元素将被索引到,被给他插入孩纸 -->
          <div id="nodata" class="m-list-nodata"></div>
        </MescrollVue>
      </div>
    </div>
  </div>
</template>

<script>
/**
评价列表页
 */
import MescrollVue from "mescroll.js/mescroll";
import { XSwitch, Rater  } from 'vux'

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
    MescrollVue,
    XSwitch,
    Rater 
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
            id: (page.num - 1) * page.size + i + "",
            headerUrl:
              "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg",
            nickName: "昵称",
            action: "浏览行为",
            dateTime: "2020/06/06 22:00:00",
            comment: '文字评价',
            score: 2.5,
            isShow: false,
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
    },
    formatterIsShow(isShow) {
      return isShow ? '公开' : '未公开'
    }
  }
};
</script>

<style lang="less">
.comment-list-page {
  .comment-list-container {
    .item {
      display: flex;
      justify-content: space-between;
      margin: 10px;
      background: #eee;
      border-radius: 5px;
      padding: 10px;
    }
    .info-container {
      display: flex;
      .img-box {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
    .comment-divtext {
      text-align: left;
    }
    .vux-x-switch {
      transform: scale(0.8);
    }
  }
}
</style>