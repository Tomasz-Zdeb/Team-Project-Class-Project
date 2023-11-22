import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Menu from "./menu";

describe("Menu", () => {
	test("renders menu buttons correctly", () => {
		render(<Menu />);

		const orderButton = screen.getByText("Zamów");
		expect(orderButton).toBeInTheDocument();

		const resetButton = screen.getByText("Reset");
		expect(resetButton).toBeInTheDocument();
	});

	test("adds item to cart when clicked on plus button", () => {
		render(<Menu />);
		const plusButton = screen.getAllByLabelText("Add to cart")[0];
		fireEvent.click(plusButton);
		const cartItem = screen.getAllByLabelText("Cart item")[0];
		expect(cartItem).toBeInTheDocument();
	});

	test("removes item from cart when clicked on minus button", () => {
		render(<Menu />);
		const plusButton = screen.getAllByLabelText("Add to cart")[0];
		fireEvent.click(plusButton);
		const minusButton = screen.getAllByLabelText("Remove from cart")[0];
		fireEvent.click(minusButton);
		const cartItem = screen.queryAllByLabelText("Cart item")[0];
		expect(cartItem).toBeUndefined();
	});

	test("reset button clears cart", () => {
		render(<Menu />);
		const plusButton = screen.getAllByLabelText("Add to cart")[0];
		fireEvent.click(plusButton);
		const resetButton = screen.getByText("Reset");
		fireEvent.click(resetButton);
		const cartItem = screen.queryAllByLabelText("Cart item")[0];
		expect(cartItem).toBeUndefined();
	});
});
