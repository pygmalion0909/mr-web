<template>
	<div>
		<!-- date -->
		<div class="bg-white border rounded-md flex mb-3 h-14">
			<router-link :to="{ name: 'reservationDate' }" class="w-1/6">캘린더Icon</router-link>
			<span class="mb-auto mt-auto w-full text-center text-lg">2021-07-21</span>
		</div>

		<!-- reservation -->
		<div class="sm:flex justify-between">
			<!-- reservation/left -->
			<div class="mb-5 sm:mr-5 sm:w-2/3">
				<!-- reservation/left/time -->
				<div class="bg-white border rounded-md mb-5 p-4">
					<h2 class="border-b-2 mb-2 py-2">
						<span class="font-nB text-xl">예약 시간</span>
						<button class="ml-4">V</button>
					</h2>
					<ul class="grid grid-cols-4 gap-2">
						<li v-for="item in timeDatas" :key="item.id">
							<button
								class="bg-indigo-400 text-white rounded-md w-full py-5"
								:class="[{ 'bg-noneActive': item.status === 'N' }, { 'bg-indigo-800': activeItemNm === item.id }]"
								@click="selectTime(item)"
							>
								{{ item.time }}
							</button>
						</li>
					</ul>
				</div>

				<!-- reservation/left/item -->
				<div class="bg-white border rounded-md mb-5 p-4" v-if="isShowItem">
					<h2 class="font-nB text-xl border-b-2 mb-2 py-2">아이템 선택</h2>
					<ul class="">
						<li class="flex mt-5 border cursor-pointer" v-for="item in itemDatas" :key="item.id" @click="selectItem">
							<div class="w-1/3">
								<img class="w-full h-full" src="@/assets/images/test1.jpg" />
							</div>
							<div class="w-2/3 ml-2">
								<div>이름 : {{ item.name }}</div>
								<div>가격 : {{ item.price }}</div>
								<div>{{ item.dscr }}</div>
							</div>
						</li>
					</ul>
				</div>

				<!-- reservation/left/option -->
				<div class="bg-white border mb-5 p-4" v-if="isShowOption">
					<h2 class="font-nB text-xl border-b-2 mb-2 py-2">옵션</h2>
					<ul class="">
						<li class="flex mt-5 border cursor-pointer" v-for="item in optionDatas" :key="item.id">
							<div>
								<p>{{ item.title }}</p>
								<p><input type="text" /> <button>+</button> <button>-</button></p>
								<p>{{ item.notice }}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<!-- reservation/rigth -->
			<div class="sm:w-1/3">
				<!-- reservation/rigth/최종예약 확인 -->
				<div class="bg-white border mb-5 p-4">
					<h2 class="font-nB text-xl border-b-2 mb-2 py-2">최종 예약 확인</h2>
					<table class="w-full">
						<tr>
							<td>예약날짜</td>
							<td class="text-right py-5">2021-08-03 09:00</td>
						</tr>
						<tr>
							<td>예약아이템</td>
							<td class="text-right py-5">윤진 디자이너</td>
						</tr>
						<tr>
							<td>예약아이템</td>
							<td class="text-right py-5">뿌리염색</td>
						</tr>
						<tr class="border-black border-t">
							<td>예상금액</td>
							<td class="text-right py-5">54,000원</td>
						</tr>
					</table>
				</div>
				<!-- reservation/rigth/예약,예약&결제,취소 -->
				<ul>
					<li class="mb-2">
						<button class="bg-blue-500 text-white w-full py-3 tracking-widest rounded-md">예약하기</button>
					</li>
					<li class="mb-2">
						<button class="bg-indigo-600 text-white w-full py-3 tracking-widest rounded-md">예약&결제하기</button>
					</li>
					<li class="mb-2">
						<button class="bg-gray-300 text-white w-full py-3 tracking-widest rounded-md" @click="cancelMr">
							취소
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { apiGetRsvTimeList } from "@/api/user/reservation";

export default {
	data() {
		return {
			// date
			date: "",
			dayNum: "",
			// reservation datas
			timeDatas: "",
			itemDatas: "",
			// item
			isShowItem: false,
			activeItemNm: "",
			// option
			isShowOption: false,
			optionDatas: "",
		};
	},
	created() {
		this.getTimeList();
	},
	methods: {
		async getTimeList() {
			const res = await apiGetRsvTimeList();
			console.log("res", res);
			this.timeDatas = res.data.data.list;
		},
		selectTime(itemObj) {
			/**
			 * @TODO
			 * 1. 시간중에서 status가 N은거 선택 못하게 하기
			 */
			this.activeItemNm = itemObj.id;
			/**
			 * item에 필요한 속성
			 * 1. 이름 M
			 * 1. 가격 O
			 * 1. 이미지 O
			 * 1. 설명 O
			 *
			 */
			/**
			 * item의 옵션
			 * 1. 인원제한
			 * 1. 가격제한
			 */
			const item = [
				{
					id: "OP1",
					name: "A코스",
					price: "23000",
					dscr: `곱창은 다른 살코기에 비해 철분과 비타민이 풍부하여 허약한 사람이나 환자의 회복식 및 보신요리에 이용합니다.
고단백 저콜레스트롤 식품인 곱창은 씹는 맛도 쫄깃하며 술안주 시 분해작용이 뛰어나 위벽보호, 알코올분해, 소화촉진 등의 작용을 합니다.`,
					imgUrl: "/img/test1.cd7b66c1.jpg",
					status: "Y",
				},
				{
					id: "OP2",
					name: "B코스",
					price: "40000",
					dscr: "직접 잡은 참치",
					imgUrl: "/img/test2.cd7b66c1.jpg",
					status: "Y",
				},
			];
			console.log("item", item);
			this.itemDatas = item;
			this.isShowItem = true;
		},
		selectItem() {
			/**
			 * @TODO
			 * 1. 옵션 종류 뽑아내기(인원수, 기간, 일정금액 이상 ETC)
			 */
			const option = [{ title: "인원수", notice: "2명 이상 가능 합니다.", min: 2, max: 0 }];
			this.isShowOption = true;
			this.optionDatas = option;
		},
		cancelMr() {
			this.$router.push({ name: "reservationDate" });
		},
	},
	beforeRouteEnter(to, from, next) {
		// check require query
		if (!to.query || !to.query.date) {
			alert("잘못된 접근 입니다.");
			next({ name: "reservationDate", params: { storeId: "1" } });
		}
		next();
	},
};
</script>
