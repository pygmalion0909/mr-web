<template>
	<div>
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
