<template>
  <div class="register">
    <div class="text_x">
      <h2>米娅美食欢迎您</h2>
      <p>登录可以观看更多精品好物</p>
    </div>
    <div class="foot">
      <!-- <div class="ouutt">米娅美食</div> -->

      <div class="box_t">
        <van-field
          v-model.trim="userInfo.phone"
          name="账号"
          left-icon="manager-o"
          label="账号"
          placeholder="输入11位数的号码"
          autocomplete="off"
        />
      </div>

      <div class="item">
        <van-field
          v-model="userInfo.password"
          :type="isRegisterPassword ? 'password' : 'text'"
          name="密码"
          left-icon="chat-o"
          label="密码"
          placeholder="密码必须为字母开头"
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'"
          autocomplete="off"
          @click-right-icon="toggleRegsiterPasswordType"
        />
      </div>
      <button @click="login">登录</button>

      <div class="list" @click="loginitem">
        <span>还没账号? &nbsp;&nbsp;&nbsp;&nbsp;</span><a href="#">前往注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { validForm } from "../assets/js/validForm";
export default {
  data() {
    return {
      //用户登录信息
      userInfo: {
        phone: "",
        password: ""
      },

      //切换注册密码框的类型
      isRegisterPassword: true
    };
  },
  methods: {
    loginitem() {
      this.$router.push({
        name: "Sign"
      });
    },
    //切换注册密码框的类型
    toggleRegsiterPasswordType() {
      this.isRegisterPassword = !this.isRegisterPassword;
    },

    login() {
      // if (window.localStorage) {
      // 	var storage = window.localStorage;

      // 	if (this.user == storage.getItem("username")) {
      // 		alert("登陆成功!");
      // 		this.$store.commit("hiddenMenu");
      // 		this.$router.push({
      // 			path: "homelist",
      // 		});
      // 	} else {
      // 		alert("用户名未注册，请先去注册");
      // 	}
      // }
      let o = {
        phone: {
          value: this.userInfo.phone,
          errorMsg: "手机号或密码格式不正确",
          reg: /^1[3-9]\d{9}$/
        },
        password: {
          value: this.userInfo.password,
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/
        }
      };
      let isPass = validForm.valid(o);

      if (isPass) {
        if (
          this.userInfo.phone ==
            JSON.parse(localStorage.userRegisterInfo).phone &&
          this.userInfo.password ==
            JSON.parse(localStorage.userRegisterInfo).password
        ) {
          // this.userInfo == this.userRegisterInfo;
          this.$toast("登陆成功");
          // this.$store.commit("HIDDEN_MENU");
          window.localStorage.setItem("loginlist", "true");

          this.$store.commit("setLogin");
          this.$router.push("/shopbag");
        } else {
          this.$toast("密码或账号错误");
        }
      }
      if (this.userInfo.phone == "" || this.userInfo.password == "") {
        this.$toast("请输入账号或密码");
        return;
      }
      console.log(JSON.parse(localStorage.userRegisterInfo).phone);
    },

    toReg() {
      this.$router.push({
        path: "sign"
      });
    }
  }
};
</script>

<style lang="less">
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  // background: url("../assets/images/ms1.jpeg") no-repeat;
  background-size: 100% 100%;
  padding: 0 8px;
  box-sizing: border-box;
  .text_x {
    // border: 1px solid;
    // margin-top: 130px;
    p {
      margin-top: 10px;
    }
  }
  .foot {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    width: 100vw;
    // height: 100vh;
    // background: url("../assets/images/yk3.jpeg") no-repeat;
    background-size: 100% 100%;
    padding: 0 8px;
    box-sizing: border-box;

    .box_t {
      // margin-top: 10px;
      .van-field {
        // background-color: rgb(252, 248, 248);
        border-bottom: 1px solid rgb(196, 190, 190);
      }
    }
    .item {
      margin-top: 10px;
      width: 81%;
      .van-field {
        // background-color: rgb(252, 248, 248);
        border-bottom: 1px solid rgb(196, 190, 190);
      }
    }
    button {
      margin-top: 48px;
      width: 84%;
      height: 40px;
      color: white;
      border-radius: 50px;
      background-color: rgb(231, 140, 140);
      box-shadow: 0 1px 1px 1px rgba(245, 31, 31, 0.5);
      outline: 0;
      border: 0;
    }
    .list {
      margin-top: 40px;

      a {
        // display: block;
        color: rgb(23, 142, 240);
        margin-left: 1px;
      }
    }
  }
}
</style>
