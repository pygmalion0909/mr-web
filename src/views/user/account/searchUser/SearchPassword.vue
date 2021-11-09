<template>
	<div class="search-passwd">
		<validObserver ref="validObserver">
			<!-- search -->
			<ul class="account_ul" v-if="!isUpdate">
				<li class="account_li">
					<valid rules="required" v-slot="{ errors }">
						<input class="account_input" type="text" v-model="loginId" placeholder="📌 아이디를 입력해주세요." />
						<p class="account_error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="account_li">
					<valid rules="email|required" v-slot="{ errors }">
						<input class="account_input" type="text" v-model="email" placeholder="📌 이메일을 입력해주세요." />
						<p class="account_error">{{ errors[0] }}</p>
					</valid>
				</li>
			</ul>

			<!-- update -->
			<ul class="signup__ul" v-if="isUpdate">
				<li class="account_li search-passwd_li">
					<valid rules="required|passwdPattern|confirmed:confirmation" v-slot="{ errors }">
						<input
							class="account_input"
							type="password"
							v-model="passwd"
							placeholder="📌 새로운 비밀번호를 입력해주세요."
						/>
						<p class="account_error">{{ errors[0] }}</p>
					</valid>
					<valid vid="confirmation" v-slot="{ errors }">
						<input
							class="account_input"
							type="password"
							v-model="rePasswd"
							placeholder="비밀번호를 동일하게 입력해주세요."
						/>
						<p class="account_error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="account_li">
					<valid rules="required" v-slot="{ errors }">
						<input class="account_input" type="text" v-model="authKey" placeholder="📌 인증키" />
						<p class="account_error">{{ errors[0] }}</p>
					</valid>
				</li>
			</ul>
		</validObserver>

		<!-- btn -->
		<div class="">
			<button class="search-id_btn" v-if="!isUpdate" @click="searchPassword">
				확인
			</button>
			<button class="search-id_btn search-passwd" v-if="isUpdate" @click="updatePassword">
				비밀번호 재설정
			</button>
			<button class="search-id_btn search-passwd search-passwd--key" v-if="isUpdate" @click="reRequestAuthKey">
				인증키 재전송
			</button>
		</div>
	</div>
</template>

<script>
import { apiSearchPasswd, apiUpdatePasswd, apiReRequestAuthKey } from "@/api/user/auth";
import { NOTICE_TITLE, ERR_CD } from "@/utils/const";
import errHandler from "@/utils/errHandler";
import notice from "@/utils/notice";

export default {
	data() {
		return {
			// data
			loginId: "",
			email: "",
			passwd: "",
			rePasswd: "",
			authKey: "",
			// boolean
			isUpdate: false,
		};
	},
	created() {
		this.checkLoginIdEmail();
	},
	methods: {
		checkLoginIdEmail() {
			const loginId = this.$route.params.loginId;
			const email = this.$route.params.email;
			if (email && loginId) {
				this.isUpdate = true;
				this.loginId = loginId;
				this.email = email;
			}
		},
		async searchPassword() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) {
					return await notice.alert({ title: NOTICE_TITLE.WAR, text: "필수항목(📌)을 확인해주세요.🙏" });
				}

				this.$store.commit("onSpinner");
				await apiSearchPasswd({ loginId: this.loginId, email: this.email });
				this.$store.commit("offSpinner");

				await notice.alert({
					title: NOTICE_TITLE.DONE,
					text: "인증번호를 입력하신 이메일로 발송하였습니다.<br/>확인 후 비밀번호를 변경해주세요.",
				});
				this.isUpdate = true;
			} catch (error) {
				await errHandler.common(error);
			}
		},
		async updatePassword() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) {
					return await notice.alert({ title: NOTICE_TITLE.WAR, text: "필수항목(📌)을 확인해주세요.🙏" });
				}

				const payload = {
					email: this.email,
					loginId: this.loginId,
					passwd: this.passwd,
					authKey: this.authKey,
				};

				this.$store.commit("onSpinner");
				await apiUpdatePasswd(payload);
				this.$store.commit("offSpinner");

				await notice.alert({ title: NOTICE_TITLE.DONE, text: "비밀번호가 정상적으로 변경 되었습니다." });
				this.$router.push({ name: "signin" });
			} catch (error) {
				switch (error.response.data.errCd) {
					case ERR_CD.NOT_FOUND:
						await notice.alert({ title: NOTICE_TITLE.WAR, text: "인증키 또는 입력한 정보가 맞지 않습니다." });
						break;
					default:
						await errHandler.common(error);
				}
			}
		},
		async reRequestAuthKey() {
			try {
				this.$store.commit("onSpinner");
				const res = await apiReRequestAuthKey({ loginId: this.loginId, target: "passwd" });
				this.$store.commit("offSpinner");

				await notice.alert({
					title: NOTICE_TITLE.DONE,
					text: `가입된 이메일로 인증키를 재전송 하였습니다.<br/>인증키 확인 후 비밀번호 변경을 완료해주세요.
						<br/>만약, 메일보관함에 없을경우 스팸메일함도 확인해주세요.`,
				});

				this.$log.info("Re Request Auth Key Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		init() {
			this.loginId = "";
			this.email = "";
			this.passwd = "";
			this.rePasswd = "";
			this.authKey = "";
			this.isUpdate = false;
		},
	},
};
</script>
