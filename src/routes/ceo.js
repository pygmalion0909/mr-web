export default [
	{
		path: "/ceo",
		name: "ceo-home",
		component: () => import("@/views/ceo/CeoHome.vue"),
	},
	{
		path: "/work",
		name: "work",
		component: () => import("@/views/ceo/Work.vue"),
	},
];
