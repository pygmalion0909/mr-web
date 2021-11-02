import storage from "@/storage/index.js";
import { Promise } from "core-js";

const alert = payload => {
	return new Promise((resolve, reject) => {
		try {
			storage.commit("setNotice", common("ALERT", payload, resolve));
		} catch (error) {
			reject(error);
		}
	});
};

const confirm = payload => {
	return new Promise((resolve, reject) => {
		try {
			storage.commit("setNotice", common("CONFIRM", payload, resolve));
		} catch (error) {
			reject(error);
		}
	});
};

const common = (type, payload, resolve) => {
	return {
		type: type,
		isOn: true,
		title: payload.title,
		text: payload.text,
		result: function(isResult) {
			resolve(isResult);
		},
	};
};

export default {
	alert,
	confirm,
};
