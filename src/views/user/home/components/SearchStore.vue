<template>
	<div class="search-store">
		<!-- search list -->
		<div class="search-store_search" v-show="isSearchArea">
			<table class="search-store_table">
				<!-- search -->
				<tr class="search-store_tr">
					<td class="search-store_title">
						<p><i class="fas fa-search search-store_title-icon"></i></p>
						<span>검색어</span>
					</td>
					<td class="search-store_contents">
						<input
							class="search-store_text-input"
							type="text"
							v-model="word"
							placeholder="가게명, 전화번호, 주소로 검색 하세요."
						/>
					</td>
				</tr>

				<!-- sector -->
				<tr class="search-store_tr">
					<td class="search-store_title">
						<p><i class="fas fa-vector-square search-store_title-icon"></i></p>
						<span>업종</span>
					</td>
					<td class="search-store_contents">
						<ul class="search-store_ul">
							<li class="search-store_li">
								<label class="search-store_label">
									<input
										class="search-store_radio"
										type="radio"
										name="sector"
										value=""
										v-model="sector"
										@change="getSubSector"
									/>
									<span class="search-store_name"><i class="fas fa-compress search-store_sct-icon"></i>전체</span>
								</label>
							</li>
							<li class="search-store_li" v-for="item in sectorDatas" :key="item.id">
								<label class="search-store_label">
									<input
										class="search-store_radio"
										type="radio"
										name="sector"
										v-model="sector"
										:value="item"
										@change="getSubSector"
									/>
									<!-- 리팩토링 필요  -->
									<span class="search-store_name">
										<i class="fas fa-eye-dropper search-store_sct-icon" v-if="item.cd === SECTOR_CD.BUT"></i>
										<i class="fas fas fa-utensils search-store_sct-icon" v-if="item.cd === SECTOR_CD.FOO"></i>
										<i class="fas fa-gifts search-store_sct-icon" v-if="item.cd === SECTOR_CD.CLA"></i>
										<i class="fas fa-video search-store_sct-icon" v-if="item.cd === SECTOR_CD.SHO"></i>
										<i class="fas fa-dumbbell search-store_sct-icon" v-if="item.cd === SECTOR_CD.SPO"></i>
										<i class="fas fa-hospital-alt search-store_sct-icon" v-if="item.cd === SECTOR_CD.HOS"></i>
										<i class="far fa-sun search-store_sct-icon" v-if="item.cd === 'ETC'"></i>
										{{ item.name }}
									</span>
								</label>
							</li>
						</ul>

						<ul class="search-store_ul">
							<li class="search-store_li" v-for="item in subSectorDatas" :key="item.id">
								<label class="search-store_label">
									<input class="search-store_radio" type="radio" name="subSector" v-model="subSector" :value="item" />
									<span class="search-store_name">{{ item.name }}</span>
								</label>
							</li>
						</ul>
					</td>
				</tr>

				<!-- area -->
				<tr class="search-store_tr">
					<td class="search-store_title">
						<p><i class="fas fa-map-marker-alt search-store_title-icon"></i></p>
						<span>지역</span>
					</td>
					<td class="search-store_contents">
						<ul class="search-store_ul">
							<li class="search-store_li">
								<label class="search-store_label">
									<input
										class="search-store_radio"
										type="radio"
										name="areaSi"
										v-model="areaSi"
										value=""
										@change="getAreaGuList"
									/>
									<span class="search-store_name">전국</span>
								</label>
							</li>
							<li class="search-store_li" v-for="item in areaSiDatas" :key="item.id">
								<label class="search-store_label">
									<input
										class="search-store_radio"
										type="radio"
										name="areaSi"
										:value="item"
										v-model="areaSi"
										@change="getAreaGuList"
									/>
									<span class="search-store_name">{{ item.name }}</span>
								</label>
							</li>
						</ul>

						<ul class="search-store_ul">
							<li class="search-store_li" v-for="item in areaGuDatas" :key="item.id">
								<label class="search-store_label">
									<input class="search-store_radio" type="checkbox" v-model="areaGu" :value="item" />
									<span class="search-store_name">{{ item.name }}</span>
								</label>
							</li>
						</ul>
					</td>
				</tr>

				<!-- badge -->
				<tr class="search-store_tr">
					<td class="search-store_title">
						<p><i class="fas fa-certificate search-store_title-icon"></i></p>
						<span>뱃지</span>
					</td>
					<td class="search-store_contents">
						<ul class="search-store_ul">
							<li class="search-store_li" v-for="item in badgeDatas" :key="item.id">
								<label class="search-store_label">
									<input class="search-store_radio" type="checkbox" v-model="badge" :value="item" />
									<span class="search-store_name">
										<i class="search-store_sct-icon" :class="item.icon"></i>
										{{ item.name }}
									</span>
								</label>
							</li>
						</ul>
					</td>
				</tr>
			</table>

			<!-- btn -->
			<ul class="search-store_btn-ul">
				<li>
					<button class="search-store_btn" @click="sendSearchItem">검색</button>
				</li>
				<li>
					<button class="search-store_btn search-store_btn--init" @click="init">초기화</button>
				</li>
			</ul>
		</div>

		<!-- search select -->
		<ul class="search-store_select" v-if="!isSearchArea && checkSelect">
			<li class="search-store_select-li" v-if="word">
				<span class="search-store_select-name">{{ word }}</span>
			</li>

			<li class="search-store_select-li" v-if="sector">
				<div>
					<span class="search-store_select-name">{{ sector.name }}</span>
					<i class="fas fa-chevron-right search-store_select-icon" v-if="subSector"></i>
					<span class="search-store_select-name" v-if="subSector">{{ subSector.name }}</span>
				</div>
			</li>

			<li class="search-store_select-li" v-if="areaSi">
				<div>
					<span class="search-store_select-name">{{ areaSi.name }}</span>
					<i class="fas fa-chevron-right search-store_select-icon" v-if="areaGu.length > 0"></i>
					<span v-if="areaGu.length > 0">
						<span class="search-store_select-name" v-for="item in areaGu" :key="item.id">{{ item.name }}</span>
					</span>
				</div>
			</li>

			<li class="search-store_select-li" v-if="badge.length > 0">
				<span class="search-store_select-name" v-for="item in badge" :key="item.id">
					{{ item.name }}
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { apiGetStoreSector, apiGetStoreSubSector } from "@/api/user/store";
import { apiGetAreaSi, apiGetAreaGu } from "@/api/user/area";
import { apiGetBadge } from "@/api/user/badge";
import { SECTOR_CD } from "@/utils/const";
import { setBadgeStyleTypeList } from "@/utils/common";

