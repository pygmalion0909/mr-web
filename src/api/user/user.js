import axiosApi from "@/api/user/index";

const baseURL = "/auths";

export function apiUpdatePasswd(payload) {
	return axiosApi.put(`${baseURL}/update/passwd`, payload);
}
export function apiSignup(payload) {
	return axiosApi.post(`${baseURL}/signup`, payload);
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
export function apiCheckUserDuplication(payload) {
	return axiosApi.post(`${baseURL}/duplication`, payload);
}
export function apiSignupCertification(payload) {
	return axiosApi.put(`${baseURL}/signup/certification`, payload);
}
