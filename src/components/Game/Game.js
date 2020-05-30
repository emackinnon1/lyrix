import React, { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard"

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
				[index]: [firstHalf, secondHalf],
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

	const updateCount = () => {
		sortCurrentLyrics(lyrics)
	}

	return (
		<div className='game-container'>
			<div className="game">
				<p>
					{artist}, {title}
				</p>
			</div>
			<div className='lyrics-main'>
				{currentLyrics && splitLyrics ? <GameCard lyrics={currentLyrics} updateCount={updateCount} splitLyrics={splitLyrics}/> : '...loading'}
				
				{/* {displayLyrics(currentLyrics[0], 0)}
				{displayLyrics(currentLyrics[1], 1)} */}
			</div>
		</div>
	);
};
