export default [
	{
		path: "/accounts",
		component: () => import("@/views/user/account/Index.vue"),
		children: [
			{
				path: "/signin",
				name: "signin",
				component: () => import("@/views/user/account/Signin.vue"),
				meta: { isAccount: false },
			},

			{
				path: "/signup/approval",
				name: "signupAppro",
				component: () => import("@/views/user/account/SignupApproval.vue"),
				meta: { isAccount: false },
			},
			{
				path: "/search/login-id",
				name: "searchLoginId",
				component: () => import("@/views/user/account/SearchLoginId.vue"),
				meta: { isAccount: false },
			},
			{
				path: "/search/password",
				name: "searchPassword",
				component: () => import("@/views/user/account/SearchPassword.vue"),
				meta: { isAccount: false },
			},
		],
	},
];
