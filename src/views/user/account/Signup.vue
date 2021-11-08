<template>
	<div class="signup">
		<div class="signup_contents">
			<!-- header -->
			<div class="signup_header">
				<router-link to="/" class="signup_header_link-logo">
					<img src="@/assets/icons/logo1.svg" alt="" />
				</router-link>
				<p class="signup_header_title">회원가입</p>
			</div>

			<!-- body -->
			<validObserver ref="validObserver">
				<ul class="signup_body_ul">
					<!-- id -->
					<li class="signup_body_li">
						<valid rules="required" v-slot="{ errors }">
							<p class="signup_title">아이디</p>
							<input
								class="signup_input"
								:class="{ 'signup_input--dupl': isDupl.loginId }"
								type="text"
								v-model="loginId"
								@blur="checkDupl('loginId', '아이디')"
								placeholder="📌 아이디를 입력해주세요."
							/>
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
					</li>

					<!-- nick-name -->
					<li class="signup_body_li">
						<valid rules="required" v-slot="{ errors }">
							<p class="signup_title">닉네임</p>
							<input
								class="signup_input"
								:class="{ 'signup_input--dupl': isDupl.nickName }"
								type="text"
								v-model="nickName"
								@blur="checkDupl('nickName', '닉네임')"
								placeholder="📌 닉네임을 입력해주세요."
							/>
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
					</li>

					<!-- email -->
					<li class="signup_body_li">
						<valid rules="email|required" v-slot="{ errors }">
							<p class="signup_title">이메일</p>
							<input
								class="signup_input"
								:class="{ 'signup_input--dupl': isDupl.email }"
								type="text"
								v-model="email"
								@blur="checkDupl('email', '이메일')"
								placeholder="📌 이메일을 입력해주세요."
							/>
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
					</li>

					<!-- password -->
					<li class="signup_body_li">
						<valid rules="required|passwdPattern|confirmed:confirmation" v-slot="{ errors }">
							<p class="signup_title">비밀번호</p>
							<input
								class="signup_input signup_input--passwd"
								type="password"
								v-model="passwd"
								placeholder="📌 비밀번호를 입력해주세요."
							/>
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
						<valid vid="confirmation" v-slot="{ errors }">
							<input
								class="signup_input"
								type="password"
								v-model="rePasswd"
								placeholder="비밀번호를 동일하게 입력해주세요."
							/>
							<p class="signup_error">{{ errors[0] }}</p>
						</valid>
					</li>

					<!-- agreements -->
					<li class="signup_body_li">
						<p class="signup_title">서비스약관에 동의해주세요</p>
						<ul class="signup_agree_ul">
							<li class="signup_agree_li signup_agree_li--all">
								<button class="signup_agree_btn signup_agree_btn--all" @click="setAllAgree">
									<i class="fas fa-check-circle signup_agree_icon" :class="{ 'signup_agree_icon--ok': isAllAgree }"></i>
									모두 동의합니다.
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn" @click="isAgree.isAge = !isAgree.isAge">
									<i
										class="fas fa-check-circle signup_agree_icon"
										:class="{ 'signup_agree_icon--ok': isAgree.isAge }"
									></i>
									만 14세 이상입니다.<span class="signup_agree_must"> (필수)</span>
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn" @click="isAgree.isService = !isAgree.isService">
									<i
										class="fas fa-check-circle signup_agree_icon"
										:class="{ 'signup_agree_icon--ok': isAgree.isService }"
									></i>
									<router-link to="/" class="signup_agree_link">서비스 이용약관</router-link>에 동의합니다.
									<span class="signup_agree_must"> (필수)</span>
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn" @click="isAgree.isPerson = !isAgree.isPerson">
									<i
										class="fas fa-check-circle signup_agree_icon"
										:class="{ 'signup_agree_icon--ok': isAgree.isPerson }"
									></i>
									<router-link to="/" class="signup_agree_link">개인정보 수집/이용</router-link>에 동의합니다.
									<span class="signup_agree_must"> (필수)</span>
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn" @click="isAgree.isEvent = !isAgree.isEvent">
									<i
										class="fas fa-check-circle signup_agree_icon"
										:class="{ 'signup_agree_icon--ok': isAgree.isEvent }"
									></i>
									이벤트 할인 혜택 알림 수신에 동의합니다.<span> (선택)</span>
								</button>
							</li>
							<li class="signup_agree_li">
								<button class="signup_agree_btn" @click="isAgree.isActive = !isAgree.isActive">
									<i
										class="fas fa-check-circle signup_agree_icon"
										:class="{ 'signup_agree_icon--ok': isAgree.isActive }"
									></i>
									장기 미접속 시 계정 활성 상태 유지합니다.<span> (선택)</span>
								</button>
							</li>
						</ul>
					</li>

					<!-- btn -->
					<li class="signup_body_li">
						<button class="signup_btn-signup" @click="signup">가입완료</button>
					</li>
				</ul>
			</validObserver>

			<!-- footer -->
			<p class="signup_footer">© 2021 By Superpil-김경필. ALL RIGHTS RESERVED.</p>
		</div>
	</div>
