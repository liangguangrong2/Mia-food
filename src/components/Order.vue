<template>
  <div>
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="box_back" v-for="item in guiton" :key="item.id">
          <div class="fukuan">
            <div class="left">
              <i class="icon iconfont icon-dianpu1"></i>
              <span>{{ item.store.n }}</span>
            </div>
            <div class="right">已付款</div>
          </div>

          <div class="box_bit">
            <div class="left_imgitems">
              <img :src="item.ti" alt="" />
            </div>
            <div class="contont_imgitems">
              <p class="content-x">{{ item.t }}</p>
            </div>
            <div class="right_imgitems">
              <p>￥{{ item.p }}</p>
              <s>￥{{ item.op }}</s>
              <div>x1</div>
            </div>
          </div>
          <div class="shopp_top">
            <p>
              共1件商品 运费:包邮 <span>实付￥{{ item.p }}</span>
            </p>
          </div>
          <!-- <div class="shopbag-item" v-for="item in guiton" :key="item.id">
            {{ item.t }}
          </div> -->
          <!-- 底部按钮 -->
          <div class="top_item">
            <div class="left_order">
              <p>
                删除订单
              </p>
            </div>
            <div class="right_button">
              <el-row>
                <el-button round>加入购物车</el-button>
                <el-button round>再次购买</el-button>
              </el-row>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已支付">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guiton: [],
      active: 0
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    back() {
      this.$router.push("/home");
    },
    getOrder() {
      let orderitem = JSON.parse(localStorage.getItem("ket_data"));
      JSON.stringify(orderitem);

      this.guiton = orderitem;
    }
  }
};
</script>

<style lang="less">
.box_back {
  width: 92%;
  margin: 0 auto;
  // border: 1px solid black;
  margin-top: 20px;
  .fukuan {
    display: flex;
    justify-content: space-between;
    .right {
      color: rgb(62, 163, 163);
    }
  }
  .box_bit {
    margin-top: 10px;
    display: flex;
    // justify-content: space-between;
    .left_imgitems {
      flex-basis: 94px;
      // box-shadow: 1px 1px 1px 1px rgb(199, 190, 190);

      img {
        width: 100px;
        height: 100px;
        // border-radius: 10px;
        border-radius: 4px;
      }
    }
    .contont_imgitems {
      margin-left: 10px;
      .content-x {
        width: 180px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        padding-top: 5px;
      }
    }
    .right_imgitems {
      height: 30px;
      // border: 1px solid black;
      //  float: right;
      margin-left: 30px;

      p {
        font-weight: 600;
      }
      s {
        font-size: 13px;
        color: rgb(119, 141, 119);
      }
      div {
        margin-top: 45px;
        text-align: right;
        color: rgb(119, 141, 119);
      }
    }
  }
  .shopp_top {
    margin-top: 10px;

    p {
      color: rgb(136, 133, 128);
      text-align: right;
      span {
        font-weight: 600;
        color: black;
      }
    }
  }
  .top_item {
    width: 100%;
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .left_order {
      color: rgb(138, 140, 141);
      p:first-child {
        // color: blue;
        // font-size: 14px;
        line-height: 42px;
      }
    }
  }
}
</style>
