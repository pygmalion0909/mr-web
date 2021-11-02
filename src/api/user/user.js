import axiosApi from "@/api/user/index";

const baseURL = "/auths";

export function apiSignup(payload) {
	return axiosApi.post(`${baseURL}`, payload);
}
export function apiUpdatePasswd(payload) {
	return axiosApi.put(`${baseURL}/update/passwd`, payload);
}
export function apiSignin(payload) {
	return axiosApi.post(`${baseURL}/signin`, payload);
}
export function apiSearchLoginId(payload) {
	return axiosApi.get(`${baseURL}/search/login-id?email=${payload.email}`);
}
export function apiSearchPasswd(payload) {
	return axiosApi.put(`${baseURL}/search/passwd`, payload);
}
export function apiReRequestAuthKey(payload) {
	return axiosApi.put(`${baseURL}/re-dispatch/auth-key`, payload);
}
