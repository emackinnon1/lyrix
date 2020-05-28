import React, { useState } from "react";

export const Game = ({ artist, title }) => {
	const [lyrics, setLyrics] = useState("");

	return (
		<div className="game">
			<p>
				{artist}, {title}
			</p>
		</div>
	);
};
