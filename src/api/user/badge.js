import axiosApi from "@/api/user/index";

const baseURL = "/badges";

// get badge list
export function apiGetBadge() {
	return axiosApi.get(`${baseURL}`);
}

// get store badge list
export function apiGetStoreBadgeList(storeId) {
	return axiosApi.get(`${baseURL}/${storeId}`);
}