</template>

<script>
import { apiSignup, apiCheckUserDuplication } from "@/api/user/user";
import { NOTICE_TITLE, ERR_CD } from "@/utils/const";
import errHandler from "@/utils/errHandler";
import notice from "@/utils/notice";

export default {
	data() {
		return {
			loginId: "",
			nickName: "",
			passwd: "",
			email: "",
			rePasswd: "",
			// boolean
			isAgree: {
				isAge: false,
				isService: false,
				isPerson: false,
				isEvent: false,
				isActive: false,
			},
			isDupl: {
				loginId: false,
				nickName: false,
				email: false,
			},
			isAllAgree: false,
		};
	},
	methods: {
		async checkDupl(cd, text) {
			try {
				if (!this[cd] || !this[cd].trim()) return;
				await apiCheckUserDuplication({ [cd]: this[cd] });
				this.isDupl[cd] = false;
			} catch (error) {
				switch (error.response.data.errCd) {
					case ERR_CD.DUPL:
						await notice.alert({
							title: NOTICE_TITLE.WAR,
							text: `이미 가입된 ${text} 입니다.<br/>다시 입력해 주세요.`,
						});
						this.isDupl[cd] = true;
						break;
					case ERR_CD.VALID:
						break;
					default:
						await errHandler.common(error);
				}
			}
		},
		async signup() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate()) || !this.checkMustAgree()) {
					return await notice.alert({ title: NOTICE_TITLE.WAR, text: "가입 필수항목(📌)을 작성해주세요.🙏" });
				}
				// check duplication
				if (this.isDupl.loginId || this.isDupl.nickName || this.isDupl.email) {
					return await notice.alert({
						title: NOTICE_TITLE.WAR,
						text: "중복된 항목이 있습니다.<br/>확인 후 다시 시도해주세요.",
					});
				}

				const payload = {
					loginId: this.loginId,
					nickName: this.nickName,
					email: this.email,
					passwd: this.passwd,
				};

				this.$store.commit("onSpinner");
				await apiSignup(payload);
				this.$store.commit("offSpinner");
				await notice.alert({
					title: NOTICE_TITLE.NOTI,
					text: "가입한 이메일로 인증번호가 발송되었습니다.<br/>인증을 통해 회원가입을 완료해주세요.",
				});

				this.$router.push({ name: "signupAppro", query: { loginId: this.loginId } });
				this.init();
			} catch (error) {
				await errHandler.common(error);
			}
		},
		setAllAgree() {
			let isValue = true;
			this.isAllAgree ? (isValue = false) : (isValue = true);
			for (const key in this.isAgree) {
				this.isAgree[key] = isValue;
				this.isAllAgree = isValue;
			}
		},
		checkMustAgree() {
			if (!this.isAgree.isAge || !this.isAgree.isService || !this.isAgree.isPerson) return false;
			return true;
		},
		init() {
			this.loginId = "";
			this.nickName = "";
			this.passwd = "";
			this.email = "";
			this.rePasswd = "";
		},
	},
	watch: {
		isAgree: {
			deep: true,
			handler(val) {
				let trueCount = 0;
				for (const key in val) {
					if (this.isAgree[key]) trueCount++;
				}
				trueCount >= Object.keys(this.isAgree).length ? (this.isAllAgree = true) : (this.isAllAgree = false);
			},
		},
	},
};
</script>
