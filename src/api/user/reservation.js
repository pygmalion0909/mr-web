import axiosApi from "@/api/user/index";

const baseURL = "/reservation";

// get work day list
export function apiGetRsvDay(storeId) {
	return axiosApi(`${baseURL}/day/${storeId}`);
}

// get reservation full date list
export function apiGetRsvFullDate(payload) {
	return axiosApi(`${baseURL}/full-date?yearMth=${payload.yearMth}&storeId=${payload.storeId}`);
}

// reservation
export function apiGetReservationList() {
	// return axiosApi.get(`/reservation/day/${payload.storeId}`);
}
export function apiGetRsvTimeList(payload) {
	console.log("reservation time payload", payload);
	const res = {
		data: {
			data: {
				list: [
					{ id: "1", time: "09:00", status: "Y" },
					{ id: "2", time: "10:00", status: "N" },
					{ id: "3", time: "11:00", status: "N" },
					{ id: "4", time: "12:00", status: "Y" },
					{ id: "5", time: "13:00", status: "Y" },
					{ id: "6", time: "14:00", status: "N" },
					{ id: "7", time: "15:00", status: "N" },
					{ id: "8", time: "16:00", status: "Y" },
					{ id: "9", time: "17:00", status: "Y" },
					{ id: "10", time: "18:00", status: "Y" },
				],
			},
		},
	};
	return res;
	// return axiosApi.get(`/time/${payload.workDayId}`);
}

export function apiGetItem() {
	// return axiosApi.get(`/item`);
}
