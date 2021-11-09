<template>
	<div class="appro">
		<div class="appro_contents">
			<!-- header -->
			<div class="appro_header">
				<router-link to="/" class="appro_link-logo">
					<img src="@/assets/icons/logo1.svg" alt="" />
				</router-link>
				<p class="appro_header_title">회원가입 인증</p>
			</div>

			<!-- body -->
			<validObserver ref="validObserver">
				<ul class="appro_body_ul">
					<!-- text -->
					<li class="appro_body_li">
						<p class="appro_notice">
							<span class="appro_notice--nickName">{{ nickName }}</span>
							님
						</p>
						<p class="appro_notice">
							가입하신 이메일<span class="appro_notice--email">({{ email }})</span>
							로 인증코드를 전송하였습니다.
						</p>
						<p class="appro_notice">아래 인증키를 입력하여 회원가입을 완료해 주세요.</p>
					</li>
					<!-- auth-key -->
					<li class="appro_body_li">
						<valid rules="required" v-slot="{ errors }">
							<p class="appro_title">인증키</p>
							<input class="appro_input" type="text" v-model="authKey" placeholder="📌 인증키를 입력해주세요." />
							<p class="appro_error">{{ errors[0] }}</p>
						</valid>
					</li>

					<!-- btn -->
					<li class="appro_body_li">
						<button class="appro_btn appro_btn--ok" @click="signupArro">가입완료</button>
						<button class="appro_btn appro_btn--re-auth" @click="reRequestAuthKey">인증키 재전송</button>
					</li>
				</ul>
			</validObserver>

			<!-- footer -->
			<p class="appro_footer">© 2021 By Superpil-김경필. ALL RIGHTS RESERVED.</p>
		</div>
	</div>
</template>

<script>
import { apiSignupCertification } from "@/api/user/auth";
import { NOTICE_TITLE } from "@/utils/const";
import { apiReRequestAuthKey } from "@/api/user/auth";
import errHandler from "@/utils/errHandler";
import notice from "@/utils/notice";

export default {
	data() {
		return {
			loginId: "",
			email: "",
			nickName: "",
			authKey: "",
		};
	},
	created() {
		this.checkAccessRouterInfo();
	},
	methods: {
		async checkAccessRouterInfo() {
			this.loginId = this.$route.params.loginId;
			this.nickName = this.$route.params.nickName;
			this.email = this.$route.params.email;
			if (!this.nickName || !this.loginId || !this.email) {
				await notice.alert({ title: NOTICE_TITLE.WAR, text: "잘못된 접근 입니다." });
				this.$router.push({ name: "home" });
				return;
			}
		},
		async signupArro() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) {
					return await notice.alert({ title: NOTICE_TITLE.WARM, text: "필수항목(📌)을 확인해주세요.🙏" });
				}

				this.$store.commit("onSpinner");
				await apiSignupCertification({ loginId: this.loginId, authKey: this.authKey });
				this.$store.commit("offSpinner");

				await notice.alert({
					title: NOTICE_TITLE.DONE,
					text: "회원가입을 정상적으로 완료 하였습니다. 진심으로 축하합니다.👏",
				});
				this.init();
				this.$router.push({ name: "signin" });
			} catch (error) {
				await errHandler.common(error);
			}
		},
		async reRequestAuthKey() {
			try {
				this.$store.commit("onSpinner");
				const res = await apiReRequestAuthKey({ loginId: this.loginId, target: "signup" });
				this.$store.commit("offSpinner");

				await notice.alert({
					title: NOTICE_TITLE.DONE,
					text: `가입된 이메일로 인증키를 재전송 하였습니다.<br/>인증키 확인 후 회원가입을 완료해주세요.
						<br/>만약, 메일보관함에 없을경우 스팸메일함도 확인해주세요.😄`,
				});

				this.$log.info("Re Request Auth Key Res(Singup Approval) : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		init() {
			this.loginId = "";
			this.email = "";
			this.nickName = "";
			this.authKey = "";
		},
	},
};
</script>

<style></style>
