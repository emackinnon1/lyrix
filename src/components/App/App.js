import React, { useState, useEffect } from "react";
import "./App.css";
import { useRoutes } from "hookrouter";

import { Navbar } from "../Navbar/Navbar";
import { Chart } from "../Chart/Chart";
import { Game } from "../Game/Game";
import { About } from "../About/About";

const App = () => {
	const [topTracks, setTopTracks] = useState([]);

	const lastFmUrl =
		"http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=ae71028d5b049c13836f15604c505ffa&format=json";

	const getData = async (url) => {
		const response = await fetch(url);
		const data = await response.json();
		await getArtistsAndTitles(data.tracks.track);
	};

	const getArtistsAndTitles = (songList) => {
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

	const addFavoriteSong = () => {};

	const routes = {
		"/": () => <About />,
		"/play": () => (
			<Chart songList={topTracks} addFavoriteSong={addFavoriteSong} />
		),
		"/play/:artist/:title": ({ artist, title }) => (
			<Game artist={artist} title={title} />
		)
	};  

	useEffect(() => {
		getData(lastFmUrl);
	}, [routes]);

	const match = useRoutes(routes);
	

	return (
		<div className="App">
			<Navbar />
			<div className="wrapper">{match || "not found"}</div>
		</div>
	);
};

export default App;
