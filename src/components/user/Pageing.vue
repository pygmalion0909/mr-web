<template>
	<div class="page_nav">
		<template v-if="beginPage != 1">
			<!-- 맨앞 -->
			<button class="page_nav-btn page_nav-arrow" @click.prevent="$emit('changePage', toOffset(1), 1)">
				<i class="fas fa-angle-double-left"></i>
			</button>

			<!-- 이전 -->
			<button
				class="page_nav-btn page_nav-arrow"
				@click.prevent="$emit('changePage', toOffset(beginPage - 1), beginPage - 1)"
			>
				<i class="fas fa-angle-left"></i>
			</button>
		</template>

		<span class="page_nav-box" v-for="index in pageRange" :key="index">
			<button class="page_nav-btn eq-page" v-if="pageNo == index">{{ index }}</button>
			<button class="page_nav-btn" v-else :key="index" @click.prevent="$emit('changePage', toOffset(index), index)">
				{{ index }}
			</button>
		</span>

		<template v-if="endPage != totalPage">
			<!-- 다음 -->
			<button
				class="page_nav-btn page_nav-arrow"
				@click.prevent="$emit('changePage', toOffset(endPage + 1), endPage + 1)"
			>
				<i class="fas fa-angle-right"></i>
			</button>

			<!-- 맨끝 -->
			<button class="page_nav-btn page_nav-arrow" @click.prevent="$emit('changePage', toOffset(totalPage), totalPage)">
				<i class="fas fa-angle-double-right"></i>
			</button>
		</template>
	</div>
</template>

<script>
module.exports = {
	props: {
		offset: {
			type: Number,
			default: 0,
		},
		total: {
			type: Number,
			default: 0,
		},
		limit: {
			type: Number,
			default: 10,
		},
		size: {
			type: Number,
			default: 5,
		},
	},
	computed: {
		beginPage: function() {
			return this.pageIndex * this.size + 1;
		},
		endPage: function() {
			return Math.min((this.pageIndex + 1) * this.size, this.totalPage);
		},
		pageIndex: function() {
			return parseInt((this.pageNo - 1) / this.size);
		},
		totalPage: function() {
			return Math.ceil(this.total / this.limit);
		},
		pageNo: function() {
			return this.offset / this.limit + 1;
		},
		pageRange: function() {
			let ret = [];
			for (let i = this.beginPage; i <= this.endPage; ++i) ret.push(i);
			return ret;
		},
	},
	methods: {
		toOffset: function(pageNo) {
			return this.limit * (pageNo - 1);
		},
	},
};
</script>

<style></style>
