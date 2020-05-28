import React, { useState, useEffect } from "react";

export const Game = ({ artist, title }) => {
	const [lyrics, setLyrics] = useState("");
	const [currentLyrics, setCurrentLyrics] = useState('');

	const url = 'https://api.lyrics.ovh/v1/'
	
	useEffect(() => {
	getLyrics()
	}, [])

	const setLyricsData = (data) => {
		const sortedLyrics = data.lyrics.split('\n')
		const finalLyrics = sortedLyrics.filter(lyric => lyric !== '')
		setLyrics(finalLyrics)
		console.log(finalLyrics)
	}

	const getLyrics = async () => {
		const response = await fetch(url + artist + '/' + title);
		const data = await response.json();
		await setLyricsData(data)
	}


	return (
		<div className='game-container'>
			<div className="game">
				<p>
					{artist}, {title}
				</p>
			</div>
			<div className='lyrics-main'>
				<p>{lyrics}</p>
			</div>
		</div>
	);
};
