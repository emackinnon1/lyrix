import React, { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import './Game.css'

export const Game = ({ artist, title }) => {
	const [lyrics, setLyrics] = useState("");
	const [currentLyrics, setCurrentLyrics] = useState('');
	const [lyricsCount, setLyricsCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [score, setScore] = useState(0);
	const [splitLyrics, setSplitLyrics] = useState([]);

	const url = 'https://api.lyrics.ovh/v1/'
	
	useEffect(() => {
	getLyrics()
	}, [])

	const setLyricsData = (data) => {
		const sortedLyrics = data.lyrics.split('\n');
		const finalLyrics = sortedLyrics.filter(lyric => lyric !== '');
		setLyrics(finalLyrics);
		sortCurrentLyrics(finalLyrics);
	}

	const sortCurrentLyrics = (finalLyrics) => {
		setLyricsCount(lyricsCount + 1)
		let currentLyrics = [finalLyrics[lyricsCount]]
		setCurrentLyrics(currentLyrics)
		generateLines(currentLyrics)
		setIsLoading(false)
		setIsPlaying(true);
	}

	const generateLines = (currentLyrics) => {
	  const completeLyrics = currentLyrics.map((lyric, index) => {
		let gameLyrics = lyric.split(' ');
		let wordToReplace =  Math.floor(Math.random() * gameLyrics.length)
		let missingWord = gameLyrics[wordToReplace];
		let firstHalf = gameLyrics.splice(0, wordToReplace);
		let secondHalf = gameLyrics.splice(1);
			return {
				['splitLine']: [firstHalf, secondHalf],
				['missing']: missingWord
			}
		})
		 setSplitLyrics([completeLyrics])
	}

	const getLyrics = async () => {
		const response = await fetch(url + artist + '/' + title);
		const data = await response.json();
		setLyricsData(data)
	}

	const updateCount = (isCorrect) => {
		sortCurrentLyrics(lyrics)
		if(isCorrect) {
			setScore(score + 1)
		} 
	}

	return (
		<div className='game-container'>
			<div className="game">
				<p className='title-artist'>
					{artist}, {title}
				</p>
				<p className='score'>SCORE: {score}/{lyrics.length}</p>
			</div>
			<div className='lyrics-main'>
				{currentLyrics && splitLyrics ? <GameCard lyrics={currentLyrics} updateCount={updateCount} splitLyrics={splitLyrics}/> : <p className='loading'>..loading</p>}
			</div>
		</div>
	);
};
