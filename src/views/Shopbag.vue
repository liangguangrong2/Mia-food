<template>
  <div class="shopbag">
    <div class="box"></div>
    <div class="next" @click="Logine" v-if="!loginlist || !arr">
      <div>
        <h4>登录/注册</h4>
      </div>
      <div class="box_t" v-if="!loginlist || !arr">
        <div class="bott">
          <img src="..//assets/images/OIP2.jpeg" alt="" />
        </div>
      </div>
    </div>

    <div class="taba" v-if="loginlist && arr">
      <div>
        <p>{{ arr }}</p>
      </div>
      <div class="about">
        <div class="dell">
          <img src="..//assets/images/OIP2.jpg" alt="" />
        </div>
      </div>
    </div>

    <div class="time">
      <van-notice-bar
        left-icon="volume-o"
        text="欢迎使用米娅食谱  登录可以查看更多菜谱做法 还有大神教学视频 免费课程"
      />
    </div>

    <div class="list">
      <div class="listitem">
        <div>
          <i class="iconfont icon icon-cangpeitubiao_dingdan"></i>
          <span>订单</span>
        </div>
        <span><i class=" iconfont icon icon-jiantou"></i></span>
      </div>
      <div class="listitem">
        <div>
          <i class="iconfont icon icon-shoucang4"></i>
          <span>收藏</span>
        </div>
        <span><i class=" iconfont icon icon-jiantou"></i></span>
      </div>
      <div class="listitem">
        <div @click="gouwuche">
          <i class="iconfont  icon-gouwuche"></i>
          <span>购物车</span>
        </div>
        <span><i class=" iconfont icon icon-jiantou"></i></span>
      </div>
      <div class="listitem">
        <div>
          <i class="iconfont icon icon-guanyuwomen"></i>
          <span>关于我们</span>
        </div>
        <span><i class=" iconfont icon icon-jiantou"></i></span>
      </div>
      <div class="item">
        <van-cell title="选择单个日期" :value="date" @click="show = true" />
        <van-calendar v-model="show" @confirm="onConfirm" />
      </div>
    </div>

    <!-- <button @click="logout">
			退出登录
		</button> -->
    <div class="logout-box" v-if="loginlist && arr">
      <span
        ><van-button color="#c5b493" block @click="logout"
          >退出登录</van-button
        ></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Shopbag",
  data() {
    return {
      arr: "",
      date: "",
      show: false
    };
  },

  created() {
    // 获取用户信息;
    this.getUserInfo();
  },
  methods: {
    // 跳转购物车页面
    gouwuche() {
      this.$router.push("/cart");
    },
    getUserInfo() {
      this.arr = JSON.parse(localStorage.userRegisterInfo).nickName;
      // this.next = JSON.parse(localStorage.userRegisterInfo).password;
      // console.log(this.arr);
    },
    Logine() {
      this.$router.push({
        name: "Loginlist"
      });
    },
    logout() {
      // this.$router.push({
      // 	name: "Loginlist",
      // });
      // this.$toast("退出成功");

      this.$dialog
        .confirm({
          title: "退出登录",
          message: "是否确定退出登录！",
          confirmButtonColor: "#1A73E8"
        })
        .then(() => {
          //执行退出登录
          //清除登录状态
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0
          });

          setTimeout(() => {
            this.$toast.clear();
            // localStorage.removeItem("__tk");
            this.$router.push({ name: "Loginlist" });
            this.$toast("退出成功");
          }, 800);
        });
      // .catch((err) => {});
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    }
  },
  computed: {
    loginlist() {
      return this.$store.state.loginlist;
    }
  }
};
</script>

<style scoped lang="less">
.shopbag {
  width: 100%;
  // height: 1000px;
  // border: 1px solid;
  .box {
    margin-top: 10px;
    /deep/ .van-icon {
      font-size: 25px;
    }
  }
  .next {
    width: 100%;
    // height: 90px;
    // border: 1px solid;
    // margin-top: 10px;
    display: flex;
    h4 {
      margin-top: 30px;
    }
    div {
      flex: 1;
    }
    .box_t {
      height: 100%;
      // border: 1px solid;
      .bott {
        width: 80px;
        height: 90%;
        // border: 1px solid blue;
        // border-radius: 50px;
        margin-left: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .taba {
    // border: 1px solid black;
    display: flex;
    p {
      margin-top: 30px;
      font-size: 20px;
      color: rgb(10, 10, 10);
    }
    div {
      flex: 1;
    }
    .about {
      height: 100%;
      // border: 1px solid;
      .dell {
        width: 80px;
        height: 90%;
        // border: 1px solid blue;

        margin-left: 60px;
        img {
          border-radius: 50px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .time {
    width: 90%;
    margin-top: 50px;
    margin-left: 18px;
    /deep/.van-notice-bar {
      background-color: rgb(199, 253, 253);
      // border: 1px solid;
    }
  }
  .list {
    width: 100%;
    // border: 1px solid;
    margin-top: 30px;
    .iconfont {
      font-family: "iconfont" !important;
      color: rgb(151, 144, 144);
      font-size: 22px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .listitem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-left: 10px;

      & > div {
        display: flex;
        align-items: center;
        font-size: 14px;
        span {
          margin-left: 7px;
        }
      }

      & > span {
        margin-right: 10px;
        font-weight: 600;
      }
    }
    .item {
      // border: 1px solid;
      margin-right: 212px;
    }
  }
  .logout-box {
    margin-top: 100px;
    padding: 0 10px;
    width: 40%;
    margin-left: 111px;
    // border-radius: 0;
    .van-button {
      border-radius: 0;
      background-color: #c5b493;
    }
  }
}
</style>
