export default [
	{
		path: "",
		name: "intro",
		component: () => import("@/views/user/intro/Frame.vue"),
		children: [
			{
				path: "/mr",
				name: "mr",
				component: () => import("@/views/user/intro/Mr.vue"),
			},
		],
	},
];
