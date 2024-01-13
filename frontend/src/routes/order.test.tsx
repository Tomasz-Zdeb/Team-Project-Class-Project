import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Order from "./order";

/*
describe("Menu", () => {
    test("renders order management buttons correctly", () => {
        render(<Order />);

        const orderButton = screen.getByText("Zamów");
        expect(orderButton).toBeInTheDocument();

        const resetButton = screen.getByText("Reset");
        expect(resetButton).toBeInTheDocument();
    });

    test("adds item to cart when clicked on plus button", () => {
        render(<Order />);
        const plusButton = screen.getAllByLabelText("Add to cart")[0];
        fireEvent.click(plusButton);
        const cartItem = screen.getAllByLabelText("Cart item")[0];
        expect(cartItem).toBeInTheDocument();
    });

    test("removes item from cart when clicked on minus button", () => {
        render(<Order />);
        const plusButton = screen.getAllByLabelText("Add to cart")[0];
        fireEvent.click(plusButton);
        const minusButton = screen.getAllByLabelText("Remove from cart")[0];
        fireEvent.click(minusButton);
        const cartItem = screen.queryAllByLabelText("Cart item")[0];
        expect(cartItem).toBeUndefined();
    });

    test("reset button clears cart", () => {
        render(<Order />);
        const plusButton = screen.getAllByLabelText("Add to cart")[0];
        fireEvent.click(plusButton);
        const resetButton = screen.getByText("Reset");
        fireEvent.click(resetButton);
        const cartItem = screen.queryAllByLabelText("Cart item")[0];
        expect(cartItem).toBeUndefined();
    });

    test("order button opens order panel", () => {
        render(<Order />);
        const orderButton = screen.getByText("Zamów");
        fireEvent.click(orderButton);
        const orderPanel = screen.getByTitle("Podsumowanie - suma zamówienia");
        expect(orderPanel).toBeInTheDocument();
    });

    test("order panel closes when clicked on return button", () => {
        render(<Order />);
        const orderButton = screen.getByText("Zamów");
        fireEvent.click(orderButton);
        const returnButton = screen.getByText("Powrót");
        fireEvent.click(returnButton);
        const addToCartButton = screen.getAllByLabelText("Add to cart")[0];
        expect(addToCartButton).toBeInTheDocument();
    });

    test("order is placed when clicked on order button", () => {
        render(<Order />);
        const orderButton = screen.getByText("Zamów");
        fireEvent.click(orderButton);
        const tableInput = screen.getByTitle("Numer stolika");
        fireEvent.change(tableInput, { target: { value: "1" } });

        const placeOrderButton = screen.getByText("Zamów");
        fireEvent.click(placeOrderButton);
        const orderPlacedText = screen.getByTitle("Zamówienie złożone");
        expect(orderPlacedText).toBeInTheDocument();
    });
});
*/