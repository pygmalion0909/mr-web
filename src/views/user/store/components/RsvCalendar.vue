<template>
	<FullCalendar :options="calendarOptions" />
</template>

<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";

export default {
	components: {
		FullCalendar, // make the <FullCalendar> tag available
	},
	data() {
		return {
			today: new Date(),
			calendarOptions: {
				// 한국어 설정
				locale: "ko",
				// 플러그인 설정
				plugins: [dayGridPlugin, interactionPlugin],
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
				// 특정 요일 활성화/비활성화
				businessHours: {
					// days of week. an array of zero-based day of week integers (0=Sunday)
					daysOfWeek: [0, 3, 4, 5, 6], // 활성화 될 날짜 지정
				},
				// 특정 날짜 활성화/비활성화
				events: [
					// red areas where no events can be dropped
					{
						start: "2021-11-21",
						end: "2021-11-22",
						overlap: false,
						display: "background",
						color: "gray",
					},
				],
				// 날짜 영역 높이
				contentHeight: 500,
			},
		};
	},
	created() {},
	methods: {
		// arg파라미터 받을수있음
		handleDateClick(info) {
			console.log("info ", info);
			console.log("info.view ", info.view);
			console.log("Clicked on: " + info.dateStr);
			// change the day's background color just for fun
			// info.dayEl.style.backgroundColor = "red"; // 선택된 영역 색상 변경
		},
	},
};
</script>
