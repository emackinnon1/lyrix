import React from "react";
import "./Scores.css";

export const Scores = ({ scoreRecord }) => {
	const scores = scoreRecord.map((score, i) => {
		return <p key={i}>{score}</p>;
	});

	return (
		<div className="scores-container">
			<h2>Your scores:</h2>
			{scores}
		</div>
	);
};
