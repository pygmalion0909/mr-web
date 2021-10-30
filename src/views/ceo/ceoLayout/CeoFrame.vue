<template>
	<div class="min-h-screen">
		<!-- pc -->
		<!-- <Side></Side> -->

		<!-- mobile -->
		<div class="bg-indigo-500 w-full h-16 py-1">
			<div class="bg-red-500 mx-4 w-16 h-full"></div>
		</div>

		<!-- contents -->
		<div class="w-full px-4 pt-5">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
// import Side from "@/views/ceoLayout/Side";

export default {
	components: {
		// Side,
	},
};
</script>

<style></style>
