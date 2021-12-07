<template>
	<FullCalendar ref="fc" :options="fcOptions" />
</template>

<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import errHandler from "@/utils/errHandler";
import dayjs from "dayjs";
import { apiGetRsvFullDate, apiGetRsvDay } from "@/api/user/reservation";

export default {
	props: {
		storeId: {
			type: String,
			default: null,
		},
	},
	components: {
		FullCalendar, // make the <FullCalendar> tag available
	},
	data() {
		return {
			// calendar
			fcOptions: {
				// 한국어 설정
				locale: "ko",
				// 플러그인 설정
				plugins: [dayGridPlugin, interactionPlugin],
				// 다음달 일자 숨김
				showNonCurrentDates: false,
				// calendar 월(month)화면
				initialView: "dayGridMonth",
				// 날짜 클릭 이벤트
				dateClick: this.handleDateClick,
				// 날짜 유효범위 지정
				validRange() {
					return {
						start: dayjs().format("YYYY-MM-DD"),
					};
				},
				// header레이아웃(이전, 다음, 날짜)
				headerToolbar: {
					left: "prev",
					center: "title",
					right: "next",
				},
				// 다음, 이전 버튼 이벤트(사용자 정의)
				customButtons: {
					prev: {
						text: "이전",
						click: this.onFcPrevBtn,
					},
					next: {
						text: "다음",
						click: this.onFcNextBtn,
					},
				},
				// 가게 영업요일(work day) 활성화
				businessHours: {
					daysOfWeek: [], // 영업요일 활성화 될 날짜 지정(0=Sunday)
				},
				// 가게 예약불가능한 날짜 설정
				events: [],
				// 날짜 영역 높이
				contentHeight: 450,
			},
			// data
			yearMth: dayjs().format("YYYY-MM"),
		};
	},
	created() {
		this.getRsvFullDate();
		this.getRsvDay();
	},
	methods: {
		async getRsvDay() {
			try {
				const res = await apiGetRsvDay(this.storeId);
				this.fcOptions.businessHours.daysOfWeek = this.getDayNum(res.data.data.list);
				this.$log.info("Get Rsv Day Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		async getRsvFullDate() {
			try {
				this.$store.commit("onSpinner");

				const res = await apiGetRsvFullDate({ yearMth: this.yearMth, storeId: this.storeId });
				this.fcOptions.events = [];
				res.data.data.list.forEach(el => {
					this.$log.info("el", el);
					this.fcOptions.events.push({
						start: el,
						overlap: false,
						display: "background",
					});
				});

				this.$store.commit("offSpinner");
				this.$log.info("Get Rsv Full-Date Res : ", res);
			} catch (error) {
				await errHandler.common(error);
			}
		},
		handleDateClick(info) {
			// set data
			const date = info.dateStr;
			const day = dayjs(info.date)
				.format("ddd")
				.toUpperCase();

			// check active date
			// 1. check work day (daysOfWeek)
			const dayNum = this.getDayNum([day]);
			if (!this.fcOptions.businessHours.daysOfWeek.includes(dayNum[0])) return;

			// 2. check not full date (events)
			const isFullDate = this.fcOptions.events.some(el => {
				return el.start == date;
			});
			if (isFullDate) return;

			// on emit
			this.$emit("selectRsvDate", { dayCd: day, date: date });
		},
		getDayNum(list) {
			let dayNum = [];
			list.forEach(el => {
				switch (el) {
					case "SUN":
						dayNum.push(0);
						break;
					case "MON":
						dayNum.push(1);
						break;
					case "TUE":
						dayNum.push(2);
						break;
					case "WED":
						dayNum.push(3);
						break;
					case "THU":
						dayNum.push(4);
						break;
					case "FRI":
						dayNum.push(5);
						break;
					case "SAT":
						dayNum.push(6);
						break;
				}
			});
			return dayNum;
		},
		onFcPrevBtn() {
			let fcApi = this.$refs.fc.getApi();
			fcApi.prev();
			this.onMoveMonth(fcApi);
		},
		onFcNextBtn() {
			let fcApi = this.$refs.fc.getApi();
			fcApi.next();
			this.onMoveMonth(fcApi);
		},
		onMoveMonth(fcApi) {
			this.yearMth = dayjs(fcApi.getDate()).format("YYYY-MM");
			this.getRsvDay();
			this.getRsvFullDate();
		},
	},
};
</script>
