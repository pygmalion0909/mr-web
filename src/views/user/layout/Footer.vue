<template>
	<div class="footer">
		<div class="footer_content">
			<!-- body -->
			<div class="footer_body">
				<div class="footer_custom">
					<p class="footer_custom-number">고객센터 010-5237-4945</p>
					<p class="footer_custom-text">09:00~18:00</p>
					<p class="footer_custom-text">주말, 공휴일 휴무</p>
					<button class="footer_question" @click="nextV.question()">1:1문의</button>
				</div>

				<div class="footer_nav">
					<ul>
						<li class="footer_nav-title">MR정보</li>
						<li>
							<router-link class="footer_nav-link" :to="{ name: 'home' }">서비스 소개</router-link>
						</li>
					</ul>
					<ul>
						<li class="footer_nav-title">지원</li>
						<li>
							<router-link :to="{ name: 'report-list' }">공지사항</router-link>
						</li>
						<li><router-link class="footer_nav-link" :to="{ name: 'serviceTerms' }">이용약관</router-link></li>
						<li><router-link class="footer_nav-link" :to="{ name: 'personTerms' }">개인정보처리방침</router-link></li>
					</ul>
					<ul>
						<li class="footer_nav-title">회원</li>
						<li>
							<router-link class="footer_nav-link" :to="{ name: 'signin' }" v-if="!isToken">로그인</router-link>
						</li>
						<li>
							<router-link class="footer_nav-link" :to="{ name: 'signup' }" v-if="!isToken">회원가입</router-link>
						</li>
						<li>
							<router-link class="footer_nav-link" :to="{ name: 'home' }" v-if="isToken" @click.native="nextV.myPage">
								나의페이지
							</router-link>
						</li>
						<li>
							<button class="footer_nav-link" v-if="isToken" @click="logout">
								로그아웃
							</button>
						</li>
					</ul>
				</div>
			</div>

			<!-- notice -->
			<p class="footer_notice">
				MR은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매회원에게
				있습니다. <br />
				MR 사이트의 상품/판매회원/중개 서비스/거래 정보, 콘텐츠, UI 등에 대한 무단복제, 전송, 배포, 스크래핑 등의 행위는
				저작권법, 콘텐츠산업 진흥법 등 관련법령에 의하여 엄격히 금지됩니다
			</p>

			<!-- logo -->
			<div class="footer_logo">
				<router-link class="footer_logo-link" :to="{ name: 'home' }"></router-link>
				<p class="footer_copyright">© 2021 By Superpil-김경필. ALL RIGHTS RESERVED.</p>
			</div>
		</div>
	</div>
</template>

<script>
import nextV from "@/utils/nextV";

export default {
	data() {
		return {
			isToken: this.$store.state.token ? true : false,
			nextV: nextV,
		};
	},
	methods: {
		logout() {
			this.$store.commit("setLogout");
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
		checkSignin(token) {
			token ? (this.isToken = true) : (this.isToken = false);
		},
	},
};
</script>
