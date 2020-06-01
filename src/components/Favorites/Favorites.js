import React, { useState, useEffect } from "react";
import "./Favorites.css";
import { AiFillStar } from "react-icons/ai";
import { A } from "hookrouter";

export const Favorites = ({ addFavoriteSong, songList}) => { 
    
    const favoriteSongs = songList.filter( song => song.favorite === true)
    const hyphenate = (words) => {
		return words.split(" ").join("-");
    };
    
    const displayFavorites = favoriteSongs.map(song => {
            return (
                <div>
                    <button className='star-button' onClick={()=>addFavoriteSong(song)}>
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
            {!favoriteSongs.length && <h3>Add some favorites!</h3>}
            {!!favoriteSongs.length && <h3>Your Favorite Songs</h3>}
            {displayFavorites}
        </div>
    )
};





