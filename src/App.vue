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
import noticeFnc from "@/utils/notice";
import { NOTICE_TITLE } from "@/utils/const";

export default {
	components: {
		Spinner,
		Notice,
	},
	created() {
		this.checkIOS();
	},
	methods: {
		async checkIOS() {
			const agent = navigator.userAgent.toLowerCase();
			if (agent.indexOf("iphone") > -1 || agent.indexOf("ipad") > -1 || agent.indexOf("ipod") > -1) {
				await noticeFnc.alert({
					title: NOTICE_TITLE.NOTI,
					text: `IOS환경(Iphone, Ipad)으로 접속 하였습니다.<br/>
						현재 IOS환경에서 이슈가 발생하여 서비스 이용에 제한이 있을 수 있습니다.<br/>
						PC 또는 Android로 접속하시면 원활한 서비스를 이용할 수 있습니다.<br/>
						이슈 해결을 위해 최선을 다하고 있으며, 불편하시더라도 양해 부탁드립니다. 감사합니다.<br/>`,
				});
			}
		},
	},
};
</script>
