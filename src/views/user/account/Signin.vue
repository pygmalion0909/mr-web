<template>
	<div class="signin">
		<validObserver ref="validObserver">
			<ul class="account_ul">
				<li class="account_li">
					<valid rules="required" v-slot="{ errors }">
						<input class="account_input" type="text" v-model="loginId" placeholder="📌 아이디를 입력해주세요." />
						<p class="account_error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="account_li">
					<valid rules="required" v-slot="{ errors }">
						<input class="account_input" type="password" v-model="passwd" placeholder="📌 비밀번호를 입력해주세요." />
						<p class="account_error">{{ errors[0] }}</p>
					</valid>
				</li>
			</ul>
		</validObserver>
		<ul class="signin_btn-ul">
			<li class="signin_btn-li">
				<button class="signin_btn_signin" @click="signin">로그인</button>
			</li>
			<li class="signin_btn-li signin_btn-li--link">
				<router-link class="signin_btn-link" :to="{ name: 'searchLoginId' }">
					아이디•비밀번호 찾기
					<i class="fas fa-arrow-circle-right signin_btn_right-icon"></i>
				</router-link>
			</li>
			<li class="signin_btn-li signin_btn-li--signup">
				<router-link class="signin_btn_link" :to="{ name: 'signup' }">회원가입</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import { apiSignin } from "@/api/user/user";
import notice from "@/utils/notice";
import { NOTICE_TITLE, ERR_CD } from "@/utils/const";
import errHandler from "@/utils/errHandler";

export default {
	data() {
		return {
			loginId: "",
			passwd: "",
		};
	},
	methods: {
		async signin() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) {
					return await notice.alert({ title: NOTICE_TITLE.WAR, text: "필수항목(📌)을 확인해주세요.🙏" });
				}

				this.$store.commit("onSpinner");
				const res = await apiSignin({ loginId: this.loginId, passwd: this.passwd });
				this.$store.commit("offSpinner");

				this.processSigninRes(res.data.data);
				this.setInit();

				this.$log.info("Signin Res : ", res);
			} catch (error) {
				switch (error.response.data.errCd) {
					case ERR_CD.NOT_FOUND:
						await notice.alert({ title: NOTICE_TITLE.WAR, text: "아이디 또는 비밀번호를 확인해주세요." });
						break;
					default:
						await errHandler.common(error);
				}
			}
		},
		async processSigninRes(data) {
			if (data.token) {
				this.$store.commit("setToken", data.token);
				this.$router.push({ name: "home" });
			} else {
				let name, text;

				switch (data.info.statusCd) {
					case "A":
						name = "signupAppro";
						text = "회원가입 후 인증단계를 완료 하지 않았습니다.<br/>인증 페이지로 이동 합니다.";
						break;
					case "P":
						name = "searchPasswd";
						text = "'비밀번호 찾기' 요청으로 비밀번호 변경이 필요합니다.<br/>비밀번호 변경 페이지로 이동합니다.";
						break;
				}

				await notice.alert({ title: NOTICE_TITLE.NOTI, text: text });

				this.$router.push({
					name: name,
					params: {
						loginId: data.info.loginId,
						nickName: data.info.nickName,
						email: data.info.email,
					},
				});
			}
		},
		setInit() {
			this.loginId = "";
			this.passwd = "";
		},
	},
};
</script>
