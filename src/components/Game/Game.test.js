import React from "react";
import { Game } from "./Game";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { lyrics } from "../App/AppMockData.js";
import { getLyrics, getChartData } from "../../apiCalls";
import MutationObserver from "@sheerun/mutationobserver-shim";

jest.mock("../../apiCalls");

window.MutationObserver = MutationObserver;

const mockScoreRecord = ["1/2", "2/2"];

describe("Game", () => {
	const topTracks = [{
		artist: "Lady Gaga",
		favorite: false,
		songUrl: "https://www.last.fm/music/Lady+Gaga/_/rAIn+oN+mE+(with+aRIaNa+gRAndE)",
		title: "rAIn oN mE (with aRIaNa gRAndE)"}]
	
	it("should fetch lyric data", async () => {
		getLyrics.mockResolvedValueOnce(lyrics);

		const { getByText } = render(<Game artist={topTracks[0].artist} title={topTracks[0].title} topTracks={topTracks} setScoreRecord={jest.fn()}/>);

		const songLyrics = await waitFor(() => getByText("wet", { exact: false }));

		expect(songLyrics).toBeInTheDocument();
	});

	it("should display Game Over message", async () => {
		getLyrics.mockResolvedValueOnce(lyrics);

		const { getByText, getByPlaceholderText } = render(
			<Game scoreRecord={mockScoreRecord} artist={topTracks[0].artist} title={topTracks[0].title} topTracks={topTracks} setScoreRecord={jest.fn()} />
		);

		const inputForm = await waitFor(() => getByPlaceholderText("NEXT"));

		await act(async () => {
			fireEvent.change(getByPlaceholderText("..."), {
				target: { value: "Alice" },
			});
		});

		await waitFor(() => {
			fireEvent.click(inputForm);
		});

		await act(async () => {
			fireEvent.change(getByPlaceholderText("..."), {
				target: { value: "Alice1" },
			});
		});

		await waitFor(() => {
			fireEvent.click(inputForm);
		});

		await act(async () => {
			fireEvent.change(getByPlaceholderText("..."), {
				target: { value: "Alice2" },
			});
		});

		await waitFor(() => {
			fireEvent.click(inputForm);
		});

		const gameOver = await waitFor(() =>
			getByText("Game Over", { exact: false })
		);

		expect(gameOver).toBeInTheDocument();
	});
});
