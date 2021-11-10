<template>
	<div class="sto-index">
		<!-- contents-left -->
		<div class="sto-index_contents sto-index_contents--left">
			<!-- store-img -->
			<StoreImg></StoreImg>

			<!-- name -->
			<div class="sto-index_name-div">
				<p class="sto-index_name-p sto-index_name">몽중헌 반포점</p>
				<p class="sto-index_name-p sto-index_sctor">식당/카페•양식</p>
				<p class="sto-index_name-p sto-index_one-line">
					꿈속의 집으로 당신을 초대합니다. 중요한 순간을 위한 정통 차이니즈 다이닝
				</p>
			</div>

			<!-- nav -->
			<!-- TODO sto-index_nav-active 동적 바인딩 -->
			<ul class="sto-index_nav">
				<li class="sto-index_nav-li">
					<router-link class="sto-index_nav-link sto-index_nav-active" :to="{ name: 'store-home' }">홈</router-link>
				</li>
				<li class="sto-index_nav-li">
					<button class="sto-index_nav-link" @click="noticeNextVersion">아이템</button>
				</li>
				<li class="sto-index_nav-li">
					<button class="sto-index_nav-link" @click="noticeNextVersion">리뷰</button>
				</li>
				<li class="sto-index_nav-li">
					<button class="sto-index_nav-link" @click="noticeNextVersion">뱃지</button>
				</li>
				<li class="sto-index_nav-li">
					<button class="sto-index_nav-link" @click="noticeNextVersion">문의</button>
				</li>
			</ul>

			<!-- store-contents -->
			<div class="sto-index_info">
				<router-view></router-view>
			</div>
		</div>

		<!-- contents-right -->
		<div class="sto-index_contents sto-index_contents--right">
			<!-- reservation list -->
			<ul class="sto-index_mr">
				<li class="sto-index_mr-list">
					<div class="sotre-index_mr-header">
						<p class="sto-index_mr-title"><i class="fas fa-calendar"></i> 날짜 선택</p>
						<button @click="toggleMrTab('isDate')">
							<i
								class="fas fa-chevron-circle-down sto-index_mr-icon"
								:class="{ 'sto-index_mr-icon--on': isMrToggle.isDate }"
							></i>
						</button>
					</div>
					<Calendar v-if="isMrToggle.isDate"></Calendar>
				</li>
				<li class="sto-index_mr-list">
					<div class="sotre-index_mr-header">
						<p class="sto-index_mr-title"><i class="far fa-clock"></i> 시간 선택</p>
						<button @click="toggleMrTab('isTime')">
							<i
								class="fas fa-chevron-circle-down sto-index_mr-icon"
								:class="{ 'sto-index_mr-icon--on': isMrToggle.isTime }"
							></i>
						</button>
					</div>
					<Calendar v-if="isMrToggle.isTime"></Calendar>
				</li>
				<li class="sto-index_mr-list">
					<div class="sotre-index_mr-header">
						<p class="sto-index_mr-title"><i class="fas fa-archive"></i> 아이템 선택</p>
						<button @click="toggleMrTab('isItem')">
							<i
								class="fas fa-chevron-circle-down sto-index_mr-icon"
								:class="{ 'sto-index_mr-icon--on': isMrToggle.isItem }"
							></i>
						</button>
					</div>
				</li>
			</ul>

			<!-- reservation btn -->
			<div class="sto_index_mr-btn-div">
				<button class="sto_index_mr-btn">예약 신청 <i class="fas fa-arrow-circle-right"></i></button>
			</div>
		</div>
	</div>
</template>

<script>
import { apiGetCommonCdList } from "@/api/user/common";
import { NOTICE_TITLE } from "@/utils/const";
import notice from "@/utils/notice";
import Calendar from "@/components/user/Calendar";
import StoreImg from "@/views/user/store/components/StoreImg";
/**
 * @TODO
 * 1. 사진 요청(이미지 슬라이드)
 * 1. 탭메뉴(store기본정보) 데이터 채우기
 * 1. 사장님에게 문의하기
 */
// import { apiGetStoreInfo, apiGetReservationTime, apiGetItem } from "@/api/user/store";

export default {
	components: {
		Calendar,
		StoreImg,
	},
	data() {
		return {
			// boolean
			isMrToggle: {
				isDate: true,
				isTime: false,
				isItem: false,
			},
			// etc
			storeId: this.$route.params.storeId,
			storeDatas: "",
			isReservation: false,
			reservationDay: "",
			workTimeDatas: "",
			itemDatas: "",
			selectTime: "",
		};
	},
	created() {
		this.getStoreInfoCode();
		// this.getStoreInfo();
	},
	methods: {
		async getStoreInfoCode() {
			try {
				const res = await apiGetCommonCdList();
				this.tabList = res.data.data.cmList;
				this.$log.debug("Store Info Code Res : ", res.data.data.cmList);
			} catch (error) {
				this.$log.debug("Store Info CodeERes : ", error);
			}
		},
		async noticeNextVersion() {
			await notice.alert({
				title: NOTICE_TITLE.NOTI,
				text:
					"조금만 기다려주세요😊<br/>해당 서비스는 현재 개발 진행 중 입니다.<br/> 곧 완료 예정이니 조금만 더 기다려주세요.",
			});
		},
		toggleMrTab(target) {
			this.isMrToggle[target] = !this.isMrToggle[target];
		},
		// async getStoreInfo() {
		// 	const res = await apiGetStoreInfo(this.$route.params.storeId);
		// 	console.log("res", res);
		// 	this.storeDatas = res.data.data.list[0];
		// },
		// async showReservationTime(payload) {
		// 	console.log("payload", payload);
		// 	if (payload) this.isReservation = true;
		// 	this.reservationDay = payload.date.date;
		// 	const res = await apiGetReservationTime({ workDayId: 1 });
		// 	console.log("work time res", res);
		// 	this.workTimeDatas = res.data.result;
		// 	const itemRes = await apiGetItem();
		// 	console.log("itemRes res", itemRes);
		// 	this.itemDatas = itemRes.data.result;
		// },
		// makeReservation() {
		// 	console.log("this.selectTime", this.selectTime);
		// },
		// cancel() {
		// 	this.isReservation = false;
		// 	this.selectTime = "";
		// },
	},
};
</script>
