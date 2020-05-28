import React, { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard"

export const Game = ({ artist, title }) => {
	const [lyrics, setLyrics] = useState("");
	const [currentLyrics, setCurrentLyrics] = useState('');
	const [lyricsCount, setLyricsCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [score, setScore] = useState(0);
	const [guesses, setGuesses] = useState({
		guess0: '',
		guess1: '',
	});
	const [answers, setAnswers] = useState({
		answer0: '',
		answer1: '',
	});

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
		setLyricsCount(lyricsCount + 2)
		const currentLyrics = [finalLyrics[lyricsCount],finalLyrics[lyricsCount + 1]]
		setCurrentLyrics(currentLyrics)
		setIsLoading(false)
		setIsPlaying(true);
	}

	const getLyrics = async () => {
		const response = await fetch(url + artist + '/' + title);
		const data = await response.json();
	  	setLyricsData(data)
	}

	const updateCount = () => {
		setLyricsCount(lyricsCount + 2);
	}

	const handleChange = (e) => {
		const guess = e.target.value.toUpperCase();
		const inputId = e.target.id
		setGuesses({...guesses, ['guess'+inputId]: guess});
		console.log('guesses state', guesses)
	}

	// const displayLyrics = (lyrics, index) => {
	// 	let loaded = ('Loading...');
	// 	const userAnswer = <input type='text' className='input-box' placeholder='Your Answer Here'>	</input>

	// 	if(!lyrics) {
	// 		return
	// 	}
	
	// 	if (!isLoading && currentLyrics.length > 0) {
	// 		const gameLyrics = lyrics.split(' ');
	// 		const wordToReplace = Math.floor(Math.random() * gameLyrics.length);
	// 		console.log('wtr', wordToReplace)
	// 		const correctWord = gameLyrics[wordToReplace];
		
	// 		console.log('cw', correctWord);
	// 		// setAnswers({...answers, ['answer'+index]: correctWord});
	// 		const firstHalf = gameLyrics.splice(0, wordToReplace);
	// 		const secondHalf = gameLyrics.splice(1);
	

	// 		loaded = <div>
	// 								<p>{firstHalf.join(' ')}
	// 								<input type='text' className='input-box' id={index} onChange={(e)=> handleChange(e)} placeholder='Your Answer Here' />
	// 								{secondHalf.join(' ')}</p>
	// 						</div>
	// 	}
	// 	return loaded
	// }

	return (
		<div className='game-container'>
			<div className="game">
				<p>
					{artist}, {title}
				</p>
			</div>
			<div className='lyrics-main'>
				{currentLyrics ? <GameCard lyrics={currentLyrics} updateCount={updateCount}/> : '...loading'}
				
				{/* {displayLyrics(currentLyrics[0], 0)}
				{displayLyrics(currentLyrics[1], 1)} */}
			</div>
		</div>
	);
};
