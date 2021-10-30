<template>
	<div class="">
		<div class="shadow-2xl ring-1 ring-indigo-100 rounded md:w-3/5 m-auto px-12 py-12">
			<router-view></router-view>
			<ul class="flex justify-center">
				<li class="mr-2">
					<router-link class="hover:text-indigo-500" :to="{ name: 'home' }">Home</router-link>
				</li>
				<li class="mr-2" v-if="page !== 'signin'">
					<router-link class="hover:text-indigo-500" :to="{ name: 'signin' }">
						로그인
					</router-link>
				</li>
				<li class="mr-2" v-if="page !== 'signup'">
					<router-link class="hover:text-indigo-500" :to="{ name: 'signup' }">
						회원가입
					</router-link>
				</li>
				<li class="mr-2">
					<router-link class="hover:text-indigo-500" :to="{ name: 'searchLoginId' }">아이디찾기</router-link>
				</li>
				<li class="mr-2">
					<router-link class="hover:text-indigo-500" :to="{ name: 'searchPassword' }"> 비밀번호찾기</router-link>
				</li>
			</ul>
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

<style></style>
