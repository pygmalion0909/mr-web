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
	}
	return notice.alert({ title: NOTICE_TITLE.WAR, text: text });
};

export default {
	common,
};
