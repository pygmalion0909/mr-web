<template>
	<div class="signup">
		<div class="signup__title-div">
			<h2 class="signup__title text-indigo-500 text-5xl mb-8">Let's</h2>
			<h2 class="signup__title text-indigo-500 text-5xl mb-8">SignUp</h2>
		</div>
		<validObserver ref="validObserver">
			<ul class="signup__ul">
				<li class="signup__li signup__li--role">
					<valid rules="required" v-slot="{ errors }">
						<label class="select-none container relative cursor-pointer pl-7 mr-6">
							<input
								class="absolute opacity-0 left-0 top-0 cursor-pointer"
								type="radio"
								name="role"
								value="USE"
								v-model="role"
							/>
							<span class="h-6 w-6 checkmark absolute top-0 left-0 bg-white border border-indigo-200 rounded"></span>
							<span class="align-top text-xl">회원</span>
						</label>
						<label class="select-none container relative cursor-pointer pl-7 mr-6">
							<input
								class="absolute opacity-0 left-0 top-0 cursor-pointer"
								type="radio"
								name="role"
								value="STO"
								v-model="role"
							/>
							<span class="h-6 w-6 checkmark absolute top-0 left-0 bg-white border border-indigo-200 rounded"></span>
							<span class="align-top text-xl">사업주</span>
						</label>
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="signup__li">
					<valid rules="required" v-slot="{ errors }">
						<input class="signup__text" type="text" v-model="loginId" placeholder="📌 로그인ID" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="signup__li">
					<valid rules="required" v-slot="{ errors }">
						<input class="signup__text" type="text" v-model="nickName" placeholder="📌 닉네임" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="signup__li">
					<valid rules="email|required" v-slot="{ errors }">
						<input class="signup__text" type="text" v-model="email" placeholder="📌 이메일" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="signup__li">
					<valid rules="required|min:10|confirmed:confirmation" v-slot="{ errors }">
						<input class="signup__text" type="password" v-model="password" placeholder="📌 비밀번호" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li class="signup__li">
					<valid vid="confirmation" v-slot="{ errors }">
						<input class="signup__text" type="password" v-model="rePassword" placeholder="비밀번호 확인" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
			</ul>
		</validObserver>
		<div class="signup__btn-div">
			<button class="signup__btn signup__btn--signup hover:bg-red-500" @click="signup">가입</button>
			<button class="signup__btn signup__btn--cancel" @click="cancel">취소</button>
		</div>
	</div>
</template>

<script>
import { apiSignup } from "@/api/user/user";
import { ROLE } from "@/utils/const";

export default {
	data() {
		return {
			role: ROLE.use,
			loginId: "",
			nickName: "",
			password: "",
			email: "",
			rePassword: "",
		};
	},
	methods: {
		async signup() {
			try {
				if (!confirm("현재 정식오픈을 시작하지 않았습니다. 그래도 가입하시겠습니까?")) return;
				// check valid
				if (!(await this.$refs.validObserver.validate())) return alert("가입 필수항목(📌)을 작성해주세요.🙏");
				const payload = {
					role: this.role,
					loginId: this.loginId,
					nickName: this.nickName,
					email: this.email,
					password: this.password,
				};
				await apiSignup(payload);
				alert("인증번호가 이메일로 발송되었습니다.");
				// 이메일 인증페이지 이동
				this.$router.push({ name: "signupAppro", query: { loginId: this.loginId } });
				// 초기화
				this.init();
			} catch (e) {
				if (e.response.data.code === "1") {
					if (e.response.data.error.msg === "duplication") {
						if (e.response.data.error.param === "loginId") return alert("이미 존재하는 로그인ID 입니다.");
						if (e.response.data.error.param === "nickName") return alert("이미 존재하는 닉네임 입니다.");
						if (e.response.data.error.param === "email") return alert("이미 존재하는 이메일 입니다.");
					}
				} else {
					if (!confirm("🚑예상치 못한 문제가 발생했습니다. 고객센터로 이동하시겠습니까?")) return;
				}
			}
		},
		init() {
			this.role = ROLE.use;
			this.loginId = "";
			this.nickName = "";
			this.password = "";
			this.email = "";
			this.rePassword = "";
		},
		cancel() {
			if (!confirm("작성하신 정보가 사라집니다. 그래도 취소하시겠습니까?")) return;
			this.$router.push({ name: "home" });
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