export default {
	props: {
		isSearchArea: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			// datas
			sectorDatas: "",
			subSectorDatas: "",
			badgeDatas: "",
			areaSiDatas: "",
			areaGuDatas: "",
			// search
			word: "",
			sector: "",
			subSector: "",
			areaSi: "",
			badge: [],
			areaGu: [],
			// const
			SECTOR_CD: SECTOR_CD,
		};
	},
	created() {
		this.getSectorList();
		this.getBadgeList();
		this.getAreaSiList();
	},
	methods: {
		async getSectorList() {
			try {
				const res = await apiGetStoreSector();
				this.sectorDatas = res.data.data.list;

				this.$log.info("Get Sector Res : ", res);
			} catch (error) {
				this.$log.info("Get Sector List E :", error);
			}
		},
		async getSubSector() {
			try {
				this.subSector = "";

				const res = await apiGetStoreSubSector({ id: this.sector.id });
				this.subSectorDatas = res.data.data.list;
				this.$log.info("Get Sub Sector Res : ", res);
			} catch (error) {
				this.$log.info("Get Sub Sector E : ", error);
			}
		},
		async getAreaSiList() {
			try {
				const res = await apiGetAreaSi();
				this.areaSiDatas = res.data.data.list;
				this.$log.info("Get Area(si) Res : ", res);
			} catch (error) {
				this.$log.info("Get Area(si) List E : ", error);
			}
		},
		async getAreaGuList() {
			try {
				this.areaGu = [];
				const res = await apiGetAreaGu({ id: this.areaSi.id });
				this.areaGuDatas = res.data.data.list;
				this.$log.info("Get Area(gu) List Res : ", res);
			} catch (error) {
				this.$log.info("Get Area(gu) List E : ", error);
			}
		},
		async getBadgeList() {
			try {
				const res = await apiGetBadge();
				this.badgeDatas = res.data.data.list;
				setBadgeStyleTypeList(this.badgeDatas);
				this.$log.info("Get Badge List Res : ", res);
			} catch (error) {
				this.$log.info("Get Badge List E :", error);
			}
		},
		sendSearchItem() {
			const payload = {
				search: this.word || "",
				sectorCd: this.sector.cd || "",
				subSectorCd: this.subSector.cd || "",
				badgeCd: this.getCdFromList(this.badge),
				areaSiCd: this.areaSi.cd || "",
				areaGuCd: this.getCdFromList(this.areaGu),
			};
			this.$emit("sendSearchItem", payload);
		},
		getCdFromList(list) {
			if (list.length <= 0) return "";
			let cdList = [];
			list.forEach(el => {
				cdList.push(el.cd);
			});
			return cdList;
		},
		init() {
			this.word = "";
			this.sector = "";
			this.subSector = "";
			this.badge = [];
			this.areaGuDatas = "";
			this.subSectorDatas = "";
			this.areaSi = "";
			this.areaGu = [];
		},
	},
	computed: {
		checkSelect() {
			let result = false;
			if (this.word || this.sector || this.subSector || this.areaGu.length > 0 || this.badge.length > 0) result = true;
			return result;
		},
	},
};
</script>
