import React, { useState, useEffect } from "react";

export const Game = ({ artist, title }) => {
	const [lyrics, setLyrics] = useState("");
	const [currentLyrics, setCurrentLyrics] = useState('');
	const [lyricsCount, setLyricsCount] = useState(0);
	const url = 'https://api.lyrics.ovh/v1/'
	
	useEffect(() => {
	getLyrics()
	}, [])

	const setLyricsData = (data) => {
		const sortedLyrics = data.lyrics.split('\n')
		const finalLyrics = sortedLyrics.filter(lyric => lyric !== '')
		setLyrics(finalLyrics)
		sortCurrentLyrics(finalLyrics)
	}

	const sortCurrentLyrics = (finalLyrics) => {
		setLyricsCount(lyricsCount + 2)
		const currentLyrics = [finalLyrics[lyricsCount], finalLyrics[lyricsCount + 1]]
		setCurrentLyrics(currentLyrics)
		console.log(currentLyrics)
	}

	const getLyrics = async () => {
		const response = await fetch(url + artist + '/' + title);
		const data = await response.json();
		await setLyricsData(data)
	}

	const showNextLyrics = () => {
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
				<p>{currentLyrics}</p>
			</div>
			<div className='check-answers'>
				<button onClick={() => showNextLyrics()} className='next-btn'>NEXT</button>
			</div>
		</div>
	);
};
