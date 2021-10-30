import Vue from "vue";
import Vuex from "vuex";
import { LOCAL_S } from "@/utils/const";

Vue.use(Vuex);

const storage = new Vuex.Store({
	state: {
		accountInfo: JSON.parse(localStorage.getItem(LOCAL_S.ac)) || null,
		isSpinner: false,
		notice: {
			isOn: false,
			type: "",
			title: "",
			text: "",
			result: "",
		},
	},
	mutations: {
		// signin
		setAccountInfo(state, payload) {
			localStorage.setItem(LOCAL_S.ac, JSON.stringify(payload));
			state.accountInfo = payload;
		},
		// logout
		removeAccountInfo(state) {
			localStorage.removeItem(LOCAL_S.ac);
			state.accountInfo = null;
		},
		// spinner
		onSpinner(state) {
			state.isSpinner = true;
		},
		offSpinner(state) {
			setTimeout(() => {
				state.isSpinner = false;
			}, 300);
		},
		// notice
		setNotice(state, pyalod) {
			state.notice.isOn = pyalod.isOn;
			state.notice.type = pyalod.isOn ? pyalod.type : "";
			state.notice.title = pyalod.isOn ? pyalod.title : "";
			state.notice.text = pyalod.isOn ? pyalod.text : "";
			state.notice.result = pyalod.isOn ? pyalod.result : "";
		},
	},
});

export default storage;
