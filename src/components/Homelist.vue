<template>
	<div>
		<router-link to="homelist">Homelist</router-link>

		<template v-if="!this.$store.state.flag">
			<router-link to="sgin">Register</router-link>
			<router-link to="loginlist">Login</router-link>
		</template>
		<template v-else>
			<div>
				<h2>
					欢迎你
					<span style="text-decoration: underline; color: red;">
						{{ this.$store.state.username }}
					</span>
				</h2>
			</div>
		</template>

		<router-view></router-view>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
