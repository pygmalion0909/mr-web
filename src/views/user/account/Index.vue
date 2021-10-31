<template>
	<div class="account">
		<div class="account_left">
			<img src="@/assets/images/account-cover.jpg" alt="" />
		</div>
		<div class="account_right">
			<div class="account-title">로그인</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			page: this.$route.name,
		};
	},
	watch: {
		$route(to, form) {
			if (to.query !== form.query) this.page = this.$route.query.page;
		},
	},
};
</script>
