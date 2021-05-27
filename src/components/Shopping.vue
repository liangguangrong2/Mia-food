<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title=""
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>

    <div class="box_big">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(item, index) in pre" :key="index">
          <div class="flloe">
            <img :src="item" alt="" /></div
        ></van-swipe-item>

        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/4</div>
        </template>
      </van-swipe>
      <!-- 加载 -->
      <div v-if="showe">
        <van-loading color="#1989fa" />
      </div>
      <div class="headline">
        <div class="headline-x">
          <h3>{{ pueeitem.t }}</h3>
          <p class="beef">{{ pueeitem.des }}</p>
          <p>
            <span class="item-a">￥{{ pueeitem.p }}</span>
            <span class="item-b">￥{{ pueeitem.op }}</span
            ><span class="item-c">{{ pueeitem.nsp }}</span>
          </p>

          <span class="item">{{ pueeitem.si }}</span>
          <span class="item item-o">{{ pueeitem.add }}</span>
        </div>
      </div>
    </div>
    <div class="promotion">
      <div class="promotion-x">
        <p class="sales" v-if="p_show">
          促销<span class="store" v-for="(y, o) in pueeitem.atl" :key="o"
            ><span class="yt">{{ y.t }} </span
            ><span class="yc">{{ y.c }}</span></span
          >
        </p>
        <!-- <p class="tishi">{{ pueeitem.atl.n }}</p> -->
      </div>
    </div>

    <!-- 弹出框
    <div class="cell" v-show="show_t">
      <van-cell is-link :title="pueeitem.sdc" @click="show = true" />
      <van-action-sheet v-model="show" title="购物车">
        <div class="cellitem">
          <div class="cellitem-x">
            <div class="utten left-right">
              <img :src="pueeitem.ti" alt="" />
            </div>
            <div class="utten left_utten">
              <p class="top_item">
                {{ pueeitem.t }}
              </p>

              <p class="button_item">
                ￥{{ pueeitem.p }} <span>{{ pueeitem.op }}</span>
              </p>
            </div>
          </div>
          <div class="specification">
            <h5>规格</h5>

            <div class="select">
              <div
                v-for="(item, index) in select"
                :key="index"
                class="select-x active"
              >
                <p class="select-y">
                  {{ item.sd }}
                </p>
              </div>
            </div>
          </div>
          <div class="quantity">
            <div class="left_quan">
              <p>购买数量</p>
            </div>
          </div>

          <div>
            <van-goods-action>
              <van-goods-action-button
                @click="join"
                type="warning"
                text="加入购物车"
              />
              <van-goods-action-button
                @click="regis"
                type="danger"
                text="立即购买"
              />
            </van-goods-action>
          </div>
        </div>
      </van-action-sheet>
    </div> -->

    <!-- 评论晒单 -->
    <div class="comment">
      <div class="comment-x">
        <h4>评论晒单</h4>

        <div v-for="(it, em) in pueeitem.sos" :key="em" class="scheduling">
          <div class="left-img">
            <img class="img-x" :src="it.a.p" alt="" />
            <span class="name"
              >{{ it.a.n }} <span class="grade">LV.{{ it.a.lvl }}</span></span
            >

            <div class="good">{{ it.des }}</div>
            <div v-for="(q, m) in it.is" :key="m" class="imgiv">
              <div class="left_image">
                <img :src="q" alt="找不到图片" />
              </div>
            </div>
          </div>

          <div class="right-font">好评</div>
        </div>
      </div>
    </div>

    <div class="store">
      <div class="store-x">
        <h4>店铺信息</h4>
        <div class="schedule">
          <div class="swallow">
            <img :src="stores.l" alt="" />
          </div>
          <div class="personage">
            <p>{{ stores.n }}</p>
            <p>{{ stores.sfi }}</p>
          </div>
          <div class="schedule-item">
            <p class="qidian">进店瞧瞧</p>
          </div>
        </div>
        <div v-for="(vi, lo) in stores.ss" :key="lo" class="storeitemt">
          <p class="soteee">
            {{ vi.t }} <span>{{ vi.s }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="cart">
      <van-goods-action>
        <van-goods-action-icon
          @click="shopppe"
          icon="cart-o"
          text="购物车"
          :badge="bagCount == 0 ? '' : bagCount"
          :color="bagCount > 0 ? '#1A73E8' : '#646566'"
        />
        <!-- <div class="num">1</div> -->
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />

        <van-goods-action-button
          @click="join"
          type="warning"
          text="加入购物车"
        />
        <van-goods-action-button type="danger" @click="regis" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tall: [],
      current: 0,
      pre: [],
      pueeitem: [],
      show: false,
      show_t: true,

      p_show: false,
      select: [],
      num: 1,
      nbm: "",
      stores: [],
      //购物袋的数量
      bagCount: 0,
      grren: [],
      showe: true
    };
  },
  mounted() {
    console.log(this.$route.query.id);
  },
  created() {
    this.id = this.$route.query.id;
    this.Tallear();
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    //轮播图索引
    onChange(index) {
      this.current = index;
    },
    Tallear() {
      this.axios({
        url: "/shop/detail",
        method: "get",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        if (res.status === 200) {
          console.log(res);
        }
        console.log(res);
        this.pueeitem = res.data.result.p;
        console.log(this.pueeitem);
        this.pre = res.data.result.p.is;
        console.log(this.pre);
        this.stores = res.data.result.p.store;
        console.log(this.stores);
        this.select = res.data.result.p.sps;

        // this.green = pueeitem.store
        let datas = JSON.stringify(this.pueeitem);

        console.log(datas);
        console.log(this.select);
        localStorage.setItem("__tk", datas);

        if (this.pueeitem.atl.length == 0) {
          this.p_show = false;
        } else {
          this.p_show = true;
        }
        if (this.pueeitem.length == 0) {
          this.show_t = false;
        } else {
          this.show_t = true;
        }

        if (res.data.code == 8000) {
          this.bagCount = res.data.result;
        }
        this.showe = false;
      });
    },
    //立即购买
    regis() {
      localStorage.pueeitemt = JSON.stringify([this.pueeitem]);

      this.$router.push("/payment");
    },
    join() {
      //加入购物车
      this.bagCount++;

      let cat_data = JSON.parse(localStorage.getItem("cat_data") || "[]");

      localStorage.setItem(
        "cat_data",
        JSON.stringify([this.pueeitem, ...cat_data])
      );

      // console.log(data2.id);
    },
    shopppe() {
      //去购物按钮
      this.$router.push("/cart");
    }
  }
};
</script>

