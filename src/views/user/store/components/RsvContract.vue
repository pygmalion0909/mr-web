<template>
	<div class="sto-index_mr-div">
		<ul class="sto-index_mr">
			<!-- date -->
			<li class="sto-index_mr-list" ref="rsvDay">
				<div class="sotre-index_mr-header">
					<p class="sto-index_mr-title"><i class="fas fa-calendar"></i> 날짜 선택</p>
					<button @click="toggleMrTab('isDate')">
						<i
							class="fas fa-chevron-circle-down sto-index_mr-icon"
							:class="{ 'sto-index_mr-icon--on': isListToggle.isDate }"
						></i>
					</button>
				</div>
				<RsvCalendar v-show="isListToggle.isDate" :storeId="storeId" @selectRsvDate="selectRsvDate"></RsvCalendar>
			</li>

			<!-- time -->
			<li class="sto-index_mr-list" ref="rsvTime">
				<div class="sotre-index_mr-header">
					<p class="sto-index_mr-title"><i class="far fa-clock"></i> 시간 선택</p>
					<button @click="toggleMrTab('isTime')">
						<i
							class="fas fa-chevron-circle-down sto-index_mr-icon"
							:class="{ 'sto-index_mr-icon--on': isListToggle.isTime }"
						></i>
					</button>
				</div>
				<ul class="sto-index_select sto-index_select--time" v-if="isListToggle.isTime">
					<li class="sto-index_time-li" v-for="item in rsvTimeDatas" :key="item.id">
						<span
							class="sto-index_time"
							:class="{ 'sto-index_time-none': item.rsvStatusYn === 'N' }"
							@click="selectRsvTime(item)"
						>
							{{ item.rsvTm }}
						</span>
					</li>
				</ul>
			</li>

			<!-- item -->
			<li class="sto-index_mr-list" v-if="rsvItemDatas" ref="item">
				<div class="sotre-index_mr-header">
					<p class="sto-index_mr-title"><i class="fas fa-archive"></i> 아이템 선택</p>
					<button @click="toggleMrTab('isItem')">
						<i
							class="fas fa-chevron-circle-down sto-index_mr-icon"
							:class="{ 'sto-index_mr-icon--on': isListToggle.isItem }"
						></i>
					</button>
				</div>
				<ul class="sto-index_select" v-if="isListToggle.isItem">
					<li class="sto-index_item-li" v-for="item in rsvItemDatas" :key="item.id">
						<div
							class="sto-index_item-div"
							:class="{ 'sto-index_item-none': item.rsvStatusYn === 'N' }"
							@click="selectRsvItem(item)"
						>
							<div class="sto-index_item-left">
								<p class="sto-index_item sto-index_item--title">{{ item.name }}</p>
								<p class="sto-index_item sto-index_item--desc">{{ item.desc }}</p>
								<p class="sto-index_item" v-if="item.price">{{ item.price | formatWon }}원</p>
							</div>
							<div class="sto-index_item-right" v-if="item.imgUrl">
								<img class="sto-index_item-img" :src="item.imgUrl" alt="가게 상품 이미지" />
							</div>
						</div>
					</li>
				</ul>
			</li>

			<!-- personnel -->
			<li class="sto-index_mr-list">
				<div class="sotre-index_mr-header">
					<p class="sto-index_mr-title"><i class="fas fa-user-check"></i> 인원</p>
					<button @click="toggleMrTab('isPerson')">
						<i
							class="fas fa-chevron-circle-down sto-index_mr-icon"
							:class="{ 'sto-index_mr-icon--on': isListToggle.isPerson }"
						></i>
					</button>
				</div>
				<div class="sto-index_select sto-index_select--person" v-if="isListToggle.isPerson">
					<div class="sto-index_person-div">
						<button class="sto-index_person-btn sto-index_person-btn--down" @click="onCountPerson('M')">
							<i class="fas fa-minus"></i>
						</button>
						<input class="sto-index_person-input" type="text" :value="rsvPerson" readonly />
						<button class="sto-index_person-btn sto-index_person-btn--up" @click="onCountPerson('P')">
							<i class="fas fa-plus"></i>
						</button>
					</div>
					<div class="sto-index_person-notice" v-if="personOpt.length > 0">
						<p v-for="item in personOpt" :key="item.id">
							<i class="fas fa-exclamation-circle sto-index_person-notice-icon"></i>
							<span v-if="item.minYn === 'Y'">1회 예약인원은 최소 {{ item.numPerson }}명 입니다.</span>
							<span v-if="item.maxYn === 'Y'">1회 예약인원은 최대 {{ item.numPerson }}명 입니다.</span>
							<span v-if="item.perPersonYn === 'Y'">해당 예약은 인당 금액이 청구 됩니다.</span>
							<span v-if="item.limitYn === 'Y'" v-html="limitOptNoti"></span>
						</p>
					</div>
				</div>
			</li>

			<!-- info -->
			<li class="sto-index_mr-list">
				<div class="sotre-index_mr-header">
					<p class="sto-index_mr-title"><i class="fas fa-user-edit"></i> 예약자 등록</p>
					<button @click="toggleMrTab('isInfo')">
						<i
							class="fas fa-chevron-circle-down sto-index_mr-icon"
							:class="{ 'sto-index_mr-icon--on': isListToggle.isInfo }"
						></i>
					</button>
				</div>
				<table class="sto-index_select sto-index_select--info" v-if="isListToggle.isInfo">
					<tr class="sto-index_info-tr">
						<td class="sto-index_info-td sto-index_info-td--title">
							<span class="sto-index_request">📌</span>예약자명
						</td>
						<td class="sto-index_info-td">
							<input
								class="sto-index_info-input"
								type="text"
								placeholder="예약자 성함을 작성해주세요."
								:value="rsvName"
								@input="bindRsvName"
							/>
							<p class="sto-index_info-name--valid" :class="{ 'on-valid-notice': isRsvNameValid }">
								한글 또는 영문만 입력 가능합니다.
							</p>
						</td>
					</tr>

					<tr class="sto-index_info-tr">
						<td class="sto-index_info-td sto-index_info-td--title"><span class="sto-index_request">📌</span>연락처</td>
						<td class="sto-index_info-td">
							<input
								class="sto-index_info-input"
								type="number"
								placeholder="예약자 전화번호를 작성해주세요."
								:value="rsvNumber"
								@input="bindRsvNumber"
							/>
						</td>
					</tr>
					<tr class="sto-index_info-tr">
						<td class="sto-index_info-td sto-index_info-td--title">요청사항</td>
						<td class="sto-index_info-td">
							<textarea
								class="sto-index_info-text"
								placeholder="요청사항을 작성해주세요."
								@input="resizeTextarea"
								:value="rsvRequest"
							></textarea>
						</td>
					</tr>
				</table>
			</li>

			<!-- checking -->
			<li class="sto-index_mr-list">
				<div class="sotre-index_mr-header">
					<p class="sto-index_mr-title"><i class="fas fa-clipboard-check"></i> 예약정보 확인</p>
					<button @click="toggleMrTab('isChecking')">
						<i
							class="fas fa-chevron-circle-down sto-index_mr-icon"
							:class="{ 'sto-index_mr-icon--on': isListToggle.isChecking }"
						></i>
					</button>
				</div>
				<div v-if="isListToggle.isChecking">
					<table class="sto-index_select sto-index_checking--table">
						<tr class="sto-index_check-tr">
							<td class="sto-index_check-td sto-index_check-td--title">
								<span class="sto-index_request">📌</span>날짜
							</td>
							<td class="sto-index_check-td sto-index_check-td--data">{{ rsvDate }}</td>
						</tr>
						<tr class="sto-index_check-tr">
							<td class="sto-index_check-td sto-index_check-td--title">
								<span class="sto-index_request">📌</span>시간
							</td>
							<td class="sto-index_check-td sto-index_check-td--data">{{ rsvTime }}</td>
						</tr>
						<tr class="sto-index_check-tr">
							<td class="sto-index_check-td sto-index_check-td--title">
								<span class="sto-index_request">📌</span>인원
							</td>
							<td class="sto-index_check-td sto-index_check-td--data">{{ rsvPerson }}명</td>
						</tr>
					</table>

					<table class="sto-index_select sto-index_checking--table" v-if="rsvItemDatas">
						<tr class="sto-index_check-tr">
							<td class="sto-index_check-td sto-index_check-td--title">
								<span class="sto-index_request">📌</span>아이템
							</td>
							<td class="sto-index_check-td sto-index_check-td--data">{{ rsvItem.name }}</td>
						</tr>
						<tr class="sto-index_check-tr" v-if="rsvPrice">
							<td class="sto-index_check-td sto-index_check-td--title">
								<span class="sto-index_request">📌</span>금액
							</td>
							<td class="sto-index_check-td sto-index_check-td--data">{{ rsvPrice | formatWon }}원</td>
						</tr>
						<tr class="sto-index_check-tr" v-if="rsvPrice">
							<td class="sto-index_check-td sto-index_check-td--title">
								<span class="sto-index_request">📌</span>최종금액
							</td>
							<td class="sto-index_check-td sto-index_check-td--data">{{ rsvTotalPrice | formatWon }}원</td>
						</tr>
					</table>

					<table class="sto-index_select sto-index_checking--table">
						<tr class="sto-index_check-tr">
							<td class="sto-index_check-td sto-index_check-td--title">
								<span class="sto-index_request">📌</span>예약자명
							</td>
							<td class="sto-index_check-td sto-index_check-td--data">{{ rsvName }}</td>
						</tr>
						<tr class="sto-index_check-tr">
							<td class="sto-index_check-td sto-index_check-td--title">
								<span class="sto-index_request">📌</span>연락처
							</td>
							<td class="sto-index_check-td sto-index_check-td--data">{{ rsvNumber }}</td>
						</tr>
						<tr class="sto-index_check-tr">
							<td class="sto-index_check-td sto-index_check-td--title">요청사항</td>
							<td class="sto-index_check-td sto-index_check-td--data">{{ rsvRequest }}</td>
						</tr>
						<tr class="sto-index_check-tr">
							<td class="sto-index_check-td sto-index_check-td--agree" colspan="2">
								<div class="sto-index_agree-notice">
									위 예약 필수항목(📌)이 올바르게 입력되었는지 확인 후 아래 동의란을 클릭해주세요.<br />
									모든 필수 항목 작성 후 예약 신청이 가능합니다.
								</div>
								<input class="sto-index_agree-input" type="checkbox" id="rsv-info-agree" v-model="isRsvAgree" />
								<label for="rsv-info-agree" class="sto-index_agree-label">예약정보에 동의 하겠습니다.</label>
							</td>
						</tr>
					</table>
				</div>
			</li>
		</ul>

		<!-- reservation btn -->
		<div class="sto-index_mr-btn-div">
			<button
				class="sto-index_mr-btn"
				:class="{ 'sto-index_mr-btn--active': checkRsvDatas }"
				@click="makeRsv(checkRsvDatas)"
			>
				예약 신청 <i class="fas fa-arrow-circle-right"></i>
			</button>
		</div>
	</div>
