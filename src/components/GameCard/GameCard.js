import React, { useEffect } from "react";
import "./GameCard.css";
import { useForm } from "react-hook-form";

const GameCard = ({ lyrics, updateCount, splitLyric, lyricsCount }) => {
	const { register, handleSubmit, errors, reset } = useForm();
	const onSubmit = (data) => checkAnswer(data.inputName);

	const checkAnswer = (data) => {
	
		if(errors.inputName){
			return
		}
		let correctAnswer = splitLyric.missing.toUpperCase();
		if (correctAnswer.includes(data.toUpperCase()) && correctAnswer.length - data.length < 2) {
			updateCount(true);
			reset();
		} else {
			updateCount(false, splitLyric.missing.toUpperCase(), data);
			reset();
		}
	};

	useEffect(() => {},[lyrics])
	return (
		<>
			<form data-testid='inputForm' onSubmit={handleSubmit(onSubmit)}>
				<div className='game-txt'>
					{splitLyric.splitLine[0]}
					<input
						type="text"
						id={splitLyric.missing}
						name='inputName'
						className="input-box"
						placeholder="..."
						ref={register({ required: 'Please enter an answer!' })}
					/>
					{splitLyric.splitLine[1]}
				</div>
				<div className="check-answers">
					<input placeholder='NEXT' type="submit" className="check-answers next-btn" value="NEXT"/>
				</div>
			</form>
				{errors.inputName  && <p>{errors.inputName.message}</p>}
		</>
	);
};

export default GameCard;
