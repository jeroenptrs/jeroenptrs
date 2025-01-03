const weekDayMap = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const monthMap = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export function useFormatDate(date: Date, includeWeekDay = true) {
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const weekDay = date.getDay();

	return `${includeWeekDay ? `${weekDayMap[weekDay]} ` : ""}${monthMap[month]} ${day}, ${year}`;
}
