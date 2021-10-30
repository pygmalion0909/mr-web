<template>
	<div>
		<!-- store img -->
		<div class="relative mb-10">
			<!-- @TODO component로 분리 -->
			<swiper :options="options" class="mySwiper">
				<swiper-slide>
					<div class="h-96">
						<img class="h-full w-full rounded-lg" src="@/assets/images/test1.jpg" alt="" />
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="h-96">
						<img class="h-full w-full rounded-lg" src="@/assets/images/test2.jpg" alt="" />
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="h-96">
						<img class="h-full w-full rounded-lg" src="@/assets/images/test3.jpg" alt="" />
					</div>
				</swiper-slide>
			</swiper>
			<!-- 이전,다음 버튼 -->
			<div class="s-home-tickets__control">
				<a href="#" class="btn-prev">Prev</a>
				<a href="#" class="btn-next">Next</a>
			</div>
			<!-- dot네비게이션 -->
			<div class="s-paging-1 s-home-tickets__paging" slot="pagination">
				<a href="#" class="selected">1</a>
				<a href="#">2</a>
				<a href="#">3</a>
			</div>
		</div>

		<!-- store Info -->
		<Dropdown :tabList="tabList" @selectTab="selectTab"></Dropdown>
		<StoreHome v-if="tabContents === commonCd.stHome"></StoreHome>
		<StoreReview v-if="tabContents === commonCd.stReview"></StoreReview>

		<!-- 문의하기 -->
		<div class="border-gray-400 border-t border-b mt-3 mb-24 py-2 grid grid-cols-10 gap-1">
			<span class="bg-red-500 col-span-1 inline-block w-9 h-9 rounded-full justify-self-center"></span>
			<textarea class="bg-gray-50 col-span-7 w-full h-7 align-bottom" type="text" placeholder="사장님에게 문의하기" />
			<button
				class="bg-indigo-500 text-white col-span-2 w-full h-full max-h-10 rounded-md hover:bg-indigo-600"
				@click="nextVer"
			>
				문의하기
			</button>
		</div>

		<!-- router -->
		<router-view></router-view>
	</div>
</template>

<script>
import Dropdown from "@/components/user/Dropdown";
import { alertNext } from "@/utils/nextV";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { apiGetCommonCdList } from "@/api/user/common";
import { COMMON_C } from "@/utils/const";
import StoreHome from "@/views/user/store/components/StoreHome";
import StoreReview from "@/views/user/store/components/StoreReview";
import "swiper/css/swiper.css";
/**
 * @TODO
 * 1. 사진 요청(이미지 슬라이드)
 * 1. 탭메뉴(store기본정보) 데이터 채우기
 * 1. 사장님에게 문의하기
 */
// import { apiGetStoreInfo, apiGetReservationTime, apiGetItem } from "@/api/user/store";

export default {
	components: {
		Dropdown,
		StoreHome,
		StoreReview,
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
			storeId: this.$route.params.storeId,
			storeDatas: "",
			isReservation: false,
			reservationDay: "",
			workTimeDatas: "",
			itemDatas: "",
			selectTime: "",
			// swiper
			options: {
				effect: "coverflow",
				grabCursor: true,
				centeredSlides: true,
				coverflowEffect: {
					rotate: 10,
					stretch: -20,
					depth: 100,
					modifier: 3,
					slideShadows: true,
				},
				spaceBetween: 0, // 슬라이드끼리 간격
				initialSlide: 1, // 시작 슬라이드 index 설정(0부터 시작)
				breakpoints: {
					350: {
						slidesPerView: 1,
					},
					480: {
						slidesPerView: 2,
					},
					640: {
						slidesPerView: 3,
					},
				},
				pagination: {
					el: ".s-home-tickets__paging",
					clickable: true,
				},
				navigation: {
					prevEl: ".btn-prev",
					nextEl: ".btn-next",
				},
			},
			// tab
			tabList: null,
			tabContents: null,
			// common
			commonCd: COMMON_C,
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
		setThumbsSwiper(swiper) {
			this.thumbsSwiper = swiper;
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
		selectTab(objVal) {
			this.tabContents = objVal.cd;
		},
		nextVer() {
			alertNext("2.0");
		},
	},
};
</script>

<style>
.store-rv__tab::after {
	content: "";
	background: rgba(79, 70, 229, var(--tw-text-opacity));
	width: 100%;
	height: 3px;
	display: block;
}
/* swiper */
.s-paging-1 {
	display: flex;
	align-self: center;
}
.s-paging-1 a,
.s-paging-1 span {
	width: 9px;
	height: 7px;
	font-size: 0;
	line-height: 0;
	background-color: rgba(59, 130, 246, 0.5);
	border-radius: 3px;
	opacity: 1;
	transition: width 0.25s cubic-bezier(0, 0, 0.2, 1);
}
.s-paging-1 a + a,
.s-paging-1 span + span {
	margin-left: 8px;
}
.s-paging-1 a.selected,
.s-paging-1 span.swiper-pagination-bullet-active {
	width: 20px;
	background-color: rgb(39, 119, 248);
	border-color: #000;
	pointer-events: none;
}
.s-home-tickets__paging {
	padding-top: 12px;
	justify-content: center;
}
/* 버튼 */
.s-home-tickets__control a {
	background: #aaa8a86e;
	border-radius: 50%;
	position: absolute;
	top: 50%;
	display: block;
	width: 42px;
	height: 42px;
	margin-top: -21px;
	font-size: 0;
	line-height: 0;
	color: transparent;
	user-select: none;
	z-index: 100;
}
.s-home-tickets__control a:hover {
	background: #aaa8a8;
}
.s-home-tickets__control a:before {
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	width: inherit;
	height: inherit;
	background: url("~@/assets/icons/icon-arrow-right.svg") 0 0/42px no-repeat;
}
.s-home-tickets__control a.btn-prev {
	left: 0;
}
.s-home-tickets__control a.btn-prev:before {
	transform: rotate(180deg);
}
.s-home-tickets__control a.btn-next {
	right: 0;
}
.s-home-tickets__control a.swiper-button-disabled {
	display: none;
}
/* 모바일 버전은 이전,다음 방향키 없음 */
@media (max-width: 460px) {
	.s-home-tickets__control a {
		display: none;
	}
}
</style>
