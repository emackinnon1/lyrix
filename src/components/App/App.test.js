import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import { lyrics, tracks } from "./AppMockData.js";
import { getLyrics, getChartData } from "../../apiCalls";

jest.mock("../../apiCalls");

import MutationObserver from "@sheerun/mutationobserver-shim";
window.MutationObserver = MutationObserver;

describe("App", () => {

	beforeEach(() => {
		getLyrics.mockResolvedValue(lyrics);
		getChartData.mockResolvedValue(tracks);
	});

	it('should display the top tracks on the the "play" page', async () => {

		const { getByText } = render(<App />);

		fireEvent.click(getByText("Play"));

		const track = await waitFor(() =>
			getByText("Lady Gaga - rAIn oN mE (with aRIaNa gRAndE)")
		);

		expect(track).toBeInTheDocument();
	});

	it("should navigate to scores page", async () => {

		const { getByText } = render(<App />);

		fireEvent.click(getByText("Scores"));

		const scorePage = await waitFor(() => getByText("Your scores:"));
		expect(scorePage).toBeInTheDocument();
	});

	it("should display the rules when the app loads", async () => {
		const { getByText } = render(<App />);

		fireEvent.click(getByText("About"));
		const rules = await waitFor(() => getByText("READ THE RULES FUCKHEAD"));
		expect(rules).toBeInTheDocument();
	});

	it("should display the lyrics when a song is selected", async () => {
		const { getByText, getByPlaceholderText } = render(<App />);

		fireEvent.click(getByText("Play"));

		const track = await waitFor(() =>
			getByText("Lady Gaga - rAIn oN mE (with aRIaNa gRAndE)")
		);

		fireEvent.click(track);

		const score = await waitFor(() => getByPlaceholderText("..."));

		expect(score).toBeInTheDocument();
  });

  it("should be able to input a correct answer", async () => {
		const { getByText, getByPlaceholderText } = render(<App />);

		fireEvent.click(getByText("Play"));

		const track = await waitFor(() =>
			getByText("Lady Gaga - rAIn oN mE (with aRIaNa gRAndE)")
		);

    fireEvent.click(track);
    let missingWord = await waitFor(()=>getByPlaceholderText('...').id)
		fireEvent.change(getByPlaceholderText('...'), {target: {value:`${missingWord}`}})
		expect(getByPlaceholderText('...').value).toEqual(missingWord)
		fireEvent.click(getByText('NEXT'));
		expect(getByText('Correct!')).toBeInTheDocument();	
		missingWord = await waitFor(()=>getByPlaceholderText('...').id)
		fireEvent.change(getByPlaceholderText('...'), {target: {value:`${missingWord}`}})
		expect(getByPlaceholderText('...').value).toEqual(missingWord)
    fireEvent.click(getByText('NEXT'));
    expect(getByText('Correct!')).toBeInTheDocument();
    fireEvent.click(getByText('NEXT'));
    expect(getByText('Game Over', { exact: false })).toBeInTheDocument();
  });
  
  it('should advise a player when a song is unavailable', async () => {
    const { getByText } = render(<App />);
		
		getLyrics.mockResolvedValueOnce(false);
    
		fireEvent.click(getByText("Play"));
		
		const track = await waitFor(() =>
			getByText("Lady Gaga - rAIn oN mE (with aRIaNa gRAndE)")
    );
		
    fireEvent.click(track);
		
    const message = await waitFor(() => 
       getByText("Please pick a different song.", { exact: false })
    );
	
    expect(message).toBeInTheDocument();
  });

});
