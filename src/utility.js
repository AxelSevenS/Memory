
export const toKebabCase = (string) => string
	.normalize("NFD")
	.replace(/[\u0300-\u036f]/g, '')
	.replace(/([a-z])([A-Z])/g, "$1-$2")
	.replace(/[\s_]+/g, '-')
	.toLowerCase();

export const timeToDate = (time) => {
	const splitTime = time.split(':');
	const timeDate = new Date(0);
	timeDate.setHours(
		splitTime[0] ?? 0,
		splitTime[1] ?? 0,
		splitTime[2] ?? 0
	);

	return timeDate;
}


export const MS_IN_A_DAY = 24 * 60 * 60 * 1000;