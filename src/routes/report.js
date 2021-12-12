export default [
	{
		path: "/report",
		component: () => import("@/views/user/report/Report.vue"),
		children: [
			{
				path: "/report/list",
				name: "report-list",
				component: () => import("@/views/user/report/ReportList.vue"),
			},
			{
				path: "/report/detail",
				name: "report-detail",
				component: () => import("@/views/user/report/ReportDetail.vue"),
			},
		],
	},
];
