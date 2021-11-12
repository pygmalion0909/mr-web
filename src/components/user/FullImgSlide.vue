<template>
	<div class="full-img">
		<!-- close btn -->
		<button class="full-img_cancel-btn" @click="closeFullImg"><i class="fas fa-times"></i></button>

		<!-- img-list -->
		<div class="full-img_div">
			<swiper :options="options" class="full-img_swiper">
				<swiper-slide v-for="item in basImgs" :key="item.id">
					<div class="full-img_list">
						<img class="full-img_img" :src="item" alt="" />
					</div>
				</swiper-slide>
			</swiper>

			<!-- prev, next btn -->
			<div class="full-img_btn-div">
				<button class="img-full_btn img-full_btn--prev"><i class="fas fa-chevron-left"></i></button>
				<button class="img-full_btn img-full_btn--next"><i class="fas fa-chevron-right"></i></button>
			</div>
		</div>
	</div>
</template>

<script>
import "swiper/css/swiper.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
	props: {
		basImgs: {
			type: Array,
			default: null,
		},
	},
	components: {
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
			// swiper
			options: {
				centeredSlides: true,
				spaceBetween: 1, // 슬라이드끼리 간격
				initialSlide: 0, // 시작 슬라이드 index 설정(0부터 시작)
				navigation: {
					prevEl: ".img-full_btn--prev", // 슬라이드 버튼 target지정(이전)
					nextEl: ".img-full_btn--next", // 슬라이드 버튼 target지정(다음)
				},
			},
		};
	},
	methods: {
		closeFullImg() {
			this.$emit("closeFullImg", false);
		},
	},
};
</script>
