import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Clock from "./Clock";

describe("Clock", () => {
	const mockDate = new Date(2022, 1, 1, 12, 0, 0);
	global.Date = vi.fn(() => mockDate) as unknown as DateConstructor;

	test("renders the current time", () => {
		render(<Clock />);

		const formattedTime = mockDate.toLocaleTimeString();

		expect(screen.getByText(formattedTime)).toBeInTheDocument();
	});
	test("should render className", () => {
		render(<Clock className="test" />);
		expect(screen.getByTitle("clock")).toHaveClass("test");
	});

	test("should render other props", () => {
		render(<Clock id="test" />);
		expect(screen.getByTitle("clock")).toHaveAttribute("id", "test");
	});
});
