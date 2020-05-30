import React, { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import "./Game.css";

import { getLyrics } from "../../apiCalls";

export const Game = ({ artist, title }) => {
	const [lyrics, setLyrics] = useState("");
	const [currentLyrics, setCurrentLyrics] = useState("");
	const [lyricsCount, setLyricsCount] = useState(0);
	const [score, setScore] = useState(0);
	const [splitLyric, setSplitLyric] = useState({});

	const url = "https://api.lyrics.ovh/v1/";

	useEffect(async () => {
		const lyricsData = await getLyrics(url, artist, title);
		setLyricsData(lyricsData);
	}, []);

	const setLyricsData = (data) => {
		const sortedLyrics = data.lyrics.split("\n");
		const finalLyrics = sortedLyrics.filter((lyric) => lyric !== "");
		setLyrics(finalLyrics);
		generateLines(finalLyrics[0]);
		setCurrentLyrics(finalLyrics[lyricsCount]);
	};

	const updateCurrentLyrics = (finalLyrics) => {
		setLyricsCount(lyricsCount + 1);
		let currentLyrics = finalLyrics[lyricsCount];
		setCurrentLyrics(currentLyrics);
		generateLines(currentLyrics);
	};

	const generateLines = (lyrics) => {
		console.log(lyrics);
		let gameLyrics = lyrics.split(" ");
		let wordToReplace = Math.floor(Math.random() * gameLyrics.length);
		let missingWord = gameLyrics[wordToReplace];
		let firstHalf = gameLyrics.splice(0, wordToReplace).join(" ");
		let secondHalf = gameLyrics.splice(1).join(" ");
		const lineInfo = {
			splitLine: [firstHalf, secondHalf],
			missing: missingWord,
		};
		setSplitLyric(lineInfo);
	};

	const updateCount = (isCorrect) => {
		updateCurrentLyrics(lyrics);
		if (isCorrect) {
			setScore(score + 1);
		}
	};

	return (
		<div className="game-container">
			<div className="game">
				<p className="title-artist">
					{artist}, {title}
				</p>
				<p className="score">
					SCORE: {score}/{lyrics.length}
				</p>
			</div>
			<div className="lyrics-main">
				{currentLyrics && splitLyric ? (
					<GameCard
						lyrics={currentLyrics}
						updateCount={updateCount}
						splitLyric={splitLyric}
					/>
				) : (
					<p className="loading">..loading</p>
				)}
			</div>
		</div>
	);
};
