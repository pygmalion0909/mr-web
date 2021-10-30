export default [
	{
		path: "store",
		name: "store",
		component: () => import("@/views/user/store/Index.vue"),
		children: [
			{
				path: "reply",
				name: "reply",
				component: () => import("@/views/user/store/detail/Reply.vue"),
			},
			{
				path: "reservation/date/:storeId",
				name: "reservationDate",
				component: () => import("@/views/user/store/reservation/Date.vue"),
			},
			{
				path: "reservation/making",
				name: "reservationMaking",
				component: () => import("@/views/user/store/reservation/Making.vue"),
			},
		],
	},
];
