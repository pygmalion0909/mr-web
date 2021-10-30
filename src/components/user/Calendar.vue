<template>
	<!-- @TODO @update:from-page="getWorkDayList" 개발확인후 추가하기 -->
	<Calendar class="vc-calendar" is-expanded :min-date="new Date()" :attributes="attributes">
		<template v-slot:day-content="{ day }">
			<!-- set disable day -->
			<div :class="{ calendarIsNotActive: day.isDisabled.end }">
				<span class="pl-3 pt-1 inline-block">{{ day.day }}</span>
			</div>
			<router-link
				:to="{ name: 'reservationMaking', query: { date: dayjs(day.date).format('YYYY-MM-DD') } }"
				class="absolute left-0 top-0 w-full h-full"
				:class="{ calendarIsNotMR: day.isDisabled.end }"
			>
				<span class="text-active font-nB absolute left-1 top-7" v-if="checkWorkDay(day.weekday)">MR</span>
				<span class="text-noneActive font-nB absolute left-1 top-7" v-else>MR</span>
			</router-link>
		</template>
	</Calendar>
</template>

<script>
import Calendar from "v-calendar/lib/components/calendar.umd";
import dayjs from "dayjs";
// import { apiGetReservationList } from "@/api/user/store";

export default {
	props: {
		storeId: {
			default: null,
		},
	},
	components: {
		Calendar,
	},
	data() {
		return {
			dayjs: dayjs,
			workDayDatas: "",
			attributes: [],
		};
	},
	created() {
		// 속성 초기화
		this.attributes = [];
		// 오늘 시간 표시
		this.setTodyDate();
		// workDay표시
		// this.getWorkDayList();
		this.getWorkDayTest();
	},
	methods: {
		/**
		 * @TODO
		 * 1. 가게id 들어와야함
		 * 1. 일하는 요일 데이터 불러오기
		 */
		getWorkDayTest() {
			// 1 일요일 ~ 7 토요일
			const res = [
				{ number: "1", code: "SUN", name: "일요일" },
				{ number: "2", code: "MON", name: "월요일" },
				{ number: "3", code: "THU", name: "화요일" },
				{ number: "4", code: "SAT", name: "토요일" },
			];
			this.workDayDatas = res;
		},
		/**
		 * @TODO
		 * 일단 validation체크 없이 기본 동작만 구현중
		 */
		showWorkTime(day, item) {
			const payload = {
				date: day,
				item: item,
			};
			this.$emit("showReservationTime", payload);
		},
		setTodyDate() {
			const today = this.setAttributePayload({ dates: new Date(), highlight: true });
			this.attributes.push(today);
		},
		setAttributePayload(payload) {
			return {
				dates: payload.dates || null,
				highlight: payload.highlight || false,
				order: 0,
				customData: {
					date: payload.date || null,
					isReservation: payload.isReservation || false,
					title: payload.title || null,
					class: payload.class || null,
				},
			};
		},
		checkWorkDay(dayNum) {
			let isResult = false;
			for (let i = 0; i < this.workDayDatas.length; i++) {
				if (this.workDayDatas[i].number == dayNum) {
					isResult = true;
					break;
				}
			}
			return isResult;
		},
	},
};
</script>

<style>
.vc-calendar .vc-header {
	background: #f1f5f8;
	padding: 10px 0;
	border-radius: 5px;
}
.vc-calendar .vc-weeks {
	padding: 0% !important;
}
.vc-calendar .vc-weekday {
	background: #f1f5f8;
	padding: 10px 0;
}
.vc-calendar .vc-day {
	border-top: 1px solid rgb(212, 211, 211);
	width: 100%;
	height: 90px;
}
.vc-calendar .vc-day.weekday-1 {
	background: rgb(255, 238, 238);
}
.vc-calendar .vc-day.weekday-7 {
	background: #ebf8ff;
}
.vc-calendar .vc-highlight {
	background: rgba(99, 102, 241) !important;
	/* border: 1px solid crimson !important; */
	border-radius: 50% !important;
	position: absolute;
	left: 5.5%;
	top: 1px;
	width: 20px;
	height: 20px;
}
.calendarIsNotActive {
	color: rgb(170, 168, 168);
	background: rgb(241, 241, 241);
	cursor: not-allowed;
	position: absolute;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
}
.calendarIsNotMR {
	display: none;
}
.pe-b::after {
	background: #00ff2a;
	content: "";
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 100%;
	position: absolute;
	left: 3px;
	top: 24px;
	z-index: -1;
}
</style>
