<template>
	<div class="sto-home">
		<table class="sto-home_table">
			<tr class="sto-home_tr">
				<td><i class="fas fa-phone-square sto-home_icon"></i></td>
				<td class="sto-home_td">{{ infoDatas.number }}</td>
			</tr>
			<tr class="sto-home_tr">
				<td><i class="fas fa-map-marker-alt sto-home_icon"></i></td>
				<td class="sto-home_td">{{ infoDatas.address }}</td>
			</tr>
			<tr class="sto-home_tr">
				<td><i class="far fa-clock sto-home_icon"></i></td>
				<td class="sto-home_td">
					<p>평일 {{ infoDatas.wdStWkTm }} - {{ infoDatas.wdEdWkTm }}</p>
					<p>주말 {{ infoDatas.weStWkTm }} - {{ infoDatas.weEdWkTm }}</p>
				</td>
			</tr>
			<tr class="sto-home_tr">
				<td><i class="far fa-file-alt sto-home_icon"></i></td>
				<td class="sto-home_td" v-html="infoDatas.notice"></td>
			</tr>
			<tr class="sto-home_tr">
				<td><i class="fas fa-link sto-home_icon"></i></td>
				<td class="sto-home_td">
					<a :href="`https://${infoDatas.url}`" target="_blank">{{ infoDatas.url }}</a>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import { apiGetStoreBasInfo } from "@/api/user/store";
import errHandler from "@/utils/errHandler";

export default {
	data() {
		return {
			// route
			storeId: this.$route.params.storeId,
			// datas
			infoDatas: "",
		};
	},
	created() {
		this.getStoreBasInfo();
	},
	methods: {
		async getStoreBasInfo() {
			try {
				const res = await apiGetStoreBasInfo(this.storeId);
				this.infoDatas = res.data.data.info;
				this.$store.state.storeBasInfo = res.data.data.info;
				this.$log.info("Get Store Bas Info Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
	},
};
</script>
