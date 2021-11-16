<template>
	<div class="term">
		<div class="term_div">
			<div class="term_logo">
				<img class="term_logo-img" src="@/assets/icons/logo1.svg" alt="" @click="goHome" />
			</div>
			<div class="term_contents">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		goHome() {
			this.$router.push({ name: "home" });
		},
	},
};
</script>
