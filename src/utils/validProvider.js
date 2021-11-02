import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { email, required, confirmed, numeric, size, min } from "vee-validate/dist/rules";

/**
 * set validation
 */
//email type
extend("email", {
	...email,
	message: "이메일 형식을 확인 해주세요",
});
//maximum size
extend("size", {
	...size,
	message: "파일크기를 초과 하였습니다.",
});
//only number
extend("numeric", {
	...numeric,
	message: "번호만 입력하세요",
});
//password and rePassword check
extend("confirmed", {
	...confirmed,
	message: "비밀번호가 일치 하지 않습니다",
});
extend("required", {
	...required,
	message: "필수항목 입니다.",
});
extend("min", {
	...min,
	message: "비밀번호는 10자리 이상 입니다.",
});

/**
 * customizing validation
 */
// passwordPattern
extend("passwdPattern", value => {
	const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
	if (regExp.test(value)) return true;
	return "6자리 이상, 영문 + 숫자 + 특수문자 포함";
});

Vue.component("valid", ValidationProvider);
Vue.component("validObserver", ValidationObserver);
