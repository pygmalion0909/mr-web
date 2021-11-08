<template>
	<div class="frame">
		<Header></Header>
		<div class="frame_contents">
			<router-view></router-view>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
import Header from "@/views/user/layout/Header";
import Footer from "@/views/user/layout/Footer";

export default {
	components: {
		Header,
		Footer,
	},
};
</script>
