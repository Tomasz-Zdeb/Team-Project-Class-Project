import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./card";

describe("Card", () => {
	test("should render children", () => {
		render(<Card>Test</Card>);
		expect(screen.getByText("Test")).toBeInTheDocument();
	});

	test("should render className", () => {
		render(<Card className="test">Test</Card>);
		expect(screen.getByText("Test")).toHaveClass("test");
	});

	test("should render other props", () => {
		render(<Card id="test">Test</Card>);
		expect(screen.getByText("Test")).toHaveAttribute("id", "test");
	});
});
