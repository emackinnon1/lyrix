import React, { useState, useEffect } from "react";

const GameCard = ({lyrics, updateCount}) => {

    const createLyricLine = (line, index) => {
    const gameLyrics = line.split(' ');
    const wordToReplace = Math.floor(Math.random() * gameLyrics.length);
    const correctWord = gameLyrics[wordToReplace];
    const firstHalf = gameLyrics.splice(0, wordToReplace);
    const secondHalf = gameLyrics.splice(1);
    return (
        <p key={index}>
            {firstHalf.join(' ')}
                <input type='text' className='input-box' key={index} onChange={(e)=> handleChange(e)} placeholder='Your Answer Here' />
            {secondHalf.join(' ')}
        </p>
    )
    }

    const handleChange = (e) => {
		const guess = e.target.value.toUpperCase();
		const inputId = e.target.id
		// setGuesses({...guesses, ['guess'+inputId]: guess});
		// console.log('guesses state', guesses)
    }
    const checkAnswers = () => {
        updateCount();
    }

    const displayGameData = lyrics.map((line, index)=>{
        return createLyricLine(line, index)
    });

    return (
    <div>
            {displayGameData}

        {/* <p>
            {firstHalf1.join(' ')}
            <input type='text' className='input-box' id={index} onChange={(e)=> handleChange(e)} placeholder='Your Answer Here' />
            {secondHalf1.join(' ')}
        </p>
        <p>
            {firstHalf2.join(' ')}
            <input type='text' className='input-box' id={index} onChange={(e)=> handleChange(e)} placeholder='Your Answer Here' />
            {secondHalf2.join(' ')}
        </p> */}
        <div className='check-answers'>
				<button onClick={() => checkAnswers()} className='next-btn'>NEXT</button>
		</div>
    </div>)
}

export default GameCard;