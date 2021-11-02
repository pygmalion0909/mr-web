export default [
	{
		path: "/account",
		component: () => import("@/views/user/account/Index.vue"),
		children: [
			{
				path: "/signin",
				name: "signin",
				component: () => import("@/views/user/account/Signin.vue"),
				meta: { isNotSignin: true },
			},
			{
				path: "/search-user",
				component: () => import("@/views/user/account/searchUser/SearchUser.vue"),
				meta: { isNotSignin: true },
				children: [
					{
						path: "/search-user/login-id",
						name: "searchLoginId",
						component: () => import("@/views/user/account/searchUser/SearchLoginId.vue"),
						meta: { isNotSignin: true },
					},
					{
						path: "/search-user/password",
						name: "searchPasswd",
						component: () => import("@/views/user/account/searchUser/SearchPassword.vue"),
						meta: { isNotSignin: true },
					},
				],
			},
		],
	},
];
