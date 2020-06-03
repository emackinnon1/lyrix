import React from "react";
import GameCard from "./GameCard";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import MutationObserver from "@sheerun/mutationobserver-shim";

window.MutationObserver = MutationObserver;

describe("GameCard", () => {
	const currentLyrics = "My name isn't Alice I'll keep looking for Wonderland";
	const mockUpdateCount = jest.fn();
	const splitLyric = {
		splitLine: [`My name isn't`, `but I'll keep looking for Wonderland`],
		missing: "Alice",
	};

	it("should display a line of lyrics with a missing word as an input box", () => {
		const { getByText, getByPlaceholderText } = render(
			<GameCard
				lyrics={currentLyrics}
				updateCount={mockUpdateCount}
				splitLyric={splitLyric}
			/>
		);
		expect(getByText(`My name isn't`, { exact: false })).toBeInTheDocument();
		expect(getByPlaceholderText("...")).toBeInTheDocument();
		expect(
			getByText(`but I'll keep looking for Wonderland`, { exact: false })
		).toBeInTheDocument();
	});

	it("should increase score if input word is correct", async () => {
		const { getByTestId, getByPlaceholderText } = render(
			<GameCard
				lyrics={currentLyrics}
				updateCount={mockUpdateCount}
				splitLyric={splitLyric}
			/>
        );
		await act(async ()=> {
            fireEvent.change(getByPlaceholderText("..."), {
			target: { value: "Alice" },
		})});
        await act(async()=>fireEvent.submit(getByTestId('inputForm')));
		expect(mockUpdateCount).toHaveBeenCalledWith(true);
	});

	it("should not increase score if input word is incorrect", async () => {
		const { getByText, getByPlaceholderText } = render(
			<GameCard
				lyrics={currentLyrics}
				updateCount={mockUpdateCount}
				splitLyric={splitLyric}
			/>
		);
		act(()=>fireEvent.change(getByPlaceholderText("..."), {
			target: { value: "Bobby" },
		}))
		await act(()=>fireEvent.click(getByText("NEXT")));
		expect(mockUpdateCount).toHaveBeenCalledWith(
			false,
			splitLyric.missing.toUpperCase(),
			"Bobby"
		);
	});
});
