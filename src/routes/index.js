import Vue from "vue";
import VueRouter from "vue-router";
import user from "@/routes/user";
import store from "@/routes/store";
import storage from "@/storage/index";
import intro from "@/routes/intro";
import error from "@/routes/error";
// import ceo from "@/routes/ceo";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/",
			component: () => import("@/views/user/layout/Frame.vue"),
			children: [
				{
					path: "",
					name: "home",
					component: () => import("@/views/user/home/Home.vue"),
				},
				...store,
				...intro,
				...user,
			],
		},
		// single page
		{
			path: "/signup",
			name: "signup",
			component: () => import("@/views/user/account/Signup.vue"),
			meta: { isAccount: false },
		},
		// ceo페이지
		// {
		// 	path: "/ceo",
		// 	component: () => import("@/views/ceoLayout/CeoFrame.vue"),
		// 	children: [...ceo],
		// },
		...error,
	],
});

/**
 * @NOTICE 전역 라우터
 */
router.beforeEach((to, from, next) => {
	// 로그인 상태일 경우 접근 불가
	if (to.meta.isAccount === false && storage.state.accountInfo) {
		alert("이미 접속중 입니다.");
		next({ name: "home" });
	}
	next();
});

export default router;
