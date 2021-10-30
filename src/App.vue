<template>
	<div id="app">
		<router-view></router-view>
		<Spinner v-if="this.$store.state.isSpinner"></Spinner>
		<Notice v-if="this.$store.state.notice.isOn"></Notice>
	</div>
</template>

<script>
import Spinner from "@/components/user/Spinner";
import Notice from "@/components/user/Notice";

export default {
	components: {
		Spinner,
		Notice,
	},
};
</script>
