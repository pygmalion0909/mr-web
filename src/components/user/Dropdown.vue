<template>
	<div class="border w-full relative inline-block text-left dropdown rounded-md">
		<span class="rounded-md shadow-sm">
			<button
				class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
				type="button"
			>
				<span class="w-full text-left">{{ nowTab }}</span>
				<svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					></path>
				</svg>
			</button>
		</span>
		<div
			class="w-full opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
		>
			<div
				class="w-full absolute left-0.2 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
				id="headlessui-menu-items-117"
			>
				<div class="py-1">
					<p
						class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:text-white hover:bg-indigo-500 hover: cursor-pointer"
						v-for="item in tabList"
						:key="item.id"
						@click="selectTab(item)"
					>
						{{ item.name }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	/**
	 * @NOTICE
	 * tabList 구조 {cd: '', name: ''}
	 */
	props: {
		tabList: {
			default: null,
		},
	},
	data() {
		return {
			nowTab: "",
		};
	},
	methods: {
		selectTab(val) {
			this.nowTab = val.name;
			this.$emit("selectTab", val);
		},
	},
	watch: {
		tabList() {
			if (this.tabList) this.nowTab = this.tabList[0].name;
			this.$emit("selectTab", this.tabList[0]);
		},
	},
};
</script>

<style scoped>
.dropdown:focus-within .dropdown-menu {
	opacity: 1;
	transform: translate(0) scale(1);
	visibility: visible;
}
</style>
