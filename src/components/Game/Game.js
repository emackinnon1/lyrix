import React, { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import "./Game.css";

import { getLyrics } from "../../apiCalls";
import { A } from "hookrouter";

export const Game = ({ artist, title, setScoreRecord, scoreRecord, topTracks }) => {
	const [lyrics, setLyrics] = useState("");
	const [currentLyrics, setCurrentLyrics] = useState("");
	const [lyricsCount, setLyricsCount] = useState(0);
	const [score, setScore] = useState(0);
	const [splitLyric, setSplitLyric] = useState({});
	const [error, setError] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [currentGuess, setCurrentGuess] = useState("");
	const [prevWord, setPrevWord] = useState("");
	const [displayResult, setDisplayResult] = useState(null);
	const [gameOverMessage, setGameOverMessage] = useState();

	const url = "https://api.lyrics.ovh/v1/";
	console.log(topTracks)
	useEffect(() => {
		let isMounted = true;
		const setData = async () => {
			const lyricsData = await getLyrics(url, artist, title);
			if(isMounted) {
				!lyricsData && setError(true);
				lyricsData && setLyricsData(lyricsData);
			}
		};
		setData();
		return () => isMounted = false;
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
				<A className="btn" href="/scores">
					See Scores
				</A>
				<A className="btn" href="/play">
					Play again
				</A>
			</>
		);
	};

	const updateCount = (correct, answer, guess) => {
		updateCurrentLyrics(lyrics);

		if (correct) {
			setScore(score + 1);
			setIsCorrect(true);
			setDisplayResult(true);
		} else {
			setDisplayResult(true);
			setCurrentGuess(guess.toUpperCase());
			setPrevWord(answer);
			setIsCorrect(false);
		}
		// setTimeout(() => {
		// 	setDisplayResult(null);
		// }, 2500);
	};
	const titleString = title.replace(/\-/g, ' ')
	const currentSong = topTracks.find(song => song.title == titleString)
	
	return (
		<div className="game-container">
		<a href={currentSong.songUrl} target='_blank'>LINK TO SONG</a>
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
						{(error &&
							`Uh-Oh! Looks like ${title} by ${artist} isn't available right now. Please pick a different song.`) ||
							gameOverMessage ||
							"...loading"}
					</div>
				)}
			</div>
			<div className="message">
				{(displayResult && (
					<div className="answer-response">
						{(isCorrect && (
							<p className="answer-response-correct">Correct!</p>
						)) || (
							<div className="incorrect-container">
								<p className="white">Oops! Your answer: </p>
								<p className="answer-response">"{currentGuess}"</p>
								<p className="white">, is wrong. The correct answer is: </p>
								<p className="answer-response"> "{prevWord}" </p>
							</div>
						)}
					</div>
				)) ||
					""}
			</div>
		</div>
	);
};
