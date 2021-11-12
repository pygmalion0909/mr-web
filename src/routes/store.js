export default [
	{
		path: "/store",
		name: "store",
		component: () => import("@/views/user/store/Index.vue"),
		children: [
			{
				path: "/store-home/:storeId",
				name: "store-home",
				component: () => import("@/views/user/store/components/StoreHome.vue"),
			},
		],
	},
];
