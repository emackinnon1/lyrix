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
			};
		});
		setTopTracks(musicInfo);
		console.log(topTracks);
	};

	useEffect(() => {
		getData(lastFmUrl);
	}, []);

	const trackList = topTracks.map((track) => {
		return (
			<div className="">
				<p>
					{track.artist}-{track.title}
				</p>
			</div>
		);
	});

	return (
		<div className="App">
			<Navbar />
			<div className="wrapper">
				<Chart songList={topTracks} />
			</div>
		</div>
	);
};

export default App;
