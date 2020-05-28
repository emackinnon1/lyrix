import React, { useState, useEffect } from "react";

const GameCard = ({lyrics, updateCount}) => {

    const [guesses, setGuesses] = useState({});
    const [wordToReplace, setWordToReplace] = useState(-1);

    const createLyricLine = (line, index) => {
    const gameLyrics = line.split(' ');
    
    const correctWord = gameLyrics[wordToReplace];
    const firstHalf = gameLyrics.splice(0, wordToReplace);
    const secondHalf = gameLyrics.splice(1);
    return (
        <p key={index}>
            {firstHalf.join(' ')}
                <input type='text' className='input-box' key={index} id={index} onChange={(e) => handleChange(e)} placeholder='Your Answer Here' value={guesses}/>
            {secondHalf.join(' ')}
        </p>
    )}

    const checkWordToReplace = () => {
        if(wordToReplace === -1){ 
            setWordToReplace(Math.floor(Math.random() * gameLyrics.length));
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
		setGuesses({index:e.target.value})
		// setGuesses({...guesses, ['guess'+inputId]: guess});
		// console.log('guesses state', guesses)
    }

    const checkAnswers = (e) => {
        e.preventDefault();
        updateCount();

    }

    const displayGameData = lyrics.map((line, index)=>{
        return createLyricLine(line, index)
    });

    return (
    <form onSubmit={(e) => checkAnswers(e)}>
        {displayGameData}
        <div className='check-answers'>
				<button type='submit' className='next-btn'>NEXT</button>
		</div>
    </form>)
}

export default GameCard;