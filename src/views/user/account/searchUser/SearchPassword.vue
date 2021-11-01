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
					<valid rules="required|min:10|confirmed:confirmation" v-slot="{ errors }">
						<input
							class="account_input"
							type="password"
							v-model="password"
							placeholder="📌 새로운 비밀번호를 입력해주세요."
						/>
						<p class="account_error">{{ errors[0] }}</p>
					</valid>
					<valid vid="confirmation" v-slot="{ errors }">
						<input
							class="account_input"
							type="password"
							v-model="rePassword"
							placeholder="비밀번호 동일하게 입력해주세요."
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
			<button class="search-id_btn search-passwd search-passwd--key" v-if="isUpdate" @click="updatePassword">
				인증키 재전송
			</button>
		</div>
	</div>
</template>

<script>
import { apiSearchPasswd, apiUpdateUser } from "@/api/user/user";
import { NOTICE_TITLE } from "@/utils/const";
import errHandler from "@/utils/errHandler";
import notice from "@/utils/notice";

export default {
	data() {
		return {
			// data
			loginId: "",
			email: "",
			password: "",
			rePassword: "",
			authKey: "",
			// boolean
			isUpdate: false,
		};
	},
	created() {
		// this.checkLoginIdEmail();
	},
	methods: {
		checkLoginIdEmail() {
			try {
				console.log("this.$route", this.$route);
				if (!this.loginId || !this.email) this.init();
			} catch (error) {
				this.$log.info("Check LoginId Email E : ", error);
			}
		},
		async searchPassword() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) {
					return await notice.alert({ title: NOTICE_TITLE.WAR, text: "필수항목(📌)을 확인해주세요.🙏" });
				}

				await apiSearchPasswd({ loginId: this.loginId, email: this.email });
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
				if (!(await this.$refs.validObserver.validate())) return alert("필수항목(📌)을 작성해주세요.🙏");
				const payload = {
					loginId: this.loginId,
					password: this.password,
					authKey: this.authKey,
				};
				await apiUpdateUser(payload);
				alert("비밀번호가 정상적으로 설정 되었습니다.");
				this.$router.push({ name: "signin" });
			} catch (e) {
				// case: validation false
				if (e.response.data.code === "1") return alert("입력하신 정보를 확인해주세요.");
				// case: authKey false
				if (e.response.data.code === "5") return alert("인증코드가 잘못되었습니다.");
				console.log("Update Password E :", e.response);
			}
		},
		init() {
			this.loginId = "";
			this.email = "";
			this.password = "";
			this.rePassword = "";
			this.authKey = "";
			this.isUpdate = false;
		},
	},
};
</script>

<style scoped>
/* checkbox */
.container:hover input ~ .checkmark {
	background-color: #6365f142;
}
.container input:checked ~ .checkmark {
	background-color: #6366f1;
}
.container input:checked ~ span {
	color: #6366f1;
}
.checkmark:after {
	content: "";
	position: absolute;
	display: none;
}
.container input:checked ~ .checkmark:after {
	display: block;
}
.container .checkmark:after {
	left: 5px;
	top: 2px;
	width: 5px;
	height: 10px;
	border: solid white;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}
</style>
