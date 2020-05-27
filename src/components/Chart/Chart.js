import React from "react";
import "./Chart.css";

export const Chart = ({ songList, chartTitle }) => {
	const trackList = songList.map((song, i) => {
		return (
			<div key={i} className="track-info">
				<p>
					{song.artist}-{song.title}
				</p>
			</div>
		);
	});
	console.log(trackList);

	return <div>{trackList}</div>;
};
