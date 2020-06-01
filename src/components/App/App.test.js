import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'


describe('App', () => {

  it('should navigate to scores page', () => {
    const { getByText } = render(
      <MemoryRouter>
      
        <App />
       
      </MemoryRouter>
    );
      
    fireEvent.click(getByText('Scores'));
    
    const scorePage = getByText('Your scores:');
    expect(scorePage).toBeInTheDocument();
   
    fireEvent.click(getByText('About'));

  }) 

  it('should display the rules when the app loads', () => {
    const { getByText } = render(
    <MemoryRouter>
       <App />
    </MemoryRouter>
    );
    
    const rules = getByText('READ THE RULES FUCKHEAD');
    expect(rules).toBeInTheDocument();

    fireEvent.click(getByText('About'))
  })
}) 