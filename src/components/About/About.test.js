import React from "react";
import { render } from "@testing-library/react";
import { About } from "./About";
import "@testing-library/jest-dom";

describe("About", () => {
	it("should render the correct information", () => {
		const { getByText } = render(<About />);
		expect(
			getByText("on the navigation menu", { exact: false })
		).toBeInTheDocument();
	});
});
