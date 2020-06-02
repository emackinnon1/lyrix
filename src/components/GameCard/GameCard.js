import React, { useState, useEffect } from "react";
import "./GameCard.css";

const GameCard = ({ lyrics, updateCount, splitLyric }) => {
	// console.log("splitLyric", splitLyric);
	const [guess, setGuess] = useState("");

	useEffect(() => {}, [lyrics]);

	const handleChange = (e) => {
		setGuess(e.target.value);
	};

	const checkAnswers = (e) => {
		e.preventDefault();
		let correctAnswer = splitLyric.missing.toUpperCase();

		if (correctAnswer.includes(guess.toUpperCase()) && correctAnswer.length - guess.length < 2) {
			
			updateCount(true);
			setGuess("");
		} else {
			
			updateCount(false, splitLyric.missing.toUpperCase(), guess);
            setGuess("");
		}
	};

	return (
		<form onSubmit={(e) => checkAnswers(e)}>
			<p className="game-txt">
				{splitLyric.splitLine[0]}
				<input
					type="text"
					className="input-box"
					onChange={(e) => handleChange(e)}
					placeholder="..."
					required
					value={guess}
				/>
				{splitLyric.splitLine[1]}
			</p>
			<div className="check-answers">
				<button type="submit" className="next-btn">
					NEXT
				</button>
			</div>
		</form>
	);
};

export default GameCard;
