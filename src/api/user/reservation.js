import axiosApi from "@/api/user/index";

const baseURL = "/reservation";

// get work day list
export function apiGetRsvDay(storeId) {
	return axiosApi.get(`${baseURL}/day/${storeId}`);
}

// get reservation full date list
export function apiGetRsvFullDate(payload) {
	return axiosApi.get(`${baseURL}/full-date?yearMth=${payload.yearMth}&storeId=${payload.storeId}`);
}

// get reservation time list
export function apiGetRsvTime(payload) {
	return axiosApi.get(`${baseURL}/time?dayCd=${payload.dayCd}&storeId=${payload.storeId}&rsvDt=${payload.rsvDt}`);
}

// get reservation item list
export function apiGetRsvItem(payload) {
	return axiosApi.get(`${baseURL}/item?dayCd=${payload.dayCd}&storeId=${payload.storeId}&rsvTms=${payload.rsvTms}`);
}

// register reservation
export function apiRegisterRsv(payload) {
	return axiosApi.post(`${baseURL}`, payload);
}
