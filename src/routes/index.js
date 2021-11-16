import Vue from "vue";
import VueRouter from "vue-router";
import user from "@/routes/user";
import store from "@/routes/store";
import storage from "@/storage/index";
import intro from "@/routes/intro";
import error from "@/routes/error";
import notice from "@/utils/notice";
import { NOTICE_TITLE } from "@/utils/const";
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
			meta: { isNotSignin: true },
		},
		{
			path: "/signup/approval",
			name: "signupAppro",
			component: () => import("@/views/user/account/SignupApproval.vue"),
			meta: { isNotSignin: true },
		},
		{
			path: "/terms",
			component: () => import("@/views/user/terms/Terms.vue"),
			children: [
				{
					path: "/terms/service",
					name: "serviceTerms",
					component: () => import("@/views/user/terms/ServiceTerms.vue"),
				},
				{
					path: "/terms/person",
					name: "personTerms",
					component: () => import("@/views/user/terms/PersonTerms.vue"),
				},
			],
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
 * 전역 라우터
 */
router.beforeEach(async (to, from, next) => {
	// 로그인 상태일 경우 접근 불가
	if (to.meta.isNotSignin && storage.state.token) {
		await notice.alert({ title: NOTICE_TITLE.WAR, text: "이미 로그인 상태로 접근이 불가능 합니다." });
		return next({ name: "home" });
	}

	// 로그인 상태일 경우만 접근 가능
	if (to.meta.isSignin && !storage.state.token) {
		alert("로그인이 필요한 서비스 입니다.");
		return next({ name: "signin" });
	}

	next();
});

export default router;
