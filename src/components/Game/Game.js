import React, { useState, useEffect } from "react";

export const Game = ({ artist, title }) => {
	const [lyrics, setLyrics] = useState("");
	const [currentLyrics, setCurrentLyrics] = useState('');
	const [lyricsCount, setLyricsCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false)
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
		console.log(currentLyrics)
		setIsLoading(false)
		setIsPlaying(true);
	}

	const getLyrics = async () => {
		const response = await fetch(url + artist + '/' + title);
		const data = await response.json();
	  setLyricsData(data)
	}

	const checkInputs = () => {
		sortCurrentLyrics(lyrics)

	}

	// displayLyrics = (currentLyrics) => {
	// 	const firstLine = currentLyrics[0]
		

	// }

	const displayLyrics = (lyrics) => {
		let loaded = ('Loading...');
		const userAnswer = <input type='text' className='input-box' placeholder='Your Answer Here'>	</input>

		if(!lyrics) {
			return
		}
	
		if (!isLoading && currentLyrics.length > 0) {
			const wordToReplace = 2;
			const gameLyrics = lyrics.split(' ');
			const firstHalf = gameLyrics.splice(0, wordToReplace);
			const secondHalf = gameLyrics.splice(1);
			const full = `${firstHalf.join(' ')} ${userAnswer} ${secondHalf.join(' ')}`
			

			console.log('first', firstHalf)
			console.log('second', secondHalf)


		
			loaded = <div>
									<p>{firstHalf.join(' ')}
									<input type='text' className='input-box' placeholder='Your Answer Here' />
									{secondHalf.join(' ')}</p>
							</div>
		}
		return loaded
	}

	return (
		<div className='game-container'>
			<div className="game">
				<p>
					{artist}, {title}
				</p>
			</div>
			<div className='lyrics-main'>
				{displayLyrics(currentLyrics[0])}
				{displayLyrics(currentLyrics[1])}
			</div>
			<div className='check-answers'>
				<button onClick={() => checkInputs()} className='next-btn'>NEXT</button>
			</div>
		</div>
	);
};
