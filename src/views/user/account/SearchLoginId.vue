<template>
	<div class="signin">
		<!-- <div class="signin_title">
			<h2 class="signin_title_h2">Search Login ID</h2>
		</div>
		<validObserver ref="validObserver">
			<ul class="signin_ul">
				<li class="signin_li">
					<valid rules="email|required" v-slot="{ errors }">
						<input class="signin_text" type="text" v-model="email" placeholder="📌 이메일" />
						<p class="signin_error">{{ errors[0] }}</p>
					</valid>
				</li>
			</ul>
		</validObserver>
		<div class="signin_btn-div">
			<button class="signin_btn" @click="searchLoginId">
				확인
			</button>
		</div> -->
	</div>
</template>

<script>
import { apiSearchLoginId } from "@/api/user/user";

export default {
	data() {
		return {
			email: "",
		};
	},
	created() {},
	methods: {
		async searchLoginId() {
			try {
				// check valid
				if (!(await this.$refs.validObserver.validate())) return alert("필수항목(📌)을 작성해주세요.🙏");

				const payload = {
					role: this.role,
					email: this.email,
				};
				await apiSearchLoginId(payload);
				alert("입력하신 이메일에서 로그인ID를 확인 해주세요.");
				this.$router.push({ name: "signin" });
			} catch (e) {
				console.log("Search LoginId E : ", e.response);
				if (e.response.data.code === "2") alert("가입하신 정보를 찾을 수 없습니다.");
			}
		},
	},
};
</script>
