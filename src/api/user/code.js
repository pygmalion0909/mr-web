import axiosApi from "@/api/user/index";

// TODO 삭제 요망
export function apiGetCodeByGroup(payload) {
	return axiosApi.get(`/code?group=${payload.group}`);
}

export function apiGetCodeByRefId(payload) {
	return axiosApi.get(`/code?refId=${payload.refId}`);
}
