<template>
  <div>
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      fixed
      @click-left="back"
    />

    <div class="isall">
      <div class="left_all">
        <van-checkbox v-model="isAllChecked" @click="allSelect"></van-checkbox>
      </div>
    </div>

    <div class="box">
      <div class="box_bigt" v-for="(item, index) in gostinh" :key="item.sid">
        <van-swipe-cell>
          <div class="ait">
            <van-checkbox
              @change="simpleSelect"
              v-model="item.isChecked"
              checked-color="#1A73E8"
            />
          </div>
          <div class="fl">
            <div class="img_item"><img :src="item.ti" alt="" /></div>
            <div class="title_item">
              <p>
                <i class="icon iconfont icon-dianpu1"></i> {{ item.store.n }}
              </p>
              <p class="rg">{{ item.t }}</p>
              <p class="rg">规格</p>
            </div>
            <div class="left_box">
              <div>￥{{ item.p }}</div>
              <p>
                <van-stepper
                  v-model="item.count"
                  theme="round"
                  button-size="20"
                  disable-input
                />
              </p>
            </div>
          </div>

          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="del(index, item.id)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <!-- <div class="shopbag-item" v-for="item in gostinh" :key="item.id">
      {{ item.t }}
    </div> -->

    <div class="bottom_flex">
      <van-submit-bar
        :price="total"
        button-text="提交订单"
        button-color="#1A73E8"
        @submit="subm"
      >
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gostinh: [],
      isCheck: false,
      isAllChecked: false,
      //订单总金额
      total: 0,
      count: 2
    };
  },
  created() {
    //获取购物袋数据
    this.getShopbagData();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getShopbagData() {
      let tokenString = JSON.parse(localStorage.getItem("cat_data"));
      JSON.stringify(tokenString);
      // localStorage.setItem("ad", ut);
      console.log(tokenString[0].id);
      // console.log(tokenString);
      // let itemid = JSON.stringify(tokenString[0].id);
      // console.log(itemid);
      this.gostinh = tokenString;
    },
    //单选
    simpleSelect() {
      this.sum();
      for (let i = 0; i < this.gostinh.length; i++) {
        if (!this.gostinh[i].isChecked) {
          this.isAllChecked = false;
          return;
        }
        console.log(11);
      }

      this.isAllChecked = true;
    },
    //全选
    allSelect() {
      this.gostinh.map(v => {
        v.isChecked = this.isAllChecked;
      });

      this.sum();
    },

    //计算订单总金额
    sum() {
      this.total = 0;
      this.gostinh.map(v => {
        if (v.isChecked) {
          this.total += v.p * v.count;
        }
      });

      this.total *= 100;
    },

    // 删除
    del(index) {
      console.log(111);
      this.gostinh.splice(index, 1);
      // this.$store.commit('removeFormCar',id)
      this.sum();
    },
    // 判断是否勾选商品
    isAaplay() {
      for (let i = 0; i < this.gostinh.length; i++) {
        if (this.gostinh[i].isChecked) {
          //如果存在勾选商品
          return true;
        }
      }
      return;
    },

    // 提交按钮
    subm() {
      let isHas = this.isAaplay();

      if (!isHas) {
        this.$toast("请选择购买的商品");
        return;
      }

      let itemid = [];
      this.gostinh.map(v => {
        if (v.isChecked) {
          itemid.push(v.id);
        }
        console.log(v.id);
        console.log(itemid);
      });
      localStorage.setItem("pueeitemt", JSON.stringify(this.gostinh));
      this.$toast("提交成功");

      //跳转到支付页面带id参数
      this.$router.push({
        name: "Payment",
        query: { itemid: itemid.join("-") }
      });
    }
  }
};
</script>
<style lang="less">
.isall {
  display: flex;
  border-bottom: 1px solid rgb(231, 224, 224);
  border-top: 1px solid rgb(231, 224, 224);
  .left_all {
    // flex: 1;
    margin-left: 20px;
    padding-top: 65px;
    padding-bottom: 15px;
  }
  .right_all {
    flex: 1;
    text-align: right;
    margin-right: 20px;
    color: rgb(126, 134, 131);
    padding-top: 15px;
    padding-bottom: 15px;
  }
}

.box {
  width: 100%;
  // border: 1px solid black;
  // margin-top: 20px;

  .box_bigt {
    width: 96%;
    height: 120px;
    // border: 1px solid black;
    margin: 0 auto;
    // display: flex;
    border-bottom: 1px solid rgb(212, 223, 212);
    // padding-top: 20px;
    // padding-bottom: 20px;
    .van-button {
      height: 80px;
    }
    .ait {
      // border: 1px solid black;
      // height: 30px;
      // border: 1px solid black;
      float: left;
      width: 20px;
      // border: 3px solid #73ad21;
      // padding: 22px;
      padding-top: 28px;
    }
    .fl {
      // flex: 1;
      display: flex;
      margin-left: 35px;
      margin-top: 20px;
      .img_item {
        width: 80px;
        img {
          width: 100%;
        }
      }
      .title_item {
        // flex: 1;
        margin-left: 10px;
        width: 140px;
        // border: 1px solid black;
        p {
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
          padding-top: 7px;
        }
        p:first-child {
          // color: blue;
          font-size: 14px;
        }
        .rg {
          color: rgb(78, 141, 120);
        }
      }
    }
  }
  .left_box {
    // width: 100%;
    // border: 1px solid black;
    width: 120px;

    div {
      color: red;
      // margin-top: -10px;
      text-align: right;
    }
    p {
      margin-top: 30px;
      .van-stepper {
        // border: 1px solid red;
      }
      .van-stepper__minus--disabled,
      .van-stepper__plus--disabled {
        border: 1px solid red;
      }
      .van-stepper__input {
        border: 1px solid red;
      }
      .van-stepper__minus,
      .van-stepper__plus {
        border: 1px solid red;
      }
    }
  }
}
.bottom_flex {
  width: 100%;
  height: 60px;
  // border: 1px solid black;
  position: fixed;
  bottom: 0;
  background-color: white;
}
</style>
