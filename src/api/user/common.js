// import axiosApi from "@/api/user/index";

// TODO 삭제 요망
// get common code list
export function apiGetCommonCdList() {
	const res = {
		data: {
			data: {
				cmList: [
					{ cd: "STIN01", name: "Home" },
					{ cd: "STIN03", name: "리뷰" },
				],
			},
		},
	};
	return res;
	// return axiosApi.get(
	// 	`/stores?search=${payload.search}&sector=${payload.sector}&badge=${payload.badge}&areaSi=${payload.areaSi}&areaGu=${payload.areaGu}`,
	// );
}
