import React from "react";
import "./Chart.css";
import { AiFillStar } from "react-icons/ai";
import { A } from "hookrouter";

export const Chart = ({ songList, addFavoriteSong }) => {
	const hyphenate = (words) => {
		return words.split(" ").join("-");
	};

	const trackList = songList.map((song, i) => {
		return (
			<div key={i} className="track-info">
				<p>
					<button className="star-button" onClick={() => addFavoriteSong(song)}>
						<AiFillStar className={song.favorite ? "active-star" : "star"} />{" "}
					</button>
					<A href={`play/${hyphenate(song.artist)}/${hyphenate(song.title)}`}>
						{song.artist} - {song.title}
					</A>
				</p>
			</div>
		);
	});

	return <div>{trackList}</div>;
};
