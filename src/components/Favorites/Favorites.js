import React from "react";
import "./Favorites.css";
import { AiFillStar } from "react-icons/ai";
import { A } from "hookrouter";

const Favorites = ({ addFavoriteSong, songList }) => { 
    const favoriteSongs = songList.filter( song => song.favorite === true)
    const hyphenate = (words) => {
		return words.split(" ").join("-");
    };
    
    const displayFavorites = favoriteSongs.map((song, index) => {
            return (
                <div key={index}>
                    <button aria-label={song.title} className='star-button' onClick={()=>addFavoriteSong(song)}>
                        <AiFillStar className={song.favorite ? "active-star" : "star"} />
                        {" "}
                    </button>
                    <A href={`play/${hyphenate(song.artist)}/${hyphenate(song.title)}`}>
						{song.artist} - {song.title}
					</A>
                </div>
            )})

    return (
        <div>
            {!favoriteSongs.length && <h2>Add some favorites!</h2>}
            {!!favoriteSongs.length && <h2>Your Favorite Songs</h2>}
            {displayFavorites}
        </div>
    )
};

export default Favorites;




