import axiosApi from "@/api/user/index";

export function apiSignup(payload) {
	return axiosApi.post(`/users`, payload);
}
export function apiUpdateUser(payload) {
	return axiosApi.put(`/users`, payload);
}
export function apiSignin(payload) {
	return axiosApi.post(`/users/signin`, payload);
}
export function apiSearchLoginId(payload) {
	return axiosApi.post(`/users/search/loginId`, payload);
}
export function apiSearchPassword(payload) {
	return axiosApi.post(`/users/search/password`, payload);
}
