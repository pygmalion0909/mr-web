<template>
	<div class="report-detail">
		<!-- nav -->
		<ul class="report-detail_nav">
			<li class="report-detail_nav-li">
				<router-link :to="{ name: 'home' }" class="report-detail_nav-link">Home</router-link>
				<i class="fas fa-angle-right report-detail_nav-link"></i>
				<router-link :to="{ name: 'report-list' }" class="report-detail_nav-link">공지사항</router-link>
			</li>
		</ul>

		<!-- header -->
		<ul class="report-detail_header">
			<li class="report-detail_header-li">
				<span class="report-detail_category" :style="`background:${detailDatas.color}`">{{ detailDatas.name }}</span>
				<span class="report-detail_date">{{ detailDatas.date }}</span>
			</li>
			<li class="report-detail_title">{{ detailDatas.title }}</li>
		</ul>

		<!-- contents -->
		<div class="report-detail_contents-div">
			<p class="report-detail_contents" v-html="detailDatas.contents"></p>
		</div>

		<!-- sub-contents -->
		<ul class="report-detail_sub-contents">
			<li>
				<router-link :to="{ name: 'report-list', query: { offset: this.offset } }" class="report-detail_back">
					목록
				</router-link>
			</li>
			<li>
				<button @click="changeArticle('PREV')" class="report-detail_prev-link" v-if="detailDatas.prevId">
					<i class="fas fa-caret-square-left report-detail_prev-contents"></i> 이전글
				</button>
				<button @click="changeArticle('NEXT')" class="report-detail_next-link" v-if="detailDatas.nextId">
					다음글 <i class="fas fa-caret-square-right report-detail_next-contents"></i>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import errHandler from "@/utils/errHandler";
import { apiGetReportDetail } from "@/api/user/report";
import { setReportStyleType } from "@/utils/common";

export default {
	data() {
		return {
			// datas
			detailDatas: "",
			reportId: this.$route.query.id,
			// pageing
			offset: this.$route.query.offset,
		};
	},
	created() {
		this.getReportDetail();
	},
	methods: {
		async getReportDetail() {
			try {
				this.$store.commit("onSpinner");

				const res = await apiGetReportDetail(this.reportId);
				this.detailDatas = res.data.data.info;
				setReportStyleType(this.detailDatas);

				this.$store.commit("offSpinner");
				this.$log.info("Get Report Detail Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		changeArticle(id) {
			if (!id) return;
			this.reportId = id === "NEXT" ? this.detailDatas.nextId : this.detailDatas.prevId;
			this.getReportDetail();
		},
	},
};
</script>
