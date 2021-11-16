import Vue from "vue";
import Vuex from "vuex";
import { LOCAL_S } from "@/utils/const";

Vue.use(Vuex);

const storage = new Vuex.Store({
	state: {
		token: JSON.parse(localStorage.getItem(LOCAL_S.TK)) || "",
		storeBasInfo: "",
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
		setToken(state, token) {
			localStorage.setItem(LOCAL_S.TK, JSON.stringify(token));
			state.token = token;
		},
		// logout
		setLogout(state) {
			localStorage.removeItem(LOCAL_S.TK);
			state.token = "";
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
