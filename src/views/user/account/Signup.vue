<template>
	<div class="signup">
		<div class="signup_contents">
			<!-- header -->
			<div class="signup_header">
				<router-link to="/" class="signup_header_link-logo">
					<img src="@/assets/icons/logo1.svg" alt="" />
				</router-link>
			</div>

			<!-- body -->
			<validObserver ref="validObserver">
				<ul class="signup_body_ul">
					<!-- id -->
					<li class="signup_body_li">
						<valid rules="required" v-slot="{ errors }">
							<p class="signup_title">아이디</p>
							<input class="signup_input" type="text" v-model="loginId" placeholder="📌 아이디를 입력해주세요." />
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
					</li>

					<!-- nick-name -->
					<li class="signup_body_li">
						<valid rules="required" v-slot="{ errors }">
							<p class="signup_title">닉네임</p>
							<input class="signup_input" type="text" v-model="nickName" placeholder="📌 닉네임을 입력해주세요." />
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
					</li>

					<!-- email -->
					<li class="signup_body_li">
						<valid rules="email|required" v-slot="{ errors }">
							<p class="signup_title">이메일</p>
							<input class="signup_input" type="text" v-model="email" placeholder="📌 이메일을 입력해주세요." />
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
					</li>

					<!-- password -->
					<li class="signup_body_li">
						<valid rules="required|min:10|confirmed:confirmation" v-slot="{ errors }">
							<p class="signup_title">비밀번호</p>
							<input
								class="signup_input signup_input--passwd"
								type="password"
								v-model="password"
								placeholder="📌 비밀번호(10자리 이상)를 입력해주세요."
							/>
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
						<valid vid="confirmation" v-slot="{ errors }">
							<input
								class="signup_input"
								type="password"
								v-model="rePassword"
								placeholder="비밀번호를 한번더 입력해주세요."
							/>
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
					</li>

					<!-- agreements -->
					<li class="signup_body_li">
						<p class="signup_title">서비스약관에 동의해주세요</p>
						<ul class="signup_agree_ul">
							<li class="signup_agree_li signup_agree_li--all">
								<button class="signup_agree_btn signup_agree_btn--all">
									<!-- TODO signup_agree_icon--ok동적바인딩 -->
									<i class="fas fa-check-circle signup_agree_icon"></i>
									모두 동의합니다.
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn">
									<i class="fas fa-check-circle signup_agree_icon"></i>
									만 14세 이상입니다.<span class="signup_agree_must"> (필수)</span>
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn">
									<i class="fas fa-check-circle signup_agree_icon"></i>
									<router-link to="/" class="signup_agree_link">서비스 이용약관</router-link>에 동의합니다.
									<span class="signup_agree_must"> (필수)</span>
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn">
									<i class="fas fa-check-circle signup_agree_icon"></i>
									<router-link to="/" class="signup_agree_link">개인정보 수집/이용</router-link>에 동의합니다.
									<span class="signup_agree_must"> (필수)</span>
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn">
									<i class="fas fa-check-circle signup_agree_icon"></i>
									이벤트 할인 혜택 알림 수신에 동의합니다.<span> (선택)</span>
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn">
									<i class="fas fa-check-circle signup_agree_icon"></i>
									장기 미접속 시 계정 활성 상태 유지합니다.<span> (선택)</span>
								</button>
							</li>
						</ul>
					</li>

					<!-- btn -->
					<!-- TODO signup_btn-signup--ok동적바인딩 -->
					<li class="signup_body_li">
						<button class="signup_btn-signup" @click="signup">가입완료</button>
					</li>
				</ul>
			</validObserver>
			<p class="signup_footer">© 2021 By Superpil-김경필. ALL RIGHTS RESERVED.</p>
		</div>
	</div>
</template>

<script>
import { apiSignup } from "@/api/user/user";

export default {
	data() {
		return {
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
