<template>
	<div class="box">
		<!-- <img :src="item.icon" alt="" /> -->
		<!-- <div class="box-i">
			{{ item.title }}
		</div> -->
		<!-- <p>
			{{ item.title }}
		</p> -->

		<van-grid :gutter="10">
			<!-- <img :src="item.icon" alt="" /> -->

			<p>
				<!-- {{ item.title }} -->
			</p>
		</van-grid>
	</div>
</template>

<script>
export default {
	// props: ["item", "index"],
};
</script>

<style scoped lang="less">
// .box {
// 	width: 60px;
// 	height: 60px;
// 	margin-top: 30px;
// 	float: left;
// 	margin-left: 8px;

// 	img {
// 		width: 100%;
// 	}
// 	p {
// 		font-size: 9px