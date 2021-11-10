<template>
	<div class="sto-index_img-div">
		<div class="sto-index_img-part sto-index_img-part--left">
			<img class="sto-index_img" src="@/assets/images/test1.jpg" alt="" @click="isFullImgSlide = true" />
		</div>

		<ul class="sto-index_img-part sto-index_img-part--right">
			<li class="sto-index_img-mini sto-index_img-mini--rt">
				<img class="sto-index_img" src="@/assets/images/test2.jpg" alt="" @click="isFullImgSlide = true" />
			</li>
			<li class="sto-index_img-mini sto-index_img-mini--rb">
				<img class="sto-index_img" src="@/assets/images/test3.jpg" alt="" />
				<div class="sto-index_img-more" @click="isFullImgSlide = true">
					<div class="sto-index_img-more-div">
						<p><i class="fas fa-plus"></i></p>
						<p>더보기</p>
					</div>
				</div>
			</li>
		</ul>

		<!-- store-full-img -->
		<FullImgSlide v-if="isFullImgSlide" @closeFullImg="closeFullImg"></FullImgSlide>
	</div>
</template>

<script>
import FullImgSlide from "@/components/user/FullImgSlide";

export default {
	components: {
		FullImgSlide,
	},
	data() {
		return {
			isFullImgSlide: false,
		};
	},
	methods: {
		closeFullImg(isFalse) {
			this.isFullImgSlide = isFalse;
		},
	},
};
</script>

<style></style>
