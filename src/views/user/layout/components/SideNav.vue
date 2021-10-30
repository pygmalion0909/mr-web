<template>
	<div class="header_side">
		<div class="header_side_nav">
			<div class="header_side_nav_contents">
				<!-- cancel-btn -->
				<div class="header_side_nav_cancel">
					<button class="header_side_nav_cancel-btn" @click="cancelSideNav">
						<i class="fas fa-times header_side_nav-cancel-icon"></i>
					</button>
				</div>

				<!-- logo -->
				<h1 class="header_side_nav_logo">
					<router-link class="header_nav_logo-btn" :to="{ name: 'home' }"></router-link>
				</h1>

				<!-- nav -->
				<ul class="header_side_nav_ul">
					<li class="header_side_nav_li" @click="cancelSideNav">
						<router-link to="/" class="header_side_nav_link">
							<i class="fas fa-registered header_side_nav_icon"></i>
							Make Reservation
						</router-link>
					</li>
					<li class="header_side_nav_li " @click="cancelSideNav">
						<router-link to="/" class="header_side_nav_link">
							<i class="fas fa-certificate header_side_nav_icon"></i>
							Badge
						</router-link>
					</li>
					<li class="header_side_nav_li">
						<router-link to="/" class="header_side_nav_link">
							<i class="far fa-flag header_side_nav_icon"></i>
							공지사항
						</router-link>
					</li>
					<li class="header_side_nav_li">
						<router-link to="/" class="header_side_nav_link">
							<i class="far fa-file-alt header_side_nav_icon"></i>
							이용약관
						</router-link>
					</li>
					<li class="header_side_nav_li">
						<router-link to="/" class="header_side_nav_link">
							<i class="far fa-address-card header_side_nav_icon"></i>
							개인정보처리방침
						</router-link>
					</li>
					<li class="header_side_nav_li">
						<router-link to="/" class="header_side_nav_link">
							<i class="fab fa-black-tie header_side_nav_icon"></i>
							혹시, 사장님이신가요?
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
	methods: {
		cancelSideNav() {
			console.log("클릭!");
			this.$emit("cancelSideNav", false);
		},
	},
};
</script>
