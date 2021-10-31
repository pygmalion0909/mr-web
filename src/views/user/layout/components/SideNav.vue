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
					<h1 class="header_side_nav_logo" @click="cancelSideNav">
						<router-link class="header_nav_logo-btn" :to="{ name: 'home' }"></router-link>
					</h1>
				</div>

				<!-- body(nav) -->
				<ul class="header_side_nav_ul">
					<li class="header_side_nav_li" v-for="item in linkDatas" :key="item.id" @click="cancelSideNav">
						<router-link :to="item.link" class="header_side_nav_link">
							<i :class="item.icon"></i>
							{{ item.title }}
						</router-link>
					</li>
				</ul>
			</div>

			<!-- footer -->
			<ul class="header_side_nav_footer">
				<li class="header_side_nav_footer-li">
					<router-link to="/" class="header_side_nav_footer-link">로그인</router-link>
				</li>
				<li class="header_side_nav_footer-li">
					<router-link to="/" class="header_side_nav_footer-link">회원가입</router-link>
				</li>
			</ul>
		</div>
		<div class="header_side_close-lay" @click="cancelSideNav"></div>
	</div>
</template>

<script>
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
			],
		};
	},
	methods: {
		cancelSideNav() {
			this.$emit("cancelSideNav", false);
		},
	},
};
</script>
