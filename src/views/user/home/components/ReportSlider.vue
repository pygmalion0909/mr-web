<template>
	<ul class="home_report">
		<li class="home_report_li home_report_li--icon">
			<router-link :to="{ name: 'report-list' }">
				<i class="fas fa-volume-up home_report-icon"></i>
			</router-link>
		</li>
		<li class="home_report_li home_report_li--swiper">
			<swiper :options="options" class="home_report_swiper">
				<swiper-slide v-for="item in reportDatas" :key="item.id">
					<router-link :to="{ name: 'report-detail', query: { id: item.id } }" class="home_report_item-link">
						<span class="home_report-category" :style="`background:${item.color}`">{{ item.name }}</span>
						{{ item.title }}
					</router-link>
				</swiper-slide>
			</swiper>
		</li>
		<li class="home_report_li home_report_li--btn">
			<button class="home_report_btn home_report_btn--up"><i class="fas fa-angle-up"></i></button>
			<button class="home_report_btn home_report_btn--down"><i class="fas fa-angle-down"></i></button>
		</li>
	</ul>
</template>

<script>
import "swiper/css/swiper.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { apiGetReportDisplay } from "@/api/user/report";
import { setReportStyleTypeList } from "@/utils/common";
import errHandler from "@/utils/errHandler";

export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
			// datas
			reportDatas: "",
			// swiper
			options: {
				slidesToShow: 1,
				direction: "vertical",
				autoplay: {
					delay: 2000, // 자동플레이 시간
					disableOnInteraction: false, // 페이지 버튼 클릭 후 자동플레이 멈춤 막기
				},
				autoplaySpeed: 500, // 자동슬라이드 시간
				loop: true, // 무한반복
				allowTouchMove: false, // 드래그 이동off
				spaceBetween: 1, // 슬라이드끼리 간격
				navigation: {
					prevEl: ".home_report_btn--up", // 슬라이드 버튼 target지정(위)
					nextEl: ".home_report_btn--down", // 슬라이드 버튼 target지정(아래)
				},
				slidesPerView: 1, // 한번에 노출되는 슬라이더 개수
			},
		};
	},
	created() {
		this.getReportDisplay();
	},
	methods: {
		async getReportDisplay() {
			try {
				const res = await apiGetReportDisplay();
				this.reportDatas = res.data.data.list;
				setReportStyleTypeList(this.reportDatas);
				this.$log.info("Get Report Display Res : ", res.data.data);
			} catch (error) {
				await errHandler.common(error);
			}
		},
	},
};
</script>
