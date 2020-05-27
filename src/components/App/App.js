import React, { useState, useEffect } from "react";
import "./App.css";

import { Navbar } from "../Navbar/Navbar";
import { Chart } from "../Chart/Chart";

const App = () => {
	const [topTracks, setTopTracks] = useState([]);

	const lastFmUrl =
		"http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=ae71028d5b049c13836f15604c505ffa&format=json";

	const getData = async (url) => {
		const response = await fetch(url);
		const data = await response.json();
		await getArtistsAndTitles(data.tracks.track);
	};

	const getArtistsAndTitles = async (songList) => {
		const musicInfo = songList.map((song) => {
			const title = song.name;
			const artist = song.artist.name;
			return {
				title,
				artist,
				favorite: false,
			};
		});
		setTopTracks(musicInfo);
	};

	useEffect(() => {
		getData(lastFmUrl);
	}, []);

	const addFavoriteSong = () => {};

	return (
		<div className="App">
			<Navbar />
			<div className="wrapper">
				<Chart songList={topTracks} addFavoriteSong={addFavoriteSong} />
			</div>
		</div>
	);
};

export default App;
