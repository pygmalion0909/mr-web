import axiosApi from "@/api/user/index";

const baseURL = "/reports";

// get report list
export function apiGetReportList(payload) {
	return axiosApi.get(`${baseURL}?offset=${payload.offset}&limit=${payload.limit}`);
}

// get report detail
export function apiGetReportDetail(reportId) {
	return axiosApi.get(`${baseURL}/${reportId}`);
}

// get report display yn
export function apiGetReportDisplay() {
	return axiosApi.get(`${baseURL}/display`);
}
