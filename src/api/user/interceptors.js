export function setInterceptors(instance) {
	// 요청 인터셉터
	instance.interceptors.request.use(
		function(config) {
			// 요청 성공 직전 호출됩니다.
			return config;
		},
		function(error) {
			// 요청 에러 직전 호출됩니다.
			return Promise.reject(error);
		},
	);

	// 응답 인터셉터
	instance.interceptors.response.use(
		function(response) {
			/**
			 * http status가 200인 경우
			 * 응답 성공 직전 호출됩니다.
			 * .then() 으로 이어집니다.
			 */
			return response;
		},

		function(error) {
			/**
			 * http status가 200이 아닌 경우
			 * 응답 에러 직전 호출됩니다.
			 * .catch() 으로 이어집니다.
			 */
			return Promise.reject(error);
		},
	);
	return instance;
}
