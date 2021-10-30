<template>
	<div>
		<div>
			<h2 class="text-indigo-500 text-5xl mb-10 font-nB">Search Login ID</h2>
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
					<valid rules="email|required" v-slot="{ errors }">
						<input class="signup__text" type="text" v-model="email" placeholder="📌 이메일" />
						<p class="signup__valid-error">{{ errors[0] }}</p>
					</valid>
				</li>
			</ul>
		</validObserver>
		<div class="signup__btn-div">
			<button class="signup__btn signup__btn--signup bg-indigo-500 hover:bg-indigo-600" @click="searchLoginId">
				확인
			</button>
		</div>
	</div>
</template>

<script>
import { apiSearchLoginId } from "@/api/user/user";
import { ROLE } from "@/utils/const";

export default {
	data() {
		return {
			role: ROLE.use,
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
