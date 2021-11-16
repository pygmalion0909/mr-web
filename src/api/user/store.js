import axiosApi from "@/api/user/index";

const baseURL = "/stores";

// get store list
export function apiGetStoreList(payload) {
	return axiosApi.get(
		`${baseURL}?search=${payload.search}&sectorCd=${payload.sectorCd}&subSectorCd=${payload.subSectorCd}&badgeCd=${payload.badgeCd}&areaSiCd=${payload.areaSiCd}&areaGuCd=${payload.areaGuCd}&limit=${payload.limit}&offset=${payload.offset}`,
	);
}

// get store bas imgs
export function apiGetStoreBasImgs(storeId) {
	return axiosApi.get(`${baseURL}/bas/imgs/${storeId}`);
}

// get store info
export function apiGetStoreBasInfo(storeId) {
	return axiosApi.get(`${baseURL}/bas/${storeId}`);
}

// get store sector list
export function apiGetStoreSector() {
	return axiosApi.get(`${baseURL}/sectors`);
}

// get store sub-sector list
export function apiGetStoreSubSector(payload) {
	return axiosApi.get(`${baseURL}/sub-sectors?id=${payload.id}`);
}
