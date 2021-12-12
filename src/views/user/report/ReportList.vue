<template>
	<div class="report-list">
		<!-- list -->
		<ul class="report-list_ul">
			<li class="report-list_li" v-for="item in reportDatas" :key="item.id">
				<router-link
					:to="{ name: 'report-detail', query: { id: item.id, offset: pageing.offset } }"
					class="report-list_link"
				>
					<div class="report-list_date-div">
						<span class="report-list_date report-list_date--year">{{ item.createTms | dateYYYYMM }}</span>
						<span class="report-list_date report-list_date--day">{{ item.createTms | dateDD }}</span>
					</div>
					<div class="report-list_contents-div">
						<p class="report-list_category" :style="`background:${item.color}`">{{ item.name }}</p>
						<p class="report-list_title">{{ item.title }}</p>
						<p class="report-list_contents" v-html="item.shortContents"></p>
					</div>
					<div class="report-list_icon-div">
						<i class="fas fa-arrow-alt-circle-right report-list_icon"></i>
					</div>
				</router-link>
			</li>
		</ul>
		<Pageing
			:total="this.pageing.total"
			:offset="this.pageing.offset"
			:limit="this.pageing.limit"
			@changePage="changePage"
		></Pageing>
	</div>
</template>

<script>
import Pageing from "@/components/user/Pageing";
import dayjs from "dayjs";
import errHandler from "@/utils/errHandler";
import { setReportStyleTypeList } from "@/utils/common";
import { apiGetReportList } from "@/api/user/report";

export default {
	components: {
		Pageing,
	},
	filters: {
		dateYYYYMM(date) {
			return dayjs(date).format("YYYY.MM");
		},
		dateDD(date) {
			return dayjs(date).format("DD");
		},
	},
	data() {
		return {
			// datas
			reportDatas: "",
			// pgination
			pageing: {
				total: 0,
				offset: this.$route.query.offset ? Number(this.$route.query.offset) : 0,
				limit: 10,
			},
		};
	},
	created() {
		this.getReportList();
	},
	methods: {
		async getReportList() {
			try {
				const payload = {
					offset: this.pageing.offset,
					limit: this.pageing.limit,
				};

				this.$store.commit("onSpinner");

				const res = await apiGetReportList(payload);
				this.reportDatas = res.data.data.list;
				this.pageing.total = res.data.data.total;
				setReportStyleTypeList(this.reportDatas);

				this.$store.commit("offSpinner");
				this.$log.info("Get Report Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		changePage(offset) {
			this.pageing.offset = offset;
			this.getReportList();
		},
	},
};
</script>
