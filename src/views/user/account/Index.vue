<template>
	<div class="account">
		<div class="account_left">
			<img src="@/assets/images/account-cover.png" alt="" />
		</div>
		<div class="account_right">
			<div class="account-title">{{ title }}</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: "",
		};
	},
	created() {
		this.setTitle();
	},
	methods: {
		setTitle() {
			this.$route.name === "signin" ? (this.title = "로그인") : (this.title = "계정정보 찾기");
		},
	},
	watch: {
		$route(to, form) {
			if (to.name !== form.name) this.setTitle();
		},
	},
};
</script>
