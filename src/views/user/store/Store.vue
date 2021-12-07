<template>
	<div class="sto-index">
		<!-- contents-left -->
		<div class="sto-index_contents sto-index_contents--left">
			<!-- store-img -->
			<StoreImg v-if="basImgs" :basImgs="basImgs"></StoreImg>

			<!-- name -->
			<div class="sto-index_name-div">
				<p class="sto-index_name-p sto-index_name">{{ storeBasInfo.name }}</p>
				<p class="sto-index_name-p sto-index_sctor">{{ storeBasInfo.sectorName }} • {{ storeBasInfo.subSectorName }}</p>
				<p class="sto-index_name-p sto-index_one-line">{{ storeBasInfo.oneLineIntro }}</p>
			</div>

			<!-- nav -->
			<!-- TODO sto-index_nav-active 동적 바인딩 -->
			<ul class="sto-index_nav">
				<li class="sto-index_nav-li">
					<button class="sto-index_nav-link sto-index_nav-active">홈</button>
				</li>
				<li class="sto-index_nav-li">
					<button class="sto-index_nav-link" @click="nextV.item">아이템</button>
				</li>
				<li class="sto-index_nav-li">
					<button class="sto-index_nav-link" @click="nextV.review">리뷰</button>
				</li>
				<li class="sto-index_nav-li">
					<button class="sto-index_nav-link" @click="nextV.stoBadge">뱃지</button>
				</li>
				<li class="sto-index_nav-li">
					<button class="sto-index_nav-link" @click="nextV.request">문의</button>
				</li>
			</ul>

			<!-- store detail -->
			<div class="sto-index_info">
				<router-view></router-view>
			</div>
		</div>

		<!-- contents-right -->
		<div class="sto-index_contents sto-index_contents--right">
			<RsvContract></RsvContract>
		</div>
	</div>
</template>

<script>
import { apiGetStoreBasImgs } from "@/api/user/store";
import { NOTICE_TITLE } from "@/utils/const";
import nextV from "@/utils/nextV";
import errHandler from "@/utils/errHandler";
import notice from "@/utils/notice";
import StoreImg from "@/views/user/store/components/StoreImg";
import RsvContract from "@/views/user/store/components/RsvContract";

export default {
	components: {
		StoreImg,
		RsvContract,
	},
	data() {
		return {
			// datas
			storeId: this.$route.params.storeId,
			basImgs: "",
			storeBasInfo: "",
			// nextV
			nextV: nextV,
		};
	},
	created() {
		this.getStoreBasImgs();
	},
	methods: {
		async getStoreBasImgs() {
			try {
				const res = await apiGetStoreBasImgs(this.storeId);
				this.basImgs = res.data.data.list;
				this.$log.info("Get Store Bas Imgs Res: ", res.data.data);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		async noticeNextVersion() {
			await notice.alert({
				title: NOTICE_TITLE.NOTI,
				text: "조금만 기다려주세요😊<br/>해당 서비스는 현재 개발 진행 중 입니다.<br/>감사합니다.",
			});
		},
	},
	computed: {
		getStoreBasInfo() {
			return this.$store.state.storeBasInfo;
		},
	},
	watch: {
		getStoreBasInfo(val) {
			this.storeBasInfo = val;
		},
	},
};
</script>
