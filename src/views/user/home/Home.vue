<template>
	<div class="home">
		<!-- header -->
		<ul class="home_header">
			<li class="home_header_li home_header_li--report">
				<ReportSlider></ReportSlider>
			</li>
			<li class="home_header_li home_header_li--search">
				<button class="home_search_btn" @click="isSearchArea = !isSearchArea">
					<span class="home_search_text">상세검색</span>
					<i class="fas fa-chevron-circle-down home_search_i" :class="{ 'home_search_i--rotate': isSearchArea }"></i>
				</button>
			</li>
		</ul>

		<!-- search component -->
		<transition name="home_search_area--tran">
			<SearchStore :isSearchArea="isSearchArea" @sendSearchItem="setSearchItem"></SearchStore>
		</transition>

		<!-- store list -->
		<ul class="home_store" v-if="storeDatas.length > 0">
			<li class="home_store_li" v-for="item in storeDatas" :key="item.id">
				<!-- store img -->
				<button class="home_store_img-link" @click="goDetailStore(item)">
					<img class="home_store_img" :src="item.imgUrl" alt="가게이미지" />
				</button>

				<!-- store fnc -->
				<ul class="home_store_fnc">
					<li>
						<button @click="showBadge(item)"><i class="fas fa-certificate home_store_fnc-icon"></i></button>
					</li>
					<li>
						<button @click="nextV.bookmark"><i class="far fa-bookmark home_store_fnc-icon"></i></button>
					</li>
				</ul>

				<!-- store title -->
				<h2>
					<button class="home_store_name" @click="goDetailStore(item)">
						{{ item.name }}
					</button>
					<span class="home_store_sct">{{ item.sectorName }}</span>
				</h2>

				<!-- store contents -->
				<div class="home_store_contents">
					<table>
						<tr>
							<td><i class="fas fa-phone-square home_store_number-icon"></i></td>
							<td>{{ item.number }}</td>
						</tr>
						<tr>
							<td><i class="fas fa-map-marker-alt home_store_address-icon"></i></td>
							<td>{{ item.address }}</td>
						</tr>
					</table>
				</div>

				<!-- show badge -->
				<div class="home_badge" v-if="showBadgeItem.id === item.id">
					<img class="spinner_img" src="@/assets/images/spinner.svg" v-if="isBadgeSpin" />
					<i class="fas fa-certificate home_badge_icon"></i>
					<router-link class="home_badge_link" :to="{ name: 'home' }">
						BADGE <i class="fas fa-arrow-circle-right home_badge_link-icon"></i>
					</router-link>
					<button class="home_badge_btn" @click="showBadgeItem = ''"><i class="fas fa-times"></i></button>
					<ul class="home_badge_ul">
						<li class="home_badge_none" v-if="badgeDatas.length <= 0">획득한 뱃지가 없습니다.</li>
						<li v-for="item in badgeDatas" :key="item.id">
							<div class="home_badge_li-div" :style="`background:${item.color}`">
								<i :class="item.icon"> {{ item.name }}</i>
								<span class="home_badge_level">{{ item.level }}LV</span>
							</div>
						</li>
					</ul>
				</div>
			</li>
		</ul>

		<!-- none result -->
		<div class="not-found" v-if="storeDatas.length <= 0">
			<i class="fab fa-searchengin not-found_icon"></i>
			<div class="not-foun_text">
				<p>죄송합니다.</p>
				<p>요청하신 정보를 찾을 수 없습니다.</p>
			</div>
		</div>
	</div>
</template>

<script>
import { apiGetStoreList } from "@/api/user/store";
import { apiGetStoreBadgeList } from "@/api/user/badge";
import { setBadgeStyleTypeList } from "@/utils/common";
import SearchStore from "@/views/user/home/components/SearchStore";
import ReportSlider from "@/views/user/home/components/ReportSlider";
import nextV from "@/utils/nextV";
import errHandler from "@/utils/errHandler";

export default {
	components: {
		SearchStore,
		ReportSlider,
	},
	data() {
		return {
			// datas
			storeDatas: "",
			badgeDatas: "",
			// badge
			showBadgeItem: "",
			// boolean
			isSearchArea: false,
			isBadgeSpin: false,
			// pgination
			limit: 12,
			offset: 0,
			total: 0,
			// search
			searchItem: {
				search: "",
				sectorCd: "",
				subSectorCd: "",
				badgeCd: "",
				areaSiCd: "",
				areaGuCd: "",
			},
			nextV: nextV,
		};
	},
	created() {
		this.getStoreList();
		window.addEventListener("scroll", this.handleScroll);
	},
	destroyed() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		async getStoreList() {
			try {
				const payload = {
					...this.searchItem,
					limit: this.limit,
					offset: this.offset,
				};

				this.$store.commit("onSpinner");

				const res = await apiGetStoreList(payload);
				const resData = res.data.data;
				this.total = resData.total;
				this.offset <= 0 ? (this.storeDatas = resData.list) : this.storeDatas.push(...resData.list);

				this.$store.commit("offSpinner");

				this.$log.info("Store List Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		async showBadge(item) {
			try {
				this.badgeDatas = "";
				this.showBadgeItem = item;

				this.isBadgeSpin = true;
				const res = await apiGetStoreBadgeList(item.id);
				this.badgeDatas = res.data.data.list;
				this.$log.info("Get Store Badge List Res : ", res.data.data.list);

				// set badge color
				setBadgeStyleTypeList(this.badgeDatas);

				this.isBadgeSpin = false;
			} catch (error) {
				await errHandler.common(error);
			}
		},
		async handleScroll(event) {
			const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
			if (scrollHeight <= scrollTop + clientHeight + 5 && this.offset + this.limit <= this.total) {
				this.offset += this.limit;
				await this.getStoreList();
			}
		},
		goDetailStore(item) {
			let routeData = this.$router.resolve({ name: "store-home", params: { storeId: item.id } });
			window.open(routeData.href, "_blank");
		},
		setSearchItem(payload) {
			this.storeDatas = [];
			this.offset = 0;

			this.searchItem = payload;
			this.getStoreList();
			this.isSearchArea = false;
		},
	},
};
</script>
