import { Scores } from "./Scores";
import React from "react";
import { render } from "@testing-library/react";
// import App from "./App";
import "@testing-library/jest-dom";

const mockScoreRecord = ["31/41", "25/50", "40/45"];

describe("Scores", () => {
	it("should render a user's scores", () => {
		const { getByText, debug } = render(
			<Scores scoreRecord={mockScoreRecord} />
		);

		expect(getByText("31/41")).toBeInTheDocument();
	});
});
