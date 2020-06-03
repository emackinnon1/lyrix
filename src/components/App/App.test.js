import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import { lyrics, tracks } from "./AppMockData.js";
import { getLyrics, getChartData } from "../../apiCalls";

jest.mock("../../apiCalls");

import MutationObserver from "@sheerun/mutationobserver-shim";
window.MutationObserver = MutationObserver;

describe("App", () => {
	let mockChartsData;
	let mockLyricsData;

	beforeEach(() => {
		getLyrics.mockResolvedValueOnce(lyrics);
		getChartData.mockResolvedValueOnce(tracks);
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
		const { getByText, getByPlaceholderText, getByTestId } = render(<App />);

		fireEvent.click(getByText("Play"));

		const track = await waitFor(() =>
			getByText("Lady Gaga - rAIn oN mE (with aRIaNa gRAndE)")
		);

    fireEvent.click(track);
    
    let missingWord = await waitFor(()=>getByPlaceholderText('...').id)
    console.log('first missing word:', missingWord)
    fireEvent.change(getByPlaceholderText('...'), {target: {value:`${missingWord}`}})
    console.log('altered input box:', missingWord)
    expect(getByPlaceholderText('...').value).toEqual(missingWord)
    fireEvent.click(getByText('NEXT'));
    expect(getByText('Correct!')).toBeInTheDocument();
    missingWord = await waitFor(()=>getByPlaceholderText('...').id)
    console.log('first missing word:', missingWord)
    fireEvent.change(getByPlaceholderText('...'), {target: {value:`${missingWord}`}})
    console.log('altered input box:', missingWord)
    expect(getByPlaceholderText('...').value).toEqual(missingWord)
    fireEvent.click(getByText('NEXT'));
    expect(getByText('Correct!')).toBeInTheDocument();
    fireEvent.click(getByText('NEXT'));
    expect(getByText('Game Over', { exact: false })).toBeInTheDocument();
		// const score = await waitFor(() => getByPlaceholderText("..."));
  });
  


});
