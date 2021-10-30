## Option
* is-dark: dark mode
* is-expanded: full width
* :min-date="new Date()": 최소활성화되는 날짜
* :attributes="attributes": 속성설정
* :disabled-dates="{ start: new Date(2021, 4, 20), end: new Date(2021, 4, 20) }": 비활성화 날짜 지정, 여기에 설정하면 day.isDisabled.end에서 값을 얻을 수 있다.
*  //여기에 휴무 날짜 넣어서 비활성화 넣으면 되겠다. :disabled-dates='[
  {
    start: null,
    end: new Date(2017, 11, 31)
  },
  {
    start: new Date(2018, 1, 1),
    end: null
  }
]': 비활성화 날짜를 여러개 지정
* @dayclick="dayClicked": 클릭시 날짜 가져오기 메소드
* !!Calendar의 속성(:min-date, :disabled-dates 등)은 day에서 값을 확인 할 수 있다.
* !!https://github.com/nathanreyes/v-calendar/blob/master/docs/.vuepress/components/homepage/custom-calendar.vue(custom참고)

## Attributes
```js
data() {
  return {
    attributes: [
      {
        dates: new Date(2021, 4, 17),
        highlight: true,
        order: 0,
        customData: {
          isActive: true,
          title: "* 예약가능",
          class: "bg-pink-500 text-white",
        },
      },
    ],
  };
},
```

## Other Calendar R
* [https://tallent.us/vue-simple-calendar/]
* [https://vcalendar.io/installation.html#npm]
* [https://ui.toast.com/tui-calendar]