<template>
	<div class="more-btn" v-if="isNextPage">
		<button class="more-btn_btn" @click="getNextPage">
			More
			<p><i class="fas fa-chevron-circle-down more-btn_btn-icon"></i></p>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		limit: {
			type: Number,
			default: 12,
		},
		offset: {
			type: Number,
			default: 0,
		},
		page: {
			type: Number,
			default: 0,
		},
		total: {
			type: Number,
			default: 0,
		},
	},
	methods: {
		getNextPage() {
			const nextPage = this.page + 1;
			const nextOffset = nextPage * this.limit;
			this.$emit("getNextPage", { offset: nextOffset, page: nextPage });
		},
	},
	computed: {
		isNextPage() {
			let result = true;
			const nextPage = this.page + 1;
			const nextOffset = nextPage * this.limit;
			if (nextOffset >= this.total) result = false;
			return result;
		},
	},
};
</script>
