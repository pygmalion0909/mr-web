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
						<input class="account_input" type="password" v-model="password" placeholder="📌 비밀번호를 입력해주세요." />
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
				<router-link class="signin_btn-link" to="/">
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
import { NOTICE_TITLE } from "@/utils/const";

export default {
	data() {
		return {
			loginId: "",
			password: "",
		};
	},
	methods: {
		async signin() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) {
					return await notice.alert({ title: NOTICE_TITLE.WAR, text: "필수항목(📌)을 작성해주세요.🙏" });
				}

				const payload = {
					loginId: this.loginId,
					password: this.password,
				};
				const res = await apiSignin(payload);
				// set signin info
				this.$store.commit("setAccountInfo", res.data.data);
				this.$router.push({ name: "home" });
			} catch (e) {
				// case: validation false
				if (e.response.data.code === "1") return alert("입력하신 정보를 확인해주세요.");
				// case: not approval
				if (e.response.data.code === "4") {
					alert("가입승인을 완료하지 않았습니다.");
					this.$router.push({ name: "signupAppro", query: { loginId: this.loginId } });
				}
				// case: loginId or password false
				if (e.response.data.code === "2") alert("로그인ID 또는 비밀번호를 확인 해주세요.");
				console.log("Signin E :", e.response);
			}
		},
	},
};
</script>
