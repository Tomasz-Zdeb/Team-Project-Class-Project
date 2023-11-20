import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import Dashboard from "./dashboard";

describe("Dashboard", () => {
	test("has logout button", () => {
		const { getByText } = render(<Dashboard />, { wrapper: BrowserRouter });
		expect(getByText("Wyloguj")).toBeInTheDocument();
	});

	test("Has menu button", () => {
		const { getByText } = render(<Dashboard />, { wrapper: BrowserRouter });
		expect(getByText("Menu")).toBeInTheDocument();
	});

	test("Button click", async () => {
		render(<Dashboard />, {
			wrapper: BrowserRouter,
		});

		fireEvent.click(screen.getByText("Menu"));
		fireEvent.click(screen.getByText("Wyloguj"));
	});
});
