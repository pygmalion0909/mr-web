import { BADGE_INFO } from "@/utils/const";

// set badge data(icon, color)
export const setBadgeStyleTypeList = list => {
	list.forEach(el => {
		el.color = BADGE_INFO[el.cd].color;
		el.icon = BADGE_INFO[el.cd].icon;
	});
};
