<template>
  <!-- eslint-disable -->
  <div class="page comment-list-page">
    <div>
      <div class="comment-list-container">
        <MescrollVue :down="mescrollDown" :up="mescrollUp" class="scroll-cont" @init="mescrollInit">
          <!-- 头像单独算一块布局 -->
          <div class="item card-header-duli" v-for="(item, i) of browserList" :key="i">
            <div>
              <div class="img-box border-radius">
                <img :src="item.headImgUrl || defaultImg" alt />
              </div>
            </div>
            <div>
              <div class="info-container">
                <div>
                  <div class="inline-block">{{item.nickName || '静态昵称'}}</div>
                  <div class="date inline-block">{{formatterDateTime(item.createTime)}}</div>
                </div>
              </div>
              <div class="comment-divtext">{{item.comment}}</div>
              <div>
                <span class="evalute-span">评分:</span>
                <Rater v-model="item.score" disabled :font-size="15"></Rater>
              </div>
            </div>
            <div class="switch-item">
              <XSwitch
                class="x-switch inline-block"
                v-model="item.open"
                title
                @on-change="changeSwitch(item)"
              ></XSwitch>
              <div class="x-switch-tip inline-block">{{formatterIsShow(item.open)}}</div>
            </div>
          </div>
          <!-- 头像不单独算一块布局 -->
          <!-- <div class="item" v-for="(item, i) of browserList" :key="i">
            <div>
              <div class="info-container">
                <div>
                  <div class="img-box border-radius">
                    <img :src="item.headImgUrl" alt />
                  </div>
                </div>
                <div>
                  <div class="inline-block">{{item.nickName || '静态昵称'}}</div>
                  <div class="date inline-block">{{formatterDateTime(item.createTime)}}</div>
                </div>
              </div>
              <div>
                <span class="evalute-span">评分:</span>
                <Rater v-model="item.score" disabled></Rater>
              </div>
              <div class="comment-divtext">{{item.comment}}</div>
            </div>
            <div>
              <XSwitch class="x-switch inline-block" v-model="item.open" title @on-change="changeSwitch(item)"></XSwitch>
              <div class="x-switch-tip inline-block">{{formatterIsShow(item.open)}}</div>
            </div>
          </div>-->
          <!-- 无数据时,此元素将被索引到,被给他插入孩纸 -->
          <div id="nodata" class="m-list-nodata"></div>
        </MescrollVue>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
/**
评价列表页
 */
import MescrollVue from "mescroll.js/mescroll";
import { XSwitch, Rater } from "vux";
import { isNumber } from "lodash";
import { formatDateTime } from "@/utils/date";
// import apiECard from "@/api/eCard";

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
      },
      defaultImg: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
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
      /*const payload = {
        Page: page.num,
        pageSize: page.size
      };
      apiECard
        .eCardComment(payload)
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
    changeSwitch(item) {
      // apiECard.evaluateSwitch({
      //   evaluateId: item.evaluateId,
      //   open: item.status
      // });
    },
    formatterIsShow(isShow) {
      return isShow ? "公开" : "未公开";
    },
    formatterDateTime(timeStamp) {
      return formatDateTime(timeStamp).slice(0, -3);
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
      border-radius: 5px;
      padding: 10px;
      background: #eee;
    }
    .img-box {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .info-container {
      display: flex;
    }
    .date {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(178, 180, 180, 1);
      line-height: 17px;
    }
    .evalute-span {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 17px;
    }
    .comment-divtext {
      text-align: left;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 22px;
    }
    .vux-x-switch {
      transform: scale(0.8);
      vertical-align: middle;
    }
    .x-switch-tip {
      vertical-align: middle;
    }
  }
  .card-header-duli {
    .switch-item {
      width: 110px;
    }
  }
}
</style>