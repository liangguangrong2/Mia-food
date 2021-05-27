<template>
  <div class="register">
    <div class="buttom">
      <i class="iconfont icon icon-fanhui2" @click="back"></i>
    </div>
    <div class="lett">
      <h2>注册后才精彩</h2>
      <p></p>
    </div>
    <div class="box">
      <div class="next">
        <van-field
          v-model="userRegisterInfo.nickName"
          name="昵称"
          label="昵称"
          left-icon="friends-o"
          placeholder="请输入你的昵称"
          autocomplete="off"
        />

        <van-field
          type="text"
          v-model.trim="userRegisterInfo.phone"
          left-icon="manager-o"
          name="账号"
          label="账号"
          @keyup.enter="register"
          placeholder="请输入你的电话号码"
          autocomplete="off"
        />
      </div>

      <div class="text">
        <van-field
          v-model="userRegisterInfo.password"
          :type="isRegisterPassword ? 'password' : 'text'"
          left-icon="chat-o"
          name="密码"
          label="密码"
          @keyup.enter="register"
          placeholder="请输入您的密码"
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'"
          autocomplete="off"
          @click-right-icon="toggleRegsiterPasswordType"
        />
      </div>

      <!-- <button @click="register">注册</button> -->
      <van-button type="primary" @click="register">注册</van-button>
      <el-row>
        <!-- <el-button icon="el-icon-search" circle>11</el-button> -->
      </el-row>
    </div>
  </div>
</template>
<script>
//导入表单验证模块
import { validForm } from "../assets/js/validForm";
export default {
  data() {
    return {
      //用户注册信息
      userRegisterInfo: {
        phone: "",
        password: "",
        nickName: ""
      },
      //切换注册密码框的类型
      isRegisterPassword: true
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "Loginlist"
      });
    },
    //切换注册密码框的类型
    toggleRegsiterPasswordType() {
      this.isRegisterPassword = !this.isRegisterPassword;
    },

    register() {
      //构造表单验证信息
      let o = {
        phone: {
          value: this.userRegisterInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/
        },
        password: {
          value: this.userRegisterInfo.password,
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/
        },
        nickName: {
          value: this.userRegisterInfo.nickName,
          errorMsg: "昵称由字母数字下划线汉字组合(1-10字符)",
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/
        }
      };
      /* localStorage.setItem("a", 1); */

      // 简写
      // localStorage.userInfo = this.userInfo;
      let isPass = validForm.valid(o);
      if (isPass) {
        localStorage.userRegisterInfo = JSON.stringify(this.userRegisterInfo);

        // let aToObj = JSON.parse(this.userRegisterInfo);
        // console.log(aToObj);
        /* this.$store.commit("getUserInfo", {
				name: this.username,
			}); */
        this.$toast("注册成功");
        this.$router.push({
          path: "loginlist"
        });
      }
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
  // padding: 0 8px;
  box-sizing: border-box;
  .buttom {
    position: fixed;
    top: 14px;
    left: 15px;
    // color: #e3e8f3;
    .iconfont {
      font-family: "iconfont" !important;
      color: rgb(170, 171, 182);
      font-size: 20px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
  .lett {
    // margin-top: 130px;
  }
  .box {
    margin-top: 10px;
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
    .next {
      // margin-top: 10px;
      .van-field {
        // background-color: rgb(252, 248, 248);
        border-bottom: 1px solid rgb(196, 190, 190);
      }
    }
    .text {
      // margin-top: 20px;
      width: 81%;
      .van-field {
        // background-color: rgb(252, 248, 248);
        border-bottom: 1px solid rgb(196, 190, 190);
        margin-top: 10px;
      }
    }
    button {
      margin-top: 48px;
      width: 84%;
      height: 40px;
      color: white;
      border-radius: 50px;
      background-color: rgb(223, 181, 181);
      box-shadow: 0 1px 1px 1px rgba(245, 31, 31, 0.5);
      outline: 0;
      border: 0;
    }
  }
}
</style>
