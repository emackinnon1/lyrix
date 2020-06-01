import React, { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import "./Game.css";

import { getLyrics } from "../../apiCalls";
import { A } from "hookrouter";

export const Game = ({ artist, title, setScoreRecord, scoreRecord }) => {
	const [lyrics, setLyrics] = useState("");
	const [currentLyrics, setCurrentLyrics] = useState("");
	const [lyricsCount, setLyricsCount] = useState(0);
	const [score, setScore] = useState(0);
	const [splitLyric, setSplitLyric] = useState({});
	const [error, setError] = useState(false);
	const [gameOverMessage, setGameOverMessage] = useState();

	const url = "https://api.lyrics.ovh/v1/";

	useEffect(() => {
		const setData = async () => {
			const lyricsData = await getLyrics(url, artist, title);
			!lyricsData && setError(true);
			lyricsData && setLyricsData(lyricsData);
		};
		setData();
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
		const currentLyrics = finalLyrics[lyricsCount];
		setCurrentLyrics(currentLyrics);
		generateLines(currentLyrics);
	};

	const generateLines = (lyrics) => {
		if (!lyrics) {
			endGame();
			return;
		}
		const gameLyrics = lyrics.split(" ");
		const wordToReplace = Math.floor(Math.random() * gameLyrics.length);
		const missingWord = gameLyrics[wordToReplace];
		const firstHalf = gameLyrics.splice(0, wordToReplace).join(" ");
		const secondHalf = gameLyrics.splice(1).join(" ");
		const lineInfo = {
			splitLine: [firstHalf, secondHalf],
			missing: missingWord,
		};
		setSplitLyric(lineInfo);
	};

	const endGame = () => {
		setScoreRecord([...scoreRecord, `${score}/${lyrics.length}`]);
		setGameOverMessage(
			<>
				Game Over
				<A className="see-scores-btn" href="/scores">
					See Scores
				</A>
			</>
		);
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
				{(currentLyrics && splitLyric && (
					<GameCard
						lyrics={currentLyrics}
						updateCount={updateCount}
						splitLyric={splitLyric}
					/>
				)) || (
					<div className="loading">
						{(error && "Please choose another song") ||
							gameOverMessage ||
							"...loading"}
					</div>
				)}
			</div>
		</div>
	);
};
