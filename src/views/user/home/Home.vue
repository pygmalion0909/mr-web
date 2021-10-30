<template>
	<div class="home">
		<!-- search btn -->
		<div class="home_search">
			<button class="home_search_btn" @click="isSearchArea = !isSearchArea">
				가게 검색
				<i class="fas fa-chevron-circle-down home_search_i" :class="{ 'home_search_i--rotate': isSearchArea }"></i>
			</button>
		</div>

		<!-- search component -->
		<transition name="home_search_area--tran">
			<SearchStore :isSearchArea="isSearchArea" @sendSearchItem="setSearchItem"></SearchStore>
		</transition>

		<!-- store list -->
		<ul class="home_store" v-if="storeDatas.length > 0">
			<li class="home_store_li" v-for="item in storeDatas" :key="item.id">
				<!-- store img -->
				<img class="home_store_img" :src="item.imgUrl" alt="가게이미지" />

				<!-- store fnc -->
				<ul class="home_store_fnc">
					<li>
						<button @click="showBadge(item)"><i class="fas fa-certificate home_store_fnc-icon"></i></button>
					</li>
					<li>
						<button @click="noticeNext"><i class="far fa-bookmark home_store_fnc-icon"></i></button>
					</li>
				</ul>

				<!-- store title -->
				<h2>
					<router-link class="home_store_name" :to="{ name: 'reservationDate', params: { storeId: item.id } }">
						{{ item.name }}
					</router-link>
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
					<img class="spinner_img" src="@/assets/images/spinner.svg" alt="" v-if="isBadgeSpin" />
					<i class="fas fa-certificate home_badge_icon"></i>
					<router-link class="home_badge_link" :to="{ name: 'home' }">
						BADGE <i class="fas fa-arrow-circle-right home_badge_link-icon"></i>
					</router-link>
					<button class="home_badge_btn" @click="showBadgeItem = ''"><i class="fas fa-times"></i></button>

					<ul class="home_badge_ul">
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

		<!-- more -->
		<MoreBtn :limit="limit" :offset="offset" :page="page" :total="total" @getNextPage="getNextPage"></MoreBtn>
	</div>
</template>

<script>
import { apiGetStoreList } from "@/api/user/store";
import { apiGetStoreBadgeList } from "@/api/user/badge";
import { setBadgeStyleTypeList } from "@/utils/common";
import SearchStore from "@/views/user/home/components/SearchStore";
import MoreBtn from "@/components/user/MoreBtn";
import notice from "@/utils/notice";
import { NOTICE_TITLE } from "@/utils/const";

export default {
	components: {
		SearchStore,
		MoreBtn,
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
			// page
			limit: 12,
			offset: 0,
			page: 0,
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
		};
	},
	created() {
		this.getStoreList();
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
				this.page <= 0 ? (this.storeDatas = resData.list) : this.storeDatas.push(...resData.list);

				this.$store.commit("offSpinner");

				this.$log.info("Store List Res : ", res);
			} catch (error) {
				this.$log.info("Get Store List E :", error);
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
				this.$log.info("Get Store Badge List E : ", error);
			}
		},
		getNextPage(payload) {
			this.page = payload.page;
			this.offset = payload.offset;
			this.getStoreList();
		},
		async noticeNext() {
			await notice.alert({
				title: NOTICE_TITLE.NOTI,
				text: "조금만 기다려주세요😊<br/>2.0.0버전에서 서비스를 이용할 수 있습니다.",
			});
		},
		setSearchItem(payload) {
			this.searchItem = payload;
			this.getStoreList();
			this.isSearchArea = false;
		},
	},
};
</script>
