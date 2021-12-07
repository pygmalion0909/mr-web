import notice from "@/utils/notice";
import { NOTICE_TITLE, ERR_CD } from "@/utils/const";

const common = async err => {
	let text;
	switch (err.response.data.errCd) {
		case ERR_CD.NOT_FOUND:
			text = "정보를 찾을 수 없습니다.<br/>확인 후 다시 시도해주세요.";
			break;
		case ERR_CD.FAIL_MAIL:
			text = "메일 전송에 실패하였습니다.<br/>다음에 다시 시도해주세요.";
			break;
		case ERR_CD.VALID:
			text = "필수정보를 입력하지 않았거나<br/>유효하지 않는 정보를 입력하였습니다<br/>확인 후 다시 시도해주세요.";
			break;
		case ERR_CD.DUPL:
			text = "입력하신 값 중에서 중복이 발생하였습니다.<br/>확인 후 다시 한번 시도해주세요.";
			break;
		case ERR_CD.FORBIDDEN:
			text = "해당 서비스는 로그인 후 이용 가능합니다.";
			break;
		default:
			text =
				"죄송합니다<br/>해당 서비스 이용이 불가능합니다.<br/>고객센터(010-5237-4945)로 연락 주시면 빠른 시일 내로 처리하겠습니다.";
			break;
	}

	return notice.alert({ title: NOTICE_TITLE.WAR, text: text });
};

export default {
	common,
};
