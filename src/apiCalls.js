export const getLyrics = async (url, artist, title) => {
	try {
		const response = await fetch(url + artist + "/" + title);
		if (!response.ok) {
		 throw new Error();
		}
		const data = await response.json();
		return data;
	} catch (error) {
		return false;
	}
};

export const getChartData = async (url) => {
	try{
		const response = await fetch(url);
		if(!response.ok) {
			throw new Error();
		}
		const data = await response.json();
		return data.tracks.track;
	} catch(error) {
		return error
	}
};
