<template>
	<div class="intro">
		<ul class="intro__nav">
			<li class="intro__nav-li ligth-li">
				<router-link class="intro__nav-link" :class="{ intro_light_link: lightLink === 'mr' }" :to="{ name: 'mr' }">
					Make Reservation
				</router-link>
			</li>
			<li class="intro__nav-li">
				<a @click="ready">공지사항</a>
			</li>
			<li class="intro__nav-li">
				<a class="intro__nav-link" @click="ready">문의하기</a>
			</li>
			<li class="intro__nav-li">
				<a class="intro__nav-link" @click="ready">신고하기</a>
			</li>
		</ul>
		<!-- dropdown -->
		<div>
			<div class="w-full relative inline-block text-left dropdown">
				<span class="rounded-md shadow-sm">
					<button
						class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
						type="button"
					>
						<span>Category</span>
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
						class="w-full absolute left-0.2 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
						id="headlessui-menu-items-117"
					>
						<div class="py-1">
							<p
								class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:text-white hover:bg-red-500 hover: cursor-pointer"
								@click="test"
							>
								Make Reservation
							</p>
							<p
								class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:text-white hover:bg-red-500 hover: cursor-pointer"
							>
								공지사항
							</p>
							<p
								class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:text-white hover:bg-red-500 hover: cursor-pointer"
							>
								문의하기
							</p>
							<p
								class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:text-white hover:bg-red-500 hover: cursor-pointer"
							>
								신고하기
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {
			lightLink: "mr",
		};
	},
	created() {
		this.lightLink = this.$route.name;
	},
	methods: {
		ready() {
			return alert("🌚🌚🌚🌚🌚🌚🌚🌚🌚🌚\n작업률 0% ");
		},
		test() {
			console.log("hello world!");
		},
	},
	watch: {
		$route(to, from) {
			if (to.name !== from.name) this.lightLink = to.name;
		},
	},
};
</script>

<style></style>
