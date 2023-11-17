import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardButton from "./DashboardButton";

describe("Dashboardubtton", () => {
	test("should render children", () => {
		render(<DashboardButton>Test</DashboardButton>);
		expect(screen.getByText("Test")).toBeInTheDocument();
	});

	test("should render className", () => {
		render(<DashboardButton className="test">Test</DashboardButton>);
		expect(screen.getByText("Test")).toHaveClass("test");
	});

	test("should render other props", () => {
		render(<DashboardButton id="test">Test</DashboardButton>);
		expect(screen.getByText("Test")).toHaveAttribute("id", "test");
	});
});
