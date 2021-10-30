import axiosApi from "@/api/user/index";

const baseURL = "/areas";

// get area si list
export function apiGetAreaSi() {
	return axiosApi.get(`${baseURL}/area-si`);
}

// get area gu list
export function apiGetAreaGu(payload) {
	return axiosApi.get(`${baseURL}/area-gu?id=${payload.id}`);
}
