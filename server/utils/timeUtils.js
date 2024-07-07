const getCurrentDate = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${day}-${month}-${year}`;
};

function dateToSeconds(dateString) {
	// Split the date string into day, month, and year
	const [day, month, year] = dateString.split("-");

	// Create a new Date object
	const date = new Date(year, month - 1, day);

	// Get the time in milliseconds since the Unix Epoch and convert to seconds
	const seconds = Math.floor(date.getTime() / 1000);

	return seconds;
}

const hasDayPassed = (lastRecordedDate) => {
	const now = new Date();
	const tomorrow = new Date(lastRecordedDate + 24 * 60 * 60 * 1000);
	return now >= tomorrow;
}




module.exports =
{
	getCurrentDate,
	dateToSeconds,
	hasDayPassed

};
