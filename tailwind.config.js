const color = {
	main: "#6366F1",
	dk1: "#484554",
	active: "#00ff2a",
	noneActive: "#aaa8a8",
	// primary: "#3490dc",
	// secondary: "#ffed4a",
	// danger: "#e3342f",
};

module.exports = {
	mode: "jit", // px단위 사용을 위한 모드 설정
	purge: ["./index.html", "@/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		// 반응형 스크린 사이즈
		screens: {
			xs: "350px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		fontFamily: {
			nL: ["nexonLv1Light"],
			nB: ["nexonLv1Bold"],
		},
		backgroundColor: theme => ({
			...theme("colors"),
			active: color.active,
			noneActive: color.noneActive,
			main: color.main,
			dk1: color.dk1,
		}),
		textColor: theme => ({
			...theme("colors"),
			active: color.active,
			noneActive: color.noneActive,
		}),
		extend: {},
	},
	variants: {
		extend: {
			display: ["group-focus"],
		},
	},
	plugins: [],
};
