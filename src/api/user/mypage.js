import axiosApi from "@/api/user/index";

const baseURL = "/mypage";

export function apiGetUserInfo(payload) {
	return axiosApi.get(`${baseURL}/info?cd=${payload.cd}`);
}
