export default [
	{
		path: "/store",
		name: "store",
		component: () => import("@/views/user/store/Store.vue"),
		children: [
			{
				path: "/store-home/:storeId",
				name: "store-home",
				component: () => import("@/views/user/store/components/StoreHome.vue"),
			},
		],
	},
];
