export const getLyrics = async (url, artist, title) => {
	try {
		const response = await fetch(url + artist + "/" + title);
		if (!response.ok) {
			throw new Error();
		}
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		return false;
	}
};

export const getChartData = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	return data.tracks.track;
};
