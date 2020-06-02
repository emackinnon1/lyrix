import React from 'react';
import Favorites from './Favorites';
import { render, fireEvent } from '@testing-library/react';
import { AiFillStar } from "react-icons/ai";
import '@testing-library/jest-dom';

describe('Favorites', () => {
    const mockAddFavoriteSong = jest.fn();

    it(`should display 'Add some favorites!' if no favorites added`, ()=> {
        const topTracks = [
            {title: "Rain On Me (with Ariana Grande)", artist: "Lady Gaga", favorite: false},
            {title: "Alice", artist: "Lady Gaga", favorite: false},
        ]
        const { getByText } = render(
            <Favorites
                addFavoriteSong={mockAddFavoriteSong}
                songList={topTracks} 
            />
        )
        expect(getByText('Add some favorites!')).toBeInTheDocument();
    })

    it(`should display 'Your Favorite Songs' if you have songs favorited`, () => {
        const topTracks = [
            {title: "Rain On Me (with Ariana Grande)", artist: "Lady Gaga", favorite: true},
            {title: "Alice", artist: "Lady Gaga", favorite: true},
        ]
        const { getByText } = render(
            <Favorites
                addFavoriteSong={mockAddFavoriteSong}
                songList={topTracks} 
            />
        )
        expect(getByText('Your Favorite Songs')).toBeInTheDocument();
    })

    it(`should display a list of your favorited songs`, () => {
        const topTracks = [
            {title: "Rain On Me (with Ariana Grande)", artist: "Lady Gaga", favorite: true},
            {title: "Good Worker", artist: "iamamiwhoami", favorite: true},
        ]
        const { getByText, getAllByText } = render(
            <Favorites
                addFavoriteSong={mockAddFavoriteSong}
                songList={topTracks} 
            />
        )
        expect(getByText('Your Favorite Songs')).toBeInTheDocument();
        expect(getByText('Good Worker', { exact: false })).toBeInTheDocument();
        expect(getByText('iamamiwhoami', { exact: false })).toBeInTheDocument();
        expect(getByText('Rain On Me', { exact: false })).toBeInTheDocument();
        expect(getByText('Lady Gaga', { exact: false })).toBeInTheDocument();
    })

    it('should display a button to unfavorite song', () => {
        const topTracks = [
            {title: "Rain On Me (with Ariana Grande)", artist: "Lady Gaga", favorite: true},
            {title: "Good Worker", artist: "iamamiwhoami", favorite: true},
        ]
        const buttonIcon = '<AiFillStar />';

        const { getByRole } = render(
            <Favorites
                addFavoriteSong={mockAddFavoriteSong}
                songList={topTracks} 
            />
        )
        expect(getByRole('button', { name: 'Good Worker' })).toBeInTheDocument();
    })

    it('should be able to click star button to unfavorite and remove a song', () => {
        const topTracks = [
            {title: "Rain On Me (with Ariana Grande)", artist: "Lady Gaga", favorite: true},
            {title: "Good Worker", artist: "iamamiwhoami", favorite: true},
        ]
        const buttonIcon = '<AiFillStar />';

        const { getByText, getByRole } = render(
            <Favorites
                addFavoriteSong={mockAddFavoriteSong}
                songList={topTracks} 
            />
        )
        const songToBeDeleted = getByText('Rain On Me (with Ariana Grande)', { exact: false });
        fireEvent.click(getByRole('button', { name: 'Rain On Me (with Ariana Grande)' }))
        expect(mockAddFavoriteSong).toHaveBeenCalledWith(topTracks[0])
    })   
})