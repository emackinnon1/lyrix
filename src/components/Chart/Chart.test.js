import React from "react";
import { render } from "@testing-library/react";
import { Chart } from "./Chart";
import "@testing-library/jest-dom";

const mockTrackList = [
	{
		title: "Licking ass and taking names",
		artist: "Ben Dover and the Power Bottoms",
		favorite: false,
	},
	{
		title: "Honkin' out a dirt snake",
		artist: "Hugh Jass",
		favorite: true,
	},
];

describe("Chart", () => {
	it("should display the correct artist and song title information", () => {
		const { getByText } = render(<Chart songList={mockTrackList} />);

		expect(
			getByText("Ben Dover and the Power Bottoms", { exact: false })
		).toBeInTheDocument();
		expect(
			getByText("Honkin' out a dirt snake", { exact: false })
		).toBeInTheDocument();
	});
});
