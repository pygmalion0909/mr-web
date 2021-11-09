<template>
	<div>
		<validObserver ref="validObserver">
			<ul class="account_ul">
				<li class="account_li">
					<valid rules="required|email" v-slot="{ errors }">
						<input class="account_input" type="text" v-model="email" placeholder="📌 이메일을 입력해주세요." />
						<p class="account_error">{{ errors[0] }}</p>
					</valid>
				</li>
			</ul>
		</validObserver>
		<div class="search-id_btn-div">
			<button class="search-id_btn" @click="searchLoginId">찾기</button>
		</div>
	</div>
</template>

<script>
import errHandler from "@/utils/errHandler";
import notice from "@/utils/notice";
import { apiSearchLoginId } from "@/api/user/auth";
import { NOTICE_TITLE } from "@/utils/const";

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
				if (!(await this.$refs.validObserver.validate())) {
					return await notice.alert({ title: NOTICE_TITLE.WAR, text: "필수항목(📌)을 확인해주세요.🙏" });
				}

				const res = await apiSearchLoginId({ email: this.email });
				await notice.alert({
					title: NOTICE_TITLE.DONE,
					text:
						"입력하신 이메일에서 아이디를 확인 할 수 있습니다.</br>만약, 메일이 없다면 스팸메일 보관함도 확인해주세요.",
				});
				this.$log.info("Search Login Id Res : ", res);
			} catch (error) {
				await errHandler.common(error);
				this.$log.info("Search Login Id E : ", error);
			}
		},
	},
};
</script>
