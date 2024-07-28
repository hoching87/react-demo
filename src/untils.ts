export const formatDate = (date: string) => {
	const humanReadableDate = new Date(date).toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return humanReadableDate;
};
