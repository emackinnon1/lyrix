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
	const [error, setError] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [currentGuess, setCurrentGuess] = useState('');
	const [prevWord , setPrevWord] = useState('');
	const [displayResult, setDisplayResult] = useState(null);

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
			setIsCorrect(false)
		}
		setTimeout(() => {
			setDisplayResult(null)
		}, 2500)

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
					<p className="loading">
						{(error && `Uh-Oh! Looks like ${title} by ${artist} isn't available right now. Please pick a different song.`) || "...loading"}
					</p>
				)}
			</div>
			<div className='message'>
			{(displayResult && 
					<div className='answer-response'>
						{(isCorrect && <p className='answer-response-correct'>Correct!</p>) || 
						<div className='incorrect-container'>
							<p className='white'>Oops! Your answer: </p>
							<p className='answer-response'>"{currentGuess}"</p>
							<p className='white'>, is wrong. The correct answer is: </p>
							<p className='answer-response'> "{prevWord}" </p>
						</div>}
					</div>
					)
			|| ''}
			</div>
		</div>
	);
};
