<template>
	<div class="bg-indigo-400 w-1/6">
		<!-- <div class="bg-green-400 w-52 h-52 rounded-full m-auto my-10"></div> -->
		<ul class="text-center">
			<li>
				<router-link class="text-white" :to="{ name: 'ceo-home' }">
					Home
				</router-link>
			</li>
			<li>
				<router-link class="text-white" :to="{ name: 'work' }">
					상품
				</router-link>
			</li>
			<li>
				<router-link class="text-white" :to="{ name: 'work' }">
					정기성 Work 설정
				</router-link>
			</li>
			<li>
				<router-link class="text-white" :to="{ name: 'work' }">
					단발성 Work 설정
				</router-link>
			</li>
			<li>
				<router-link class="text-white" :to="{ name: 'work' }">
					예약관리
				</router-link>
			</li>
			<li>
				<router-link class="text-white" :to="{ name: 'work' }">
					알림 서비스
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
