import React, { useState, useEffect } from "react";
import './GameCard.css'
const GameCard = ({lyrics, updateCount, splitLyric}) => {

    console.log('splitLyric',splitLyric)
    const [guess, setGuess] = useState('');
    
   
      
            // let firstHalf = lyric[0].splitLine[0].join(' ')
            // let secondHalf = lyric[0].splitLine[1].join(' ')

         

       
        
    

    useEffect(() => {
       
    }, [lyrics])

    const handleChange = (e) => {
        // e.preventDefault();
		setGuess(e.target.value)
    }

    const checkAnswers = (e) => {
        e.preventDefault();
        let correctAnswer = splitLyric[0].missing.toUpperCase()

        if (correctAnswer === guess.toUpperCase()) {
            alert('correct!')
            updateCount(true);
            setGuess('')
        } else {
            alert(correctAnswer)
            updateCount(false);
            setGuess('')
        }
    }

    return (
    <form onSubmit={(e) => checkAnswers(e)}>
    
        <p className='game-txt'>
            {splitLyric.splitLine[0] || 'loading'}
                <input type='text' className='input-box' onChange={(e) => handleChange(e)} placeholder='...' value={guess}/>
            {splitLyric.splitLine[1] || 'loading'}
        </p>
        <div className='check-answers'>
		    <button type='submit' className='next-btn'>NEXT</button>
		</div>
    </form>)
}

export default GameCard;