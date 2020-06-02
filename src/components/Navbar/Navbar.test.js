import React from 'react';
import { render } from '@testing-library/react';
import { Navbar } from './Navbar';
import '@testing-library/jest-dom';


describe('Navbar', () => {
  it('should render its links when the App loads', () => {
    const { getByText } = render(
      <Navbar />
    )

    expect(getByText('Play')).toBeInTheDocument();
    expect(getByText('Scores')).toBeInTheDocument();
    expect(getByText('Favorites')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
  })

})