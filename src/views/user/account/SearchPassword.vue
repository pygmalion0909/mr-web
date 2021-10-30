<template>
	<div class="">
		<div class="">
			<h2 class="font-nB text-indigo-500 text-5xl mb-8" v-if="!isUpdate">Search Password</h2>
			<h2 class="font-nB text-indigo-500 text-5xl mb-8" v-else>Update Password</h2>
		</div>
		<validObserver ref="validObserver">
			<ul class="signup__ul" v-if="!isUpdate">
				<li class="signup__li">
					<valid rules="required" v-slot="{ errors }">
						<input class="signup__text" type="text" v-model="loginId" placeholder="📌 로그인ID" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="signup__li">
					<valid rules="email|required" v-slot="{ errors }">
						<input class="signup__text" type="text" v-model="email" placeholder="📌 이메일" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
			</ul>
			<ul class="signup__ul" v-if="isUpdate">
				<li class="signup__li">
					<valid rules="required|min:10|confirmed:confirmation" v-slot="{ errors }">
						<input class="signup__text" type="password" v-model="password" placeholder="📌 비밀번호 재설정" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="signup__li">
					<valid vid="confirmation" v-slot="{ errors }">
						<input class="signup__text" type="password" v-model="rePassword" placeholder="비밀번호 확인" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="signup__li">
					<valid rules="required" v-slot="{ errors }">
						<input class="signup__text" type="text" v-model="authKey" placeholder="📌 인증키" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
			</ul>
		</validObserver>
		<div class="signup__btn-div">
			<button
				class="signup__btn signup__btn--signup bg-indigo-500 hover:bg-indigo-600"
				v-if="!isUpdate"
				@click="searchPassword"
			>
				확인
			</button>
			<button
				class="signup__btn signup__btn--signup bg-indigo-500 hover:bg-indigo-600"
				v-if="isUpdate"
				@click="updatePassword"
			>
				비밀번호 재설정
			</button>
		</div>
	</div>
</template>

<script>
import { apiSearchPassword, apiUpdateUser } from "@/api/user/user";
import { ACCOUNT_TARGET } from "@/utils/const";

export default {
	data() {
		return {
			loginId: "",
			email: "",
			password: "",
			rePassword: "",
			authKey: "",
			isUpdate: false,
		};
	},
	created() {},
	methods: {
		async searchPassword() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) return alert("필수항목(📌)을 작성해주세요.🙏");

				const payload = {
					loginId: this.loginId,
					email: this.email,
				};
				await apiSearchPassword(payload);
				alert("인증번호가 이메일로 발송되었습니다.");
				this.isUpdate = true;
			} catch (e) {
				// case: loginId or email false
				if (e.response.data.code === "2") alert("로그인ID 또는 이메일을 확인 해주세요.");
				console.log("Search Password E :", e.response);
			}
		},
		async updatePassword() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) return alert("필수항목(📌)을 작성해주세요.🙏");
				const payload = {
					target: ACCOUNT_TARGET.pass,
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
