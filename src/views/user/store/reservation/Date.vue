<template>
	<div>
		<ul class="flex border-b-2 mb-3">
			<li class="text-indigo-500 store-rv__tab w-1/2 h-10 leading-10 text-center tracking-widest :hover cursor-pointer">
				예약
			</li>
			<li class="text-gray-400 w-1/2 h-10 leading-10 text-center tracking-widest :hover cursor-pointer">
				포장/주문
			</li>
		</ul>

		<div class="text-right">
			<span class="text-sm mr-2"><span class="text-active font-nB">MR</span> 예약가능 |</span>
			<span class="text-sm"><span class="text-noneActive font-nB">MR</span> 예약불가</span>
		</div>
		<Calendar :storeId="storeId"></Calendar>
	</div>
</template>

<script>
import Calendar from "@/components/user/Calendar";

export default {
	components: {
		Calendar,
	},
	data() {
		return {
			storeId: this.$route.params.storeId,
		};
	},
	methods: {},
};
</script>

<style></style>
