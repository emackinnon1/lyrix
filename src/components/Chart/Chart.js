import React, { useEffect } from "react";
import "./Chart.css";
import { AiFillStar } from "react-icons/ai";
import { A } from "hookrouter";

export const Chart = ({ songList, chartTitle }) => {
	const hyphenate = (words) => {
		return words.split(" ").join("-");
	};

	

	const trackList = songList.map((song, i) => {
		return (
			<div key={i} className="track-info">
				<p>
					<A href={`play/${hyphenate(song.artist)}/${hyphenate(song.title)}`}>
						<AiFillStar className={song.favorite ? "active-star" : "star"} />{" "}
						{song.artist} - {song.title}
					</A>
				</p>
			</div>
		);
	});

	return <div>{trackList}</div>;
};
