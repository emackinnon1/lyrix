import React, { useState, useEffect } from "react";
import './GameCard.css'
const GameCard = ({lyrics, updateCount, splitLyrics}) => {

    const [guesses, setGuesses] = useState({});

    const createLyricLine = () => {
      
        const result = splitLyrics.map(lyric => {
            let firstHalf = lyric[0][0][0].join(' ')
            let secondHalf = lyric[0][0][1].join(' ')

            return ( <p key={firstHalf}>
                        {firstHalf}
                            <input type='text' className='input-box' key={secondHalf} id={lyric[0][0].missing} onChange={(e) => handleChange(e)} placeholder='Your Answer Here' value={guesses[0]}/>
                        {secondHalf}
                     </p>)
            })

        return result
        
    }

    useEffect(() => {
       
    }, [lyrics])

    const handleChange = (e) => {
        e.preventDefault();
		setGuesses([e.target.value])
    }

    const checkAnswers = (e) => {
        e.preventDefault();
        updateCount();
        let correctAnswer = splitLyrics[0][0].missing

        if (correctAnswer == guesses) {
            alert('correct!')
            setGuesses('')
        } else {
            alert('wrong!')
            setGuesses('')
        }
    }

    return (
    <form onSubmit={(e) => checkAnswers(e)}>
        {createLyricLine()}
        <div className='check-answers'>
				<button type='submit' className='next-btn'>NEXT</button>
		</div>
    </form>)
}

export default GameCard;