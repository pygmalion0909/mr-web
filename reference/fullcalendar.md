fullcalendar
# 설치
npm install @fullcalendar/vue @fullcalendar/core
npm install @fullcalendar/daygrid
npm install @fullcalendar/interaction // 이거 없으니깐 dateClick가 안먹힘

# 기본 셋팅 
```
<template>
	<FullCalendar :options="calendarOptions" />
</template>

<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
	components: {
		FullCalendar, // make the <FullCalendar> tag available
	},
	data() {
		return {
			calendarOptions: {
				plugins: [dayGridPlugin, interactionPlugin],
				initialView: "dayGridMonth",
				dateClick: this.handleDateClick,
				events: [{ title: "event 1", date: "2021-11-17" }],
			},
		};
	},
	methods: {
		handleDateClick(arg) {
			alert("date click! " + arg.dateStr);
		},
	},
};
</script>
```

# 날짜 활성화 유효범휘 지정
https://fullcalendar.io/docs/validRange

# 특정 요일 활성화/비활성화 지정
https://fullcalendar.io/docs/businessHours

# 이전 다음 버튼 이벤트
```html
	<FullCalendar ref="fc" :options="calendarOptions" />
```
```js
 data() {
		return {
			calendarOptions: {
				// 다음, 이전 버튼(사용자 정의)
				customButtons: {
					prev: {
						text: "이전",
						click: () => {
							console.log("eventPrev");
							let calendarApi = this.$refs.fc.getApi();
							calendarApi.prev();
						},
					},
					next: {
						text: "다음",
						click: () => {
							console.log("eventNext");
							let calendarApi = this.$refs.fc.getApi();
							calendarApi.next();
						},
					},
				},
			},
		};
	},
```
