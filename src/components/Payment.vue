<template>
  <div>
    <van-nav-bar title="确认订单" left-arrow @click-left="onClickLeft" />
    <div class="box">
      <div class="box-x">
        <div class="box-y">
          <div>蒙奇D.路飞</div>
          <div class="phone">18476930230</div>
        </div>
        <p>收货地址：上海市徐汇区田林路487号宝石商业楼2楼</p>
      </div>

      <div class="shopp">
        <div v-for="item in set" :key="item.id">
          <div class="shopp-x">
            <div class="item left_item">
              <img :src="item.ti" alt="" />
            </div>
            <div class="item right_item">
              <p class="green">
                <i class="icon iconfont icon-dianpu1"></i> {{ item.store.n }}
              </p>
              <p class="lue">{{ item.t }}</p>
              <div class="calculate">
                <div>￥{{ item.p }}</div>
                <p>共1件</p>
              </div>
            </div>
          </div>
        </div>

        <div class="distribution">
          <div class="let_t">配送信息</div>
          <div class="right_t">京东配送</div>
        </div>
        <div class="pay">
          <div class="let_t">支付方式</div>
          <div class="right_t">在线支付</div>
        </div>
      </div>
    </div>
    <div class="submit" @click="oreder">
      <p>
        <!-- 支付<span>(￥{{ set[0]. p}})</span>
         -->
        支付<span>(￥{{ ment }})</span>
      </p>
    </div>
    <div class="padding">1</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      set: []
      // 计算总额
      // payment: 0,
      // noot: 2
    };
  },

  created() {
    //获取信息
    this.getSet();
    //截取查询参数
    // this.itemid = this.$route.query.itemid.split("-");
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getSet() {
      this.set = JSON.parse(localStorage.pueeitemt);
      let noot = this.set.length;
      console.log(noot);
      // console.log(this.itemid);
      console.log(typeof this.set[0].p);
    },
    oreder() {
      var str = JSON.parse(localStorage.getItem("ket_data") ?? "[]");
      console.log("str---------->", ...str);
      localStorage.setItem("ket_data", JSON.stringify([...this.set, ...str]));

      this.$router.push("/order");
    }
    // // 计算总金额
    // ment() {
    //   this.payment = 0;

    //   this.set.map(v => {
    //     this.payment += v[0].p *this.noot;
    //     console.log(v);
    //   });
    //   console.log(this.v);
    // }
  },
  computed: {
    ment: function() {
      let payment = 0;
      for (let i = 0; i < this.set.length; i++) {
        let num = Number(this.set[i].p);
        payment += num;
      }
      return payment;
    }
  }
};
</script>

<style lang="less">
.box {
  width: 90%;
  // height: 100%;
  // border-top: 1px solid rgb(179, 172, 190);
  margin: 0 auto;
  .box-x {
    width: 90%;
    height: 112px;
    // border-top: 1px solid rgb(231, 109, 109);
    // border-bottom: 1px solid rgb(144, 40, 40);

    // margin-top: 30px;
    // padding-top: 30px;
    margin: 30px auto;

    .box-y {
      width: 100%;
      height: 40px;
      // background-color: yellow;
      // border: 1px solid red;
      display: flex;
      line-height: 40px;

      .phone {
        text-align: right;
        // color: gold;
        flex: 1;
      }
    }
    p {
      margin-top: 10px;
      text-align: left;
      line-height: 30px;
    }
  }
  .shopp {
    width: 90%;
    height: 245px;
    // height: 100%;
    // border: 1px solid rgb(179, 172, 190);
    margin: 0 auto;
    .shopp-x {
      width: 100%;
      height: 90px;
      // border: 1px solid black;
      display: flex;
      margin-top: 20px;

      .left_item {
        flex-basis: 94px;
        // box-shadow: 1px 1px 1px 1px rgb(199, 190, 190);

        img {
          width: 100%;
          height: 100%;
          // border-radius: 10px;
        }
      }
      .right_item {
        margin-left: 15px;
        p {
          text-align: left;
        }
        .green {
          font-size: 14px;
          font-weight: 550;
        }
        .lue {
          width: 220px;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          padding-top: 5px;
        }
        .calculate {
          margin-top: 16px;
          display: flex;
          div:first-child {
            color: red;
            font-size: 20px;
            text-align: left;
          }
          p {
            font-size: 10px;
            color: rgb(119, 134, 129);
            // text-align: left;
            text-align: right;
            // margin-left: 0;
            // border: 1px solid;
            line-height: 30px;
            flex: 1;
          }
        }
      }
    }
    .distribution {
      display: flex;
      margin-top: 30px;
      // padding-top: 80px;
      // padding-top: 40px;
      padding-bottom: 30px;
      div {
        flex: 1;
      }
      .let_t {
        text-align: left;
      }
      .right_t {
        text-align: right;
        color: rgb(175, 170, 170);
      }
    }
    .pay {
      display: flex;
      // margin-top: 30px;
      // padding-top: 80px;
      padding-bottom: 80px;
      div {
        flex: 1;
      }
      .let_t {
        text-align: left;
      }
      .right_t {
        text-align: right;
        color: rgb(175, 170, 170);
      }
    }
  }
}
.submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: red;
  // padding-top: 0px;
  p {
    padding-top: 20px;
    font-size: 16px;
    color: white;
  }
}
.padding {
  padding-top: 80px;
  padding-bottom: 80px;
}
</style>
