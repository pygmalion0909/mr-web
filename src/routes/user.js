export default [
	{
		path: "/account",
		component: () => import("@/views/user/account/Index.vue"),
		children: [
			{
				path: "/signin",
				name: "signin",
				component: () => import("@/views/user/account/Signin.vue"),
				meta: { isSignin: false },
			},
			{
				path: "/search-user",
				component: () => import("@/views/user/account/searchUser/SearchUser.vue"),
				meta: { isSignin: false },
				children: [
					{
						path: "/search-user/login-id",
						name: "searchLoginId",
						component: () => import("@/views/user/account/searchUser/SearchLoginId.vue"),
						meta: { isSignin: false },
					},
					{
						path: "/search-user/password",
						name: "searchPasswd",
						component: () => import("@/views/user/account/searchUser/SearchPassword.vue"),
						meta: { isSignin: false },
					},
				],
			},
		],
	},
];
