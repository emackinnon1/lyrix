import React, { useState, useEffect } from "react";
import "./App.css";
import { useRoutes } from "hookrouter";

import { Navbar } from "../Navbar/Navbar";
import { Chart } from "../Chart/Chart";
import { Game } from "../Game/Game";
import { About } from "../About/About";
import { Scores } from "../Scores/Scores";
import { getChartData } from "../../apiCalls";
import { Favorites } from "../Favorites/Favorites";

const App = () => {
	const [topTracks, setTopTracks] = useState([]);
	const [scoreRecord, setScoreRecord] = useState([]);

	const lastFmUrl =
		"http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=ae71028d5b049c13836f15604c505ffa&format=json";

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

	const addFavoriteSong = (song) => {
		const favLocation = topTracks.indexOf(song);
		!topTracks[favLocation].favorite ? topTracks[favLocation].favorite = true : topTracks[favLocation].favorite = false;
		setTopTracks([...topTracks]);
	};

	const routes = {
		"/": () => <About />,
		"/play": () => (
			<Chart songList={topTracks} addFavoriteSong={addFavoriteSong} />
		),
		"/play/:artist/:title": ({ artist, title }) => (
			<Game
				artist={artist}
				title={title}
				setScoreRecord={setScoreRecord}
				scoreRecord={scoreRecord}
			/>
		),
		"/favorites": () => (
			<Favorites addFavoriteSong={addFavoriteSong} songList={topTracks}/>
		),
		"/scores": () => <Scores scoreRecord={scoreRecord} />,
	};

	useEffect(() => {
		const fetchData = async () => {
			const chart = await getChartData(lastFmUrl);
			getArtistsAndTitles(chart);
		};
		fetchData();
	},[]);

	const match = useRoutes(routes);

	return (
		<div className="App">
			<Navbar />
			<div className="wrapper">{match || "not found"}</div>
		</div>
	);
};

export default App;
