<template>
	<div class="bind">
		<iframe :src="$route.params.url"></iframe>
	</div>
</template>

<script>
export default {
	name: "Hot",
};
</script>
<style lang="less">
.bind {
	width: 100%;
	height: 1000px;
	// border: 1px solid;
	iframe {
		width: 100%;
		height: 100%;
	}
}
</style>
