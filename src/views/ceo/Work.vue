<template>
	<div>
		<!-- sector -->
		<ul class="mb-10">
			<li class="border-b-2 border-indigo-300">
				<h1 class="text-3xl mb-3">업종</h1>
			</li>
			<li>업종</li>
			<li class="grid grid-cols-7">
				<ul class="border-black border col-span-3">
					<li class="py-1 my-3 ml-2" v-for="item in sectorDatas" :key="item.id">
						<label class="select-none container relative cursor-pointer pl-7 mr-6">
							<input
								class="absolute opacity-0 left-0 top-0 cursor-pointer"
								type="radio"
								name="businessItem"
								checked="checked"
								v-model="sector"
								:value="item.code"
							/>
							<span class="h-6 w-6 checkmark absolute top-0 left-0 bg-white border border-indigo-200 rounded"></span>
							<span class="align-top">{{ item.name }}</span>
						</label>
					</li>
				</ul>
				<div class="text-center leading-10 col-span-1">=></div>
				<ul class="border-black border col-span-3">
					<li>
						<label class="select-none container relative cursor-pointer pl-7 mr-6">
							<input
								class="absolute opacity-0 left-0 top-0 cursor-pointer"
								type="radio"
								name="businessItem2"
								checked="checked"
							/>
							<span class="h-6 w-6 checkmark absolute top-0 left-0 bg-white border border-indigo-200 rounded"></span>
							<span class="align-top">헤어샾</span>
						</label>
					</li>
					<li>
						<label class="select-none container relative cursor-pointer pl-7 mr-6">
							<input
								class="absolute opacity-0 left-0 top-0 cursor-pointer"
								type="radio"
								name="businessItem2"
								checked="checked"
							/>
							<span class="h-6 w-6 checkmark absolute top-0 left-0 bg-white border border-indigo-200 rounded"></span>
							<span class="align-top">네일샾</span>
						</label>
					</li>
				</ul>
			</li>
			<li class="text-right">
				<button class="bg-indigo-500 w-28 h-10 rounded-md text-white hover:bg-indigo-600">저장</button>
			</li>
		</ul>
		<!-- day -->
		<ul class="mb-10">
			<li class="border-b-2 border-indigo-300">
				<h1 class="text-3xl mb-3">Work Day</h1>
			</li>
			<li class="mt-5">
				<p>알림</p>
				<p>
					<!-- 짧게작성 -->
					사장님의 매주 근무요일을 지정하는 영역 입니다. 해당 영역에서 선택한 요일만 예약 가능 상태로 됩니다. 반대로
					해당 영역에서 선택 되지 않은 요일은 자동적으로 휴무일로 지정 됩니다. 해당 설정은 정기 근무시간을 선택하는
					것이며, 만약 특정 요일에 단발성으로 근무를 원한거나 휴무를 원하신다면 "단발성 설정"메뉴에서 설정 할 수
					있습니다. 주의할점은 "단발성 설정"은 "정기 설정"보다 우선순위가 높습니다. 자세한 내용은 아래 예시를 확인
					해주세요.
				</p>
			</li>
			<li>
				<!-- 토글 형식 변경 -->
				<p>예시</p>
				<div>
					<p>
						정기 근무요일 설정 : 월, 화, 수, 목, 금
					</p>
					<p>
						휴무일 : 토, 일
					</p>
					<p>
						단발성 근무요일 설정 : 토(2021/06/23)
					</p>
					매주 토,일은 후뮤지만 단발성 근무요일 설정(2021/06/23 토요일)으로 2021/06/23일이 포함된 주는 토요일은 후뮤일이
					아닌 근무일로 설정 됩니다.
				</div>
			</li>
			<li>
				<ul class="flex my-5">
					<li
						class="
              bg-indigo-200
              rounded-md
              w-10
              h-10
              mr-5
              leading-10
              text-center
            "
					>
						월
					</li>
					<li
						class="
              bg-indigo-200
              rounded-md
              w-10
              h-10
              mr-5
              leading-10
              text-center
            "
					>
						화
					</li>
					<li
						class="
              bg-indigo-200
              rounded-md
              w-10
              h-10
              mr-5
              leading-10
              text-center
            "
					>
						수
					</li>
					<li
						class="
              bg-indigo-200
              rounded-md
              w-10
              h-10
              mr-5
              leading-10
              text-center
            "
					>
						목
					</li>
					<li
						class="
              bg-indigo-200
              rounded-md
              w-10
              h-10
              mr-5
              leading-10
              text-center
            "
					>
						금
					</li>
					<li
						class="
              bg-indigo-200
              rounded-md
              w-10
              h-10
              mr-5
              leading-10
              text-center
            "
					>
						토
					</li>
					<li
						class="
              bg-indigo-200
              rounded-md
              w-10
              h-10
              mr-5
              leading-10
              text-center
            "
					>
						일
					</li>
				</ul>
			</li>
			<li class="text-right">
				<button class="bg-indigo-500 w-28 h-10 mr-3 rounded-md text-white hover:bg-indigo-600">저장</button>
				<button class="bg-indigo-500 w-28 h-10 rounded-md text-white hover:bg-indigo-600">이전</button>
			</li>
		</ul>

		<!-- time -->
		<ul class="mb-10">
			<li class="border-b-2 border-indigo-300">
				<h1 class="text-3xl mb-3">Work Time</h1>
			</li>
			<li class="mt-5">
				<p>Notice</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt repellendus eos quaerat dolorum! Veritatis
					repellendus repellat quasi incidunt, minus quis ex, asperiores magni placeat, officiis dolorum. Animi culpa
					dolor dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt repellendus eos quaerat
					dolorum! Veritatis repellendus repellat quasi incidunt, minus quis ex, asperiores magni placeat, officiis
					dolorum. Animi culpa dolor
					dolorum.sajfksdajflksdajflkdsajfklajslfkjaslkdfjsadklfjlkasdjfklsajdlkfjdsalkfjaslkfjsdalk
				</p>
			</li>
			<li class="mt-5">
				<ul class="grid grid-cols-2 text-center">
					<li class="bg-indigo-300 text-white h-10 leading-10">공통</li>
					<li>개별</li>
				</ul>
			</li>
			<li>
				<p>
					공통일때는 work day를 모두 disable로 처리, 개별을 work day모두 활성화
				</p>
				<ul class="flex my-5">
					<li class="bg-indigo-200 rounded-md w-10 h-10 mr-5 leading-10 text-center">월</li>
					<li class="bg-indigo-200 rounded-md w-10 h-10 mr-5 leading-10 text-center">화</li>
					<li class="bg-indigo-200 rounded-md w-10 h-10 mr-5 leading-10 text-center">수</li>
					<li class="bg-indigo-200 rounded-md w-10 h-10 mr-5 leading-10 text-center">목</li>
					<li class="bg-indigo-200 rounded-md w-10 h-10 mr-5 leading-10 text-center">금</li>
				</ul>
			</li>
			<li>
				<input type="text" />
				<button>확인</button>
			</li>
			<li>
				<span
					class="
            bg-indigo-400
            text-white text-center
            inline-block
            w-28
            h-10
            leading-10
            mr-5
            rounded-md
          "
				>
					09:00
				</span>
				<span
					class="
            bg-indigo-400
            text-white text-center
            inline-block
            w-28
            h-10
            leading-10
            mr-5
            rounded-md
          "
				>
					10:00
				</span>
				<span
					class="
            bg-indigo-400
            text-white text-center
            inline-block
            w-28
            h-10
            leading-10
            mr-5
            rounded-md
          "
				>
					11:00
				</span>
				<span
					class="
            bg-indigo-400
            text-white text-center
            inline-block
            w-28
            h-10
            leading-10
            mr-5
            rounded-md
          "
				>
					12:00
				</span>
				<span
					class="
            bg-indigo-400
            text-white text-center
            inline-block
            w-28
            h-10
            leading-10
            mr-5
            rounded-md
          "
				>
					13:00
				</span>
			</li>
			<li class="text-right">
				<button class="bg-indigo-500 w-28 h-10 rounded-md text-white hover:bg-indigo-600">저장</button>
				<button class="bg-indigo-500 w-28 h-10 rounded-md text-white hover:bg-indigo-600">이전</button>
			</li>
		</ul>

		<!-- item -->
		<ul class="mb-10">
			<li class="border-b-2 border-indigo-300">
				<h1 class="text-3xl mb-3">Item등록</h1>
			</li>
			<li class="mt-5">
				<p>Notice</p>
				<p>
					아이템별로 설정할 수 있습니다.
				</p>
			</li>
			<li>
				<select name="" id="">
					<option value="">김지혜 디자이너</option>
					<option value="">박수진 디자이너</option>
					<option value="">최진희 디자이너</option>
				</select>
			</li>
			<li>
				<label class="select-none container relative cursor-pointer pl-7 mr-6">
					<input class="absolute opacity-0 left-0 top-0 cursor-pointer" type="radio" checked="checked" />
					<span class="h-6 w-6 checkmark absolute top-0 left-0 bg-white border border-indigo-200 rounded"></span>
					<span class="align-top">아이템 수량 활성화</span>
				</label>
				<label class="select-none container relative cursor-pointer pl-7 mr-6">
					<input class="absolute opacity-0 left-0 top-0 cursor-pointer" type="radio" checked="checked" />
					<span class="h-6 w-6 checkmark absolute top-0 left-0 bg-white border border-indigo-200 rounded"></span>
					<span class="align-top">아이템 선택(필수)</span>
				</label>
			</li>
			<li class="text-right">
				<button class="bg-indigo-500 w-28 h-10 rounded-md text-white hover:bg-indigo-600">저장</button>
				<button class="bg-indigo-500 w-28 h-10 rounded-md text-white hover:bg-indigo-600">이전</button>
			</li>
		</ul>

		<!-- insert -->
		<!-- 등록 눌리면 팝업창 띄우고 모든 설정 정리해서 보여주고 다시 (확인),(취소) 눌린다 -->
		<ul class="flex mb-10 border-indigo-700 border-t-2">
			<li class="mr-5">등록</li>
			<li>초기화</li>
		</ul>
	</div>
</template>

<script>
import { apiGetCodeByGroup } from "@/api/code";
import { COMMON_C } from "@/utils/const";

export default {
	data() {
		return {
			sectorDatas: "",
		};
	},
	created() {
		this.getSectorList();
	},
	methods: {
		async getSectorList() {
			try {
				const res = await apiGetCodeByGroup({ group: COMMON_C.sto });
				this.sectorDatas = res.data.data.list;
			} catch (e) {
				console.log("Get Sector List E :", e);
			}
		},
	},
};
</script>

<style scoped>
/* checkbox */
.container:hover input ~ .checkmark {
	background-color: #6365f142;
}
.container input:checked ~ .checkmark {
	background-color: #6366f1;
}
.container input:checked ~ span {
	color: #6366f1;
}
.checkmark:after {
	content: "";
	position: absolute;
	display: none;
}
.container input:checked ~ .checkmark:after {
	display: block;
}
.container .checkmark:after {
	left: 5px;
	top: 2px;
	width: 5px;
	height: 10px;
	border: solid white;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}
</style>
