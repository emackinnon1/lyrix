import React from "react";
import "./Chart.css";
import { AiFillStar } from "react-icons/ai";

export const Chart = ({ songList, chartTitle }) => {
	// console.log(songList);
	const trackList = songList.map((song, i) => {
		return (
			<div key={i} className="track-info">
				<p>
					<AiFillStar className={song.favorite ? "active-star" : "star"} />{" "}
					{song.artist} - {song.title}
				</p>
			</div>
		);
	});

	return <div>{trackList}</div>;
};
