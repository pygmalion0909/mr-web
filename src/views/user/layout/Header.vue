<template>
	<div class="header">
		<!-- top-nav -->
		<div class="header_nav">
			<div class="header_nav--left"><button class="header_nav_btn" @click="isShowSideNav = true"></button></div>
			<div class="header_nav--right">
				<ul class="header_nav_ul">
					<li class="header_nav_li" v-if="!isToken">
						<router-link class="header_nav_link" :to="{ name: 'signin' }">로그인</router-link>
					</li>
					<li class="header_nav_li" v-if="!isToken">
						<router-link class="header_nav_link" :to="{ name: 'signup' }">회원가입</router-link>
					</li>
					<li class="header_nav_li" v-if="isToken">
						<router-link class="header_nav_link--name" :to="{ name: 'home' }" @click.native="nextV.myPage">
							나의 페이지
						</router-link>
					</li>
					<li class="header_nav_li" v-if="isToken">
						<button @click="logout">로그아웃</button>
					</li>
				</ul>
			</div>
		</div>

		<!-- side-nav -->
		<transition name="header_side-nav--tran">
			<SideNav v-show="isShowSideNav" @cancelSideNav="isShowSideNav = false"></SideNav>
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
import SideNav from "@/views/user/layout/components/SideNav";
import nextV from "@/utils/nextV";

export default {
	components: {
		SideNav,
	},
	data() {
		return {
			nickName: "",
			nextV: nextV,
			// boolean
			isShowSideNav: false,
			isToken: this.$store.state.token ? true : false,
		};
	},
	methods: {
		logout() {
			this.$store.commit("setLogout");
			this.isToken = false;
		},
	},
	computed: {
		checkSignin() {
			return this.$store.state.token;
		},
	},
	watch: {
		checkSignin(token) {
			token ? (this.isToken = true) : (this.isToken = false);
		},
	},
};
</script>
