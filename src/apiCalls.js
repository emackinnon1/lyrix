export const getLyrics = async (url, artist, title) => {
	const response = await fetch(url + artist + "/" + title);
	const data = await response.json();
	return data;
};
