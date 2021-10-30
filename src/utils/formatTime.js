//sec to msec
export function formatTimeMsec(msec) {
	if (!msec) return "00:00";
	const hour = ("0" + Math.floor(msec / 3600000)).slice(-2);
	const minutes = ("0" + Math.floor((msec % 3600000) / 60000)).slice(-2);
	const seconds = ("0" + Math.floor(msec % 60000)).slice(-2);
	return msec >= 3600 ? [hour, minutes, seconds].join(":") : [minutes, seconds].join(":");
}

//sec to string
export function formatTimeSec(sec) {
	if (!sec) return "00:00";
	const hour = ("0" + Math.floor(sec / 3600)).slice(-2);
	const minutes = ("0" + Math.floor((sec % 3600) / 60)).slice(-2);
	const seconds = ("0" + Math.floor(sec % 60)).slice(-2);
	return sec >= 3600 ? [hour, minutes, seconds].join(":") : [minutes, seconds].join(":");
}

//usf to sec
export function transformUsfToSec(usf) {
	const timeFomatArr = usf.split(":");
	let horToSec = Number(timeFomatArr[0] * 60) * 60;
	let minToSec = Number(timeFomatArr[1]) * 60;
	let sec = Number(timeFomatArr[2]);
	return horToSec + minToSec + sec;
}

//sec to usf
export function transformSecToUsf(sec) {
	const hour = ("0" + Math.floor(sec / 3600)).slice(-2);
	const minutes = ("0" + Math.floor((sec % 3600) / 60)).slice(-2);
	const seconds = ("0" + (sec % 60).toFixed(3)).slice(-6);
	return `${hour}:${minutes}:${seconds}`;
}
