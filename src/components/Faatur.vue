<template>
	<div>
		<Cookstep v-for="(item, index) in rice" :key="index" :item="item" />
	</div>
</template>

<script>
import Cookstep from "@/components/Cookstep.vue";
export default {
	components: { Cookstep },
	data() {
		return {
			// 菜谱详细内容id
			id: "",
			rice: [],
			major: [],
			cook: [],
			value: 1,
		};
	},
	mounted() {
		console.log(this.$route.query.id);
	},
	created() {
		this.id = this.$route.query.id;
		this.GetMenu();
	},
	methods: {
		//返回上一级
		back() {
			this.$router.go(-1);
		},
		GetMenu() {
			this.axios({
				//请求类型
				method: "GET",
				url: "/recipe/detail",
				params: {
					id: this.$route.query.id,
				},
			}).then((response) => {
				this.rice = response.data.result;
				console.log(this.rice);
				// console.log(this.id);
				this.major = response.data.result.recipe.major;
				console.log(this.major);
				// console.log(response);
				this.cook = response.data.result.recipe.cookstep;
				console.log(this.cook);
			});
		},
	},
};
</script>

<style></style>
