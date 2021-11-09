<template>
	<div class="header_side">
		<div class="header_side_nav">
			<div class="header_side_nav_contents">
				<!-- header -->
				<div class="header_side_header">
					<!-- cancel-btn -->
					<div class="header_side_nav_cancel">
						<button class="header_side_nav_cancel-btn" @click="cancelSideNav">
							<i class="fas fa-times header_side_nav-cancel-icon"></i>
						</button>
					</div>

					<!-- logo -->
					<h1 class="header_side_nav_logo">
						<router-link class="header_nav_logo-btn" :to="{ name: 'home' }" @click.native="cancelSideNav"></router-link>
					</h1>
				</div>

				<!-- my page -->
				<div class="header_side_my" v-if="isToken">
					<div class="header_side_my-img-div">
						<router-link to="/">
							<img class="header_side_my-img" src="@/assets/images/my-none-img.png" alt="my img" />
						</router-link>
					</div>
					<div class="header_side_my-info">
						<p class="header_side_my-text">
							<router-link class="header_side_my-link" :to="{ name: 'home' }" @click.native="cancelSideNav">
								{{ nickName }}
							</router-link>
							<span class="header_side_my-sir">님</span>
						</p>
						<p class="header_side_my-text">환영합니다👏</p>
					</div>
				</div>

				<!-- body(nav) -->
				<ul class="header_side_nav_ul">
					<li class="header_side_nav_li" v-for="item in linkDatas" :key="item.id">
						<router-link :to="item.link" class="header_side_nav_link" @click.native="cancelSideNav">
							<i :class="item.icon"></i>
							{{ item.title }}
						</router-link>
					</li>
				</ul>
			</div>

			<!-- footer -->
			<ul class="header_side_nav_footer">
				<li class="header_side_nav_footer-li" v-if="!isToken">
					<router-link :to="{ name: 'signin' }" class="header_side_nav_footer-link" @click.native="cancelSideNav">
						로그인
					</router-link>
				</li>
				<li class="header_side_nav_footer-li" v-if="!isToken">
					<router-link :to="{ name: 'signup' }" class="header_side_nav_footer-link" @click.native="cancelSideNav">
						회원가입
					</router-link>
				</li>
				<li class="header_side_nav_footer-li" v-if="isToken">
					<router-link :to="{ name: 'signup' }" class="header_side_nav_footer-link" @click.native="cancelSideNav">
						나의 페이지
					</router-link>
				</li>
				<li class="header_side_nav_footer-li" v-if="isToken">
					<button :to="{ name: 'signup' }" class="header_side_nav_footer-link" @click="logout">로그아웃</button>
				</li>
			</ul>
		</div>
		<div class="header_side_close-lay" @click="cancelSideNav"></div>
	</div>
</template>

<script>
import errHandler from "@/utils/errHandler";
import { apiGetUserInfo } from "@/api/user/mypage";

export default {
	data() {
		return {
			linkDatas: [
				{
					link: "/",
					icon: "fas fa-registered header_side_nav_icon",
					title: "Make Reservation",
				},
				{
					link: "/",
					icon: "fas fa-certificate header_side_nav_icon",
					title: "Badge",
				},
				{
					link: "/",
					icon: "far fa-flag header_side_nav_icon",
					title: "공지사항",
				},
				{
					link: "/",
					icon: "far fa-file-alt header_side_nav_icon",
					title: "이용약관",
				},
				{
					link: "/",
					icon: "far fa-address-card header_side_nav_icon",
					title: "개인정보처리방침",
				},
				{
					link: "/",
					icon: "fab fa-black-tie header_side_nav_icon",
					title: "혹시, 사장님이신가요?",
				},
				{
					link: "/",
					icon: "fas fa-cog",
					title: "설정",
				},
			],
			nickName: "",
			isToken: this.$store.state.token ? true : false,
		};
	},
	created() {
		if (this.isToken) this.getUserInfo();
	},
	methods: {
		cancelSideNav() {
			this.$emit("cancelSideNav", false);
		},
		async getUserInfo() {
			try {
				// CONST로 빼기
				const res = await apiGetUserInfo({ cd: "HOME" });
				this.nickName = res.data.data.info.nickName;
				this.isToken = true;
				this.$log.info("Get User Info Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		logout() {
			this.$store.commit("setLogout");
			this.cancelSideNav();
			this.isToken = false;
			this.nickName = "";
		},
	},
	computed: {
		checkSignin() {
			return this.$store.state.token;
		},
	},
	watch: {
		$route(to, from) {
			if (to.name != from.name) this.cancelSideNav();
		},
		checkSignin(token) {
			token ? this.getUserInfo() : this.logout();
		},
	},
};
</script>
