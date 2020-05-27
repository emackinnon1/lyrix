import React, { useState, useEffect } from "react";
import "./App.css";

import { Navbar } from "../Navbar/Navbar";

const App = () => {
	const [topTracks, setTopTracks] = useState([]);

	const lastFmUrl =
		"http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=ae71028d5b049c13836f15604c505ffa&format=json";

	const getData = async (url) => {
		const response = await fetch(url);
		const data = await response.json();
		// console.log(data);
		// getArtistsAndTitles(data);
		setTopTracks(data);
		console.log(data);
	};

	const getArtistsAndTitles = async (songList) => {
		console.log(songList);
		const musicInfo = songList.tracks.track.map(async (song) => {
			const title = await song.name;
			const artist = await song.artist.name;
			return {
				title,
				artist,
			};
		});
		setTopTracks(musicInfo);
		console.log(topTracks);
	};

	useEffect(() => {
		getData(lastFmUrl);
	}, []);

	return (
		<div className="App">
			<Navbar />
		</div>
	);
};

export default App;
