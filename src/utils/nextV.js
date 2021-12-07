import notice from "@/utils/notice";
import { NOTICE_TITLE } from "@/utils/const";

const myPage = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "나의 페이지" 에서<br/>
          1. 나의 예약 정보<br/>
          2. 개인정보변경<br/>
          3. 리뷰 작성<br/>
          서비스를 만나볼 수 있습니다.`,
	});
};
const badge = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "뱃지" 에서<br/>
          1. 뱃지 기능 소개<br/>
          2. 뱃지 점수<br/>
          서비스를 만나볼 수 있습니다.`,
	});
};
const noticeMr = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "공지사항" 에서<br/>
          Make Reservation의 따끈따끈~한 소식을 빠르게 만날 수 있습니다.
          `,
	});
};
const ceo = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "CEO매니저센터" 에서<br/>
          CEO분들이 사용하는 가게 등록, 예약 설정 및 관리를 포함한
          다양하고 편리한 기능을 만날 볼 수 있습니다.
          `,
	});
};
const bookmark = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "북마크" 에서<br/>
          간직하고 싶은 가게를 저장할 수 있는 기능을 만날 볼 수 있습니다.
          `,
	});
};
const item = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "아이템" 에서<br/>
          판매하고 있는 상품을 자세히 만날 볼 수 있습니다.
          `,
	});
};
const review = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "리뷰" 에서<br/>
          가게를 이용한 회원님들의 솔직한 마음을 만날 볼 수 있습니다.
          `,
	});
};
const stoBadge = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "뱃지" 에서<br/>
          가게에서 획득한 뱃지를 확인 할 수 있습니다.
          `,
	});
};
const request = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "문의" 에서<br/>
          가게 사장님과 소통할 수 있는 기능을 만날 볼 수 있습니다.
          `,
	});
};
const question = async () => {
	await notice.alert({
		title: NOTICE_TITLE.NOTI,
		text: `서비스 준비 중입니다.😊<br/>
          "1:1문의" 에서<br/>
          회원님들의 궁금증을 다이렉트로 해결해 드립니다.
          `,
	});
};

export default {
	myPage,
	badge,
	noticeMr,
	ceo,
	bookmark,
	item,
	review,
	stoBadge,
	request,
	question,
};
