import { BADGE_INFO, REPORT_INFO } from "@/utils/const";

// set badge data(icon, color)
export const setBadgeStyleTypeList = list => {
	list.forEach(el => {
		el.color = BADGE_INFO[el.cd].color;
		el.icon = BADGE_INFO[el.cd].icon;
	});
};

// set report data(color)
export const setReportStyleTypeList = list => {
	list.forEach(el => {
		el.color = REPORT_INFO[el.categoryCd].color;
	});
};

export const setReportStyleType = obj => {
	obj.color = REPORT_INFO[obj.categoryCd].color;
};
