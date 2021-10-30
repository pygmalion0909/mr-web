<template>
	<div>
		<div class="signup__title-div mb-20">
			<h2 class="signup__title text-indigo-500 text-5xl mb-8">이메일 인증</h2>
			<p class="text-xl mt-2">안녕하세요.</p>
			<p class="text-xl mt-2">MR를 이용해 주셔서 진심으로 감사드립니다.</p>
			<p class="text-xl mt-2">가입하신 이메일로 <span class="text-indigo-500">"인증코드"</span>를 전송하였습니다.</p>
			<p class="text-xl mt-2">아래 입력란에 인증코드를 입력하여 회원가입을 완료해 주세요.</p>
			<p class="text-xl mt-2">감사합니다.</p>
		</div>
		<validObserver ref="validObserver">
			<ul>
				<li class="mb-5">
					<valid rules="required" v-slot="{ errors }">
						<input class="signup__text" type="text" placeholder="📌 인증코드를 입력하세요." v-model="authKey" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
				<li>
					<button class="signup__btn signup__btn--signup hover:bg-red-500" @click="signupArro">승인요청</button>
				</li>
			</ul>
		</validObserver>
	</div>
</template>

<script>
import { apiUpdateUser } from "@/api/user/user";
import { ACCOUNT_TARGET } from "@/utils/const";

export default {
	data() {
		return {
			loginId: "",
			authKey: "",
		};
	},
	created() {
		if (!this.$route.query.loginId || !this.$route.query.loginId.trim()) return this.$router.push({ name: "home" });
		this.loginId = this.$route.query.loginId;
	},
	methods: {
		async signupArro() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) return alert("가입승인 코드를 입력하세요.");
				const payload = {
					target: ACCOUNT_TARGET.signup,
					loginId: this.loginId,
					authKey: this.authKey,
				};
				await apiUpdateUser(payload);
				alert("회원가입을 정상적으로 완료 하였습니다. 진심으로 축하합니다.👏");
				this.init();
				this.$router.push({ name: "signin" });
			} catch (e) {
				if (e.response.data.code === "5") return alert("가입승인 코드가 잘못되었습니다.");
				if (e.response.data.code === "6") return alert("이미 가입승인된 회원 입니다.");
			}
		},
		init() {
			this.authKey = "";
			this.loginId = "";
		},
	},
};
</script>

<style></style>
