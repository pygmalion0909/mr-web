export default [
	{
		path: "*",
		component: () => import("@/views/common/errors/NotFound.vue"),
	},
];