</template>

<script>
import RsvCalendar from "@/views/user/store/components/RsvCalendar";
import { apiGetRsvTime, apiGetRsvItem, apiRegisterRsv } from "@/api/user/reservation";
import errHandler from "@/utils/errHandler";
import notice from "@/utils/notice";
import { NOTICE_TITLE } from "@/utils/const";

export default {
	filters: {
		formatWon(val) {
			return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
		},
	},
	components: {
		RsvCalendar,
	},
	data() {
		return {
			// datas
			rsvTimeDatas: "",
			rsvItemDatas: "",
			// data
			storeId: this.$route.params.storeId,
			rsvItemId: "",
			rsvDayCd: "",
			rsvDate: "",
			rsvTime: "",
			rsvItem: "",
			rsvName: "",
			rsvNumber: "",
			rsvRequest: "",
			rsvPerson: 1,
			rsvPrice: "",
			rsvTotalPrice: "",
			// option
			personOpt: "",
			limitOptNoti: "",
			currentRsvPer: "",
			// boolean
			isRsvAgree: false,
			isRsvNameValid: false,
			isListToggle: {
				isDate: true,
				isTime: false,
				isItem: false,
				isInfo: false,
				isPerson: false,
				isChecking: false,
			},
		};
	},
	methods: {
		async selectRsvDate(payload) {
			try {
				if (payload.date == this.rsvDate) {
					this.isListToggle.isDate = false;
					return;
				}

				this.$store.commit("onSpinner");

				const res = await apiGetRsvTime({ dayCd: payload.dayCd, rsvDt: payload.date, storeId: this.storeId });
				this.rsvDate = payload.date;
				this.rsvDayCd = payload.dayCd;
				this.rsvTimeDatas = res.data.data.list;

				this.$store.commit("offSpinner");
				this.$refs.rsvDay.scrollIntoView(true);

				this.$log.info("Get Rsv Time Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		async selectRsvTime(item) {
			try {
				if (item.rsvStatusYn === "N") return;
				if (this.rsvTime == item.rsvTm) {
					this.isListToggle.isTime = false;
					return;
				}

				this.$store.commit("onSpinner");

				this.rsvTime = item.rsvTm;
				let rsvTms = `${this.rsvDate} ${this.rsvTime}:00`;
				const res = await apiGetRsvItem({ dayCd: this.rsvDayCd, storeId: this.storeId, rsvTms: rsvTms });
				this.isListToggle.isTime = false;

				// check item and set person option
				if (res.data.data.list.length > 0) {
					this.rsvItemDatas = res.data.data.list;
					this.isListToggle.isItem = true;
				} else {
					this.isListToggle.isPerson = true;
					this.isListToggle.isInfo = true;
					this.setInitPersonOption(item);
				}

				this.$store.commit("offSpinner");
				this.$refs.rsvTime.scrollIntoView(true);

				this.$log.info("Get Rsv Item Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		selectRsvItem(item) {
			if (item.rsvStatusYn === "N") return;

			this.rsvItem = item;
			this.rsvPerson = 1;
			this.rsvItemId = item.itemId;
			this.isListToggle.isItem = false;
			this.isListToggle.isPerson = true;
			this.isListToggle.isInfo = true;

			if (item.price) {
				this.rsvPrice = item.price;
				this.rsvTotalPrice = this.rsvPerson * item.price;
			}
			this.setInitPersonOption(item);
			this.$refs.item.scrollIntoView(true);
		},
		setInitPersonOption(item) {
			this.personOpt = !item.personOption ? "" : item.personOption;
			this.currentRsvPer = !item.currentRsvPer ? "" : item.currentRsvPer;

			this.personOpt.forEach(el => {
				// init min person
				if (el.minYn === "Y") this.rsvPerson = el.numPerson;
				// init limit person
				if (el.limitYn === "Y") {
					this.limitOptNoti = `예약 총원은 ${el.numPerson}명 입니다. (현재 예약된 인원 : ${item.currentRsvPer}명)`;
				}
			});
		},
		async makeRsv(isOn) {
			try {
				if (!isOn) return;

				// check signin
				if (!this.$store.state.token) {
					const confirmYn = await notice.confirm({
						title: NOTICE_TITLE.NOTI,
						text: "해당 서비스는 로그인이 필요합니다.<br/>로그인 하시겠습니까?",
					});
					if (confirmYn) this.$router.push({ name: "signin" });
					return;
				}

				const payload = {
					storeId: this.storeId,
					itemId: this.rsvItemId ? this.rsvItemId : null,
					rsvDt: this.rsvDate,
					rsvTm: this.rsvTime,
					dayCd: this.rsvDayCd,
					rsvPer: this.rsvPerson,
					rsvPrice: this.rsvPrice ? this.rsvPrice : null,
					rsvName: this.rsvName,
					rsvNumber: this.rsvNumber,
					rsvRequest: this.rsvRequest,
				};

				console.log("payload", payload);
				await notice.alert({
					title: NOTICE_TITLE.DONE,
					text: `안녕하세요. MR개발자 김경필 입니다.<br/>
						현재 MR은 실제 운영되고 있지 않습니다.<br/>
						혹시나 예약 후 가게에 방문하는 경우를 대비하여 알려드립니다.<br/>
						MR의 실제 서비스를 위해 노력 하고 있습니다.<br/>
						빠른 시일 내로 찾아뵐 수 있도록 많은 응원 부탁드립니다.😄<br/>
						둘러보시고 MR을 위해 좋은 의견 또는 제가 찾기 못한 버그를 발견 하셨다면 연락주세요~<br/>
						감사합니다.
						`,
				});

				this.$store.commit("onSpinner");
				await apiRegisterRsv(payload);
				this.$store.commit("offSpinner");

				await notice.alert({
					title: NOTICE_TITLE.DONE,
					text:
						"정상적으로 예약 완료 되었습니다.<br/>2.0.0버전에서 알림 서비스(이메일, 문자)를 이용할 수 있습니다.<br/>조금만 기다려주세요.😊",
				});
				this.$router.push({ name: "home" });
			} catch (error) {
				await errHandler.common(error);
			}
		},
		async toggleMrTab(target) {
			let isToggle = true;
			switch (target) {
				case "isDate":
					isToggle = true;
					break;
				case "isTime":
					if (!this.rsvTimeDatas) {
						await notice.alert({ title: NOTICE_TITLE.NOTI, text: "예약 날짜를 먼저 선택 해주세요." });
						this.isListToggle.isDate = true;
						isToggle = false;
					}
					break;
				case "isPerson":
					if (!this.rsvTime) {
						await notice.alert({ title: NOTICE_TITLE.NOTI, text: "예약 시간을 먼저 선택 해주세요." });
						if (this.rsvDate) this.isListToggle.isTime = true;
						isToggle = false;
					}
					break;
				case "isInfo":
					if (!this.rsvTime) {
						await notice.alert({ title: NOTICE_TITLE.NOTI, text: "예약 시간을 먼저 선택 해주세요." });
						if (this.rsvDate) this.isListToggle.isTime = true;
						isToggle = false;
					}
					break;
				case "isChecking":
					if (!this.rsvTimeDatas) {
						await notice.alert({ title: NOTICE_TITLE.NOTI, text: "예약 날짜를 먼저 선택 해주세요." });
						if (this.rsvDate) this.isListToggle.isTime = true;
						isToggle = false;
					}
					break;
			}
			if (!isToggle) return;
			this.isListToggle[target] = !this.isListToggle[target];
		},
		onCountPerson(target) {
			if (target === "M" && this.rsvPerson <= 1) return;
			target === "M" ? this.rsvPerson-- : this.rsvPerson++;
		},
		resizeTextarea(event) {
			event.target.style.height = "auto";
			event.target.style.height = `${event.target.scrollHeight}px`;
			this.rsvRequest = event.target.value;
		},
		bindRsvName(event) {
			this.rsvName = event.target.value;
		},
		bindRsvNumber(event) {
			this.rsvNumber = event.target.value;
		},
		validRsvName(val) {
			const reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
			return reg.test(val);
		},
	},
	watch: {
		rsvPerson(val, prevVal) {
			if (!this.personOpt) return;

			// set person option
			this.personOpt.forEach(async el => {
				if (el.maxYn === "Y") {
					// check max person
					if (val <= el.numPerson) return;
					this.rsvPerson = prevVal;
					return await notice.alert({
						title: NOTICE_TITLE.WAR,
						text: `예약인원은 최대${el.numPerson}명 입니다.`,
					});
				} else if (el.minYn === "Y") {
					// check min person
					if (val >= el.numPerson) return;
					this.rsvPerson = prevVal;
					return await notice.alert({
						title: NOTICE_TITLE.WAR,
						text: `예약인원은 최소${el.numPerson}명 입니다.`,
					});
				} else if (el.limitYn === "Y") {
					// check limit person
					if (val <= el.numPerson - this.currentRsvPer) return;
					this.rsvPerson = prevVal;
					return await notice.alert({
						title: NOTICE_TITLE.WAR,
						text: `${el.numPerson - this.currentRsvPer}명까지 예약 가능합니다.<br/>
						(현재 예약된 인원 ${this.currentRsvPer}명 / 예약 총원 ${el.numPerson}명)`,
					});
				}
			});

			// set total amount
			if (this.rsvPrice) this.rsvTotalPrice = val * this.rsvPrice;
		},
		rsvDate() {
			this.rsvTime = "";
			this.rsvItem = "";
			this.rsvItemDatas = "";
			this.rsvName = "";
			this.rsvNumber = "";
			this.rsvRequest = "";
			this.rsvPerson = 1;
			this.rsvPrice = "";
			this.rsvTotalPrice = "";
			this.personOpt = "";
			this.limitOptNoti = "";
			this.currentRsvPer = "";
			this.isListToggle.isTime = true;
			this.isListToggle.isChecking = true;
			this.isListToggle.isDate = false;
			this.isListToggle.isPerson = false;
			this.isListToggle.isInfo = false;
		},
		rsvTime() {
			this.rsvItem = "";
			this.rsvItemDatas = "";
			this.rsvName = "";
			this.rsvNumber = "";
			this.rsvRequest = "";
			this.rsvPerson = 1;
			this.rsvPrice = "";
			this.rsvTotalPrice = "";
			this.personOpt = "";
			this.limitOptNoti = "";
			this.currentRsvPer = "";
		},
		rsvItem() {
			this.rsvName = "";
			this.rsvNumber = "";
			this.rsvRequest = "";
		},
		rsvName(val) {
			const isValidation = this.validRsvName(val);
			!isValidation ? (this.isRsvNameValid = true) : (this.isRsvNameValid = false);
		},
		rsvNumber(val, prevVal) {
			const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z]/;
			if (reg.exec(val) !== null) this.rsvNumber = val.replace(/[^0-9]/g, "");

			if (val.length > 15) this.rsvNumber = prevVal;
		},
	},
	computed: {
		checkRsvDatas() {
			let isResult = false;

			if (!this.validRsvName(this.rsvName)) return false;

			if (this.rsvDate && this.rsvTime && this.rsvPerson && this.rsvName && this.rsvNumber && this.isRsvAgree) {
				if (this.rsvItemDatas) {
					if (this.rsvItemId) isResult = true;
				} else {
					isResult = true;
				}
			}
			return isResult;
		},
	},
};
</script>