<style lang="less">
.box_big {
  width: 100%;
  //   border: 1px solid black;
  height: 100%;
  background-color: rgb(236, 232, 232);
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  .flloe {
    // border: 1px solid rgb(172, 172, 184);

    img {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }

  .van-nav-bar .van-icon {
    position: absolute;
    top: -390px;
    color: #ffffff;
    font-size: 36px;
  }

  .van-icon {
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 "vant-icon";
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
  .headline {
    width: 100%;
    // height: 99px;
    background-color: white;
    // border: 1px solid black;
    // margin-top: 10px;
    // overflow-x: hidden;
    .headline-x {
      width: 90%;
      height: 100%;
      //   border: 1px solid black;
      margin: 0 auto;
      text-align: left;
      h3 {
        padding-top: 16px;
      }
      .beef {
        font-size: 15px;
        color: rgb(150, 136, 136);
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .item-a {
        font-size: 25px;
        color: red;
        vertical-align: middle;
      }
      .item-b {
        // line-height: 10px;
        color: rgb(105, 101, 101);
        font-size: 17px;
        margin-left: 5px;
        // line-height: 20px;
        // margin-top: 20px;
        text-decoration: line-through;
      }
      .item-c {
        margin-left: 5px;
        border: 20px;
        height: 20px;
        // display: inline-block;
        border: 1px solid red;
        // background-color: rgb(228, 218, 218);
        font-size: 16px;
        color: red;
      }
      .item {
        font-size: 13px;
        //   display: block;
        // border: 1px solid black;
        line-height: 35px;
      }
      .item-o {
        float: right;
        font-size: 8px;
      }
    }
  }
}
.promotion {
  // margin-top: 45px;
  width: 100%;
  // height: 80px;
  // border: 1px solid black;
  // border-top: 11px solid rgb(236, 229, 229);
  text-align: left;
  .promotion-x {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    // border: 1px solid blue;
  }
  .sales {
    // padding-top: 14px;
    .store {
      margin-left: 8px;
      font-size: 5px;
    }
    .yt {
      color: red;
    }
    .yc {
      font-weight: 600;
    }
  }
  .tishi {
    font-size: 14px;
    line-height: 35px;
  }
}
.cell {
  width: 100%;
  // height: 100px;
  // margin-top: 30px;
  border-top: 2px solid rgb(233, 227, 227);
  text-align: left;
  .van-popup--bottom.van-popup--round {
    border-radius: 16px 16px 0 0;
    // height: 380px;
  }
  .cellitem {
    width: 90%;
    height: 400px;
    margin: 0 auto;
    // border: 1px solid black;

    .cellitem-x {
      width: 90%;
      height: 30%;
      display: flex;
      .left-right {
        flex-basis: 140px;
        // border: 1px solid black;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .left_utten {
        // margin-right: 80px;
        margin-left: 20px;
        .top_item {
          font-size: 15px;
          margin-top: 14px;
        }
        .button_item {
          margin-top: 12px;
          color: red;
          span {
            text-decoration: line-through;
            font-size: 12px;
            color: rgb(146, 155, 146);
          }
        }
      }
    }
  }
  .specification {
    margin-top: 30px;
    .select {
      width: 60%;
      // border: 1px solid black;
      height: 34px;
      margin-top: 10px;
      display: flex;
      .select-x {
        // border: 1px solid black;
        border-radius: 4px;
        // background-color: yellow;
        // background-color: rgb(230, 230, 51);
        margin-left: 15px;
        // font-size: 2px;
        &.active :hover {
          background-color: yellow;
          color: rgb(20, 19, 19);
        }
        .select-y {
          // width: 90%;
          padding-right: 10px;
          padding-left: 10px;
          text-align: center;
          line-height: 34px;
          font-size: 12px;
        }
      }
    }
  }
  .quantity {
    margin-top: 20px;
    display: flex;
    .left_quan {
      p {
        line-height: 40px;
        // color: ;
        font-size: 16px;
      }
    }
    .right_quan {
      margin-left: auto;
    }
  }
}
.comment {
  width: 100%;
  // height: 100%;
  // height: 560px;
  border-top: 11px solid rgb(243, 238, 238);
  text-align: left;
  .comment-x {
    width: 95%;
    height: 100%;
    margin: 0 auto;
    // border: 1px solid black;
    margin-top: 14px;
    .scheduling {
      display: flex;
      margin-top: 40px;
      // border-top: 1px solid rgb(148, 127, 127);

      .left-img {
        // border: 1px solid black;

        flex: 1;
        .img-x {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .name {
          margin-left: 10px;
          .grade {
            margin-left: 10px;
            font-size: 10px;
            color: rgb(184, 184, 63);
          }
        }
        .good {
          margin-top: 10px;
          line-height: 25px;
          // font-weight: 500;
        }
        .left_image {
          width: 100px;
          height: 100px;
          // border: 1px solid ;
          margin-top: 20px;
          float: left;

          margin-left: 20px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            // flex: 1;
          }
        }
      }
      .right-font {
        text-align: right;
        color: red;
      }
    }
  }
}
.store {
  width: 100%;
  height: 300px;
  // border: 1px solid black;
  text-align: left;
  .store-x {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    // border: 1px solid black;

    h4 {
      margin-top: 30px;
    }
    .schedule {
      display: flex;
      .swallow {
        margin-top: 20px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .personage {
        // margin-top: 20px;
        margin-left: 20px;
        padding-top: 20px;
        line-height: 25px;
        // padding-bottom: 30px;
      }
      .schedule-item {
        text-align: right;
        flex: 1;
        margin-top: 30px;

        .qidian {
          height: 30px;
          width: 40%;
          background-color: rgb(162, 245, 9);
          border-radius: 20px;
          margin-left: 100px;
          padding-right: 20px;
          padding-top: 5px;
          // padding-bottom: 10px;
        }
      }
    }
    .storeitemt {
      display: flex;
      width: 100px;
      .soteee {
        // flex: 1;
        // float: left;
        // border: 1px solid black;
        margin-top: 20px;
      }
    }
  }
}
.van-goods-action-icon {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  min-width: 48px;
  height: 100%;
  color: #171717;
  font-size: 10px;
  line-height: 1;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  position: relative;
}
.num {
  // border: 1px solid black;
  position: absolute;
  width: 16px;
  height: 16px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  background-color: red;
  position: absolute;
  top: 0;
  left: 24px;
  border-radius: 50%;
}
</style>
