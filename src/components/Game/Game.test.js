import React from "react";
import { Game } from "./Game";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { lyrics } from "../App/AppMockData.js";
import { getLyrics, getChartData } from "../../apiCalls";
import MutationObserver from "@sheerun/mutationobserver-shim";

jest.mock("../../apiCalls");

window.MutationObserver = MutationObserver;

const mockScoreRecord = ["1/2", "2/2"];

describe("Game", () => {
	it("should fetch lyric data", async () => {
		getLyrics.mockResolvedValueOnce(lyrics);

		const { getByText } = render(<Game />);

		const songLyrics = await waitFor(() => getByText("wet", { exact: false }));

		expect(songLyrics).toBeInTheDocument();
	});

	it("should display Game Over message", async () => {
		getLyrics.mockResolvedValueOnce(lyrics);

		const { getByText } = render(
			<Game scoreRecord={mockScoreRecord} setScoreRecord={jest.fn()} />
		);

		const nextBtn = await waitFor(() => getByText("NEXT"));

		fireEvent.click(nextBtn);
		fireEvent.click(nextBtn);
		fireEvent.click(nextBtn);

		const gameOver = await waitFor(() =>
			getByText("Game Over", { exact: false })
		);

		expect(gameOver).toBeInTheDocument();
	});
});
