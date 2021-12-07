import Vue from "vue";
import App from "./App.vue";

// router
import router from "@/routes/index";

// vuex
import storage from "@/storage/index";

// validtion
import VeeValidate from "vee-validate";
import "@/utils/validProvider";

// tailwind
import "@/assets/css/index.css";

// logger
import VueLogger from "vuejs-logger";
// const env = process.env.NODE_ENV
// const logLevel = env === 'development' ? 'debug' : env === 'info' ? 'debug' : env === 'production' ? 'error' : 'info'
const options = {
	isEnabled: true,
	logLevel: "debug",
	stringifyArguments: false,
	showLogLevel: true,
	showMethodName: true,
	separator: "|",
	showConsoleColors: true,
};
Vue.use(VueLogger, options);

Vue.config.productionTip = false;
new Vue({
	render: h => h(App),
	router,
	store: storage,
	VeeValidate,
}).$mount("#app");
