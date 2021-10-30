<template>
	<div class="notice">
		<div
			class="notice_contents"
			:class="[
				{ 'notice_contents--done': title === NOTICE_TITLE.DONE },
				{ 'notice_contents--noti': title === NOTICE_TITLE.NOTI },
				{ 'notice_contents--war': title === NOTICE_TITLE.WAR },
			]"
		>
			<!-- title -->
			<div class="notice_title">
				<i class="fas fa-check-circle notice_title_icon" v-if="title === NOTICE_TITLE.DONE" style="color: #0080ff"></i>
				<i class="fas fa-bell notice_title_icon" v-if="title === NOTICE_TITLE.NOTI" style="color: #34FF6D "></i>
				<i
					class="fas fa-exclamation-triangle notice_title_icon"
					v-if="title === NOTICE_TITLE.WAR"
					style="color: #e41749"
				></i>
			</div>

			<!-- notice text -->
			<p class="notice_text" v-html="text"></p>

			<!-- btn -->
			<div class="notice_btn-div">
				<button class="notice_btn notice_btn--done" @click="sendResult(true)">확인</button>
				<button class="notice_btn notice_btn--cancel" v-if="type === 'CONFIRM'" @click="sendResult(false)">
					취소
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { NOTICE_TITLE } from "@/utils/const";

export default {
	data() {
		return {
			// store
			type: this.$store.state.notice.type,
			title: this.$store.state.notice.title,
			text: this.$store.state.notice.text,
			result: this.$store.state.notice.result,
			// const
			NOTICE_TITLE: NOTICE_TITLE,
		};
	},
	methods: {
		sendResult(isBoolean) {
			this.result(isBoolean);
			this.$store.commit("setNotice", { isOn: false });
		},
	},
};
</script>
