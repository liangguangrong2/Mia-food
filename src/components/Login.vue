<template>
	<div class="box">
		<div class="buttom">
			<i class="iconfont icon icon-guanbi" @click="back"></i>
		</div>
		<van-form>
			<van-field
				v-model="userInfo.phone"
				name="账号"
				label="账号"
				placeholder="输入数字的号码"
				autocomplete="off"
			/>

			<van-field
				v-model="userInfo.password"
				:type="isRegisterPassword ? 'password' : 'text'"
				name="密码"
				label="密码"
				placeholder="密码必须为字母开头"
				:right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'"
				@click-right-icon="toggleRegsiterPasswordType"
				autocomplete="off"
			/>

			<div class="commit-btn">
				<van-button block color="#1A73E8">
					登录1
				</van-button>
			</div>
			<div class="commit-btn">
				<van-button block type="default" @click="toggleRegisterBox">
					注册
				</van-button>
			</div>
		</van-form>

		<!-- 注册 -->
		<van-popup
			class="register-box"
			v-model="isShow"
			position="bottom"
			closeable
		>
			<div class="register-title">注册</div>
			<van-form>
				<van-field
					v-model="userRegisterInfo.phone"
					name="手机号"
					label="手机号"
					placeholder="11位手机号"
					autocomplete="off"
				/>

				<van-field
					v-model="userRegisterInfo.password"
					:type="isRegisterPassword ? 'password' : 'text'"
					name="密码"
					label="密码"
					placeholder="密码必须为字母开头"
					:right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'"
					autocomplete="off"
					@click-right-icon="toggleRegsiterPasswordType"
				/>

				<van-field
					v-model="userRegisterInfo.nickName"
					name="昵称"
					label="昵称"
					placeholder="昵称"
					autocomplete="off"
				/>

				<div class="commit-btn register-btn">
					<van-button round block color="#1A73E8">
						注册
					</van-button>
				</div>
			</van-form>
		</van-popup>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//用户登录信息
			userInfo: {
				phone: "",
				password: "",
			},
			//用户注册信息
			userRegisterInfo: {
				phone: "",
				password: "",
				nickName: "",
			},
			//是否显示注册框
			isShow: false,

			//切换注册密码框的类型
			isRegisterPassword: true,
		};
	},
	methods: {
		back() {
			this.$router.go(-1);
		},

		//切换注册框
		toggleRegisterBox() {
			this.isShow = true;
		},

		//切换注册密码框的类型
		toggleRegsiterPasswordType() {
			this.isRegisterPassword = !this.isRegisterPassword;
		},
	},
};
</script>

<style scoped lang="less">
.box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: url("../assets/images/yk3.jpeg") no-repeat;
	background-size: 100% 100%;
	padding: 0 8px;
	box-sizing: border-box;
	.buttom {
		position: fixed;
		top: 14px;
		left: 15px;
		color: #c8c9cc;
	}
	.commit-btn {
		margin-top: 20px;
	}

	.register-box {
		padding: 15px 0;
		background: url("../assets/images/yk3.jpeg") center;
		background-size: 100%;
	}

	.register-btn {
		padding: 0 15px;
	}

	.register-title {
		font-size: 24px;
		font-weight: bold;
		padding: 0 15px;
		margin-bottom: 50px;
		color: white;
	}

	.auto-img {
		width: 50%;
		display: block;
	}
	.van-cell {
		background-color: transparent;
	}
	.van-cell__title span {
		color: white;
	}
	input::-webkit-input-placeholder {
		color: #ffffff;
		font-size: 14px;
	}
	/deep/ .van-field__control {
		transition: background-color 5000s ease-in-out 0s;
		color: white;
	}
	/deep/ .van-field__label {
		// transition:background-color 5000s ease-in-out 0s;
		color: white;
	}

	.van-button--small {
		border-radius: 10px;
	}
}
</style>
