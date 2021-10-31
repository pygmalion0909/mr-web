<template>
	<div class="header">
		<!-- top-nav -->
		<div class="header_nav">
			<div class="header_nav--left">
				<button class="header_nav_btn" @click="isShowSideNav = true"></button>
			</div>
			<div class="header_nav--right">
				<ul class="header_nav_ul">
					<li class="header_nav_li" v-if="!nickName">
						<router-link class="header_nav_link" :to="{ name: 'signin' }">로그인</router-link>
					</li>
					<li class="header_nav_li" v-if="!nickName">
						<router-link class="header_nav_link" :to="{ name: 'signup' }">회원가입</router-link>
					</li>
					<li class="header_nav_li" v-if="nickName">
						<router-link class="header_nav_link--name" :to="{ name: 'home' }">
							<i class="text-indigo-500"> {{ nickName }} </i>님 환영합니다
						</router-link>
					</li>
					<li class="header_nav_li" v-if="nickName">
						<button @click="logout">로그아웃</button>
					</li>
				</ul>
			</div>
		</div>

		<!-- side-nav -->
		<transition name="header_side-nav--tran">
			<SideNav v-if="isShowSideNav" @cancelSideNav="isShowSideNav = false"></SideNav>
		</transition>

		<!-- img -->
		<div class="header_img-div">
			<img class="header_img" src="@/assets/images/header-img.png" alt="" />
		</div>

		<!-- logo -->
		<div class="header_logo">
			<router-link class="header_logo_link" :to="{ name: 'home' }"></router-link>
		</div>
	</div>
</template>

<script>
import { ROLE } from "@/utils/const";
import SideNav from "@/views/user/layout/components/SideNav";

export default {
	components: {
		SideNav,
	},
	data() {
		return {
			nickName: "",
			role: "",
			sto_role: ROLE.sto_s,
			isShowSideNav: false,
		};
	},
	created() {
		const accountInfo = this.$store.state.accountInfo;
		if (accountInfo) {
			this.nickName = accountInfo.nickName;
			this.role = accountInfo.role;
		}
	},
	methods: {
		logout() {
			this.$store.commit("removeAccountInfo");
		},
	},
	computed: {
		checkSignin() {
			return this.$store.state.accountInfo;
		},
	},
	watch: {
		checkSignin(accountInfo) {
			accountInfo ? (this.nickName = accountInfo.nickName) : (this.nickName = null);
		},
	},
};
</script>
