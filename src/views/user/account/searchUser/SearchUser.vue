<template>
	<div class="search-user">
		<!-- tab -->
		<ul class="search-user_ul">
			<li class="search-user_li search-user_id" :class="{ 'search-user_active-tab': page === 'searchLoginId' }">
				<router-link class="search-user_tab-link" :to="{ name: 'searchLoginId' }">아이디 찾기</router-link>
			</li>
			<li class="search-user_li search-user_passwd" :class="{ 'search-user_active-tab': page === 'searchPasswd' }">
				<router-link class="search-user_tab-link" :to="{ name: 'searchPasswd' }">비밀번호 찾기</router-link>
			</li>
		</ul>

		<!-- contents -->
		<div class="search-user_contents">
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
			if (to.name !== form.name) this.page = this.$route.name;
		},
	},
};
</script>
