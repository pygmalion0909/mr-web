// TODO 확인 후 사용하지 않으면 삭제
export const ROLE = {
	use: "USE",
	sto: "STO",
	use_s: "ROLE_USER",
	sto_s: "ROLE_STORE",
};

export const LOCAL_S = {
	TK: "TOKEN",
};

export const COMMON_C = {
	sto: "STORE",
	bad: "BADGE",
	// 지역(시)
	are_si: "AREASI",
	are_gu: "AREAGU",
	// 가게상세
	stHome: "STIN01",
	stReview: "STIN03",
};

export const SECTOR_CD = {
	BUT: "BUT",
	FOO: "FOO",
	CLA: "CLA",
	SHO: "SHO",
	SPO: "SPO",
	HOS: "HOS",
	ETC: "ETC",
};

// key값과 badge의 code값(db에 저장된)과 동일해야함
export const BADGE_INFO = {
	GOO: {
		color: "#F8485E",
		icon: "far fa-smile",
	},
	CLE: {
		color: "#2940D3",
		icon: "fab fa-digital-ocean",
	},
	SER: {
		color: "#FFC332",
		icon: "fab fa-angellist",
	},
	PRO: {
		color: "#70AF85",
		icon: "fas fa-user-tie",
	},

	COS: {
		color: "#726A95",
		icon: "fas fa-cookie",
	},
	ATM: {
		color: "#FF3399",
		icon: "far fa-moon",
	},
	DEL: {
		color: "#512D6D",
		icon: "fas fa-truck",
	},
};

export const NOTICE_TITLE = {
	NOTI: "NOTI",
	DONE: "DONE",
	WAR: "WAR",
};

export const ERR_CD = {
	DUPL: "0-00",
	VALID: "0-03",
	NOT_FOUND: "0-04",
	FAIL_MAIL: "0-05",
};
