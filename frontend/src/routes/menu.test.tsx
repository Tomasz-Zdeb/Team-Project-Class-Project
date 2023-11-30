import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Menu from "./menu";

describe("Menu", () => {
	test("renders menu elements correctly", () => {
		render(<Menu />);

		const addButton = screen.getByText("Dodaj");
		expect(addButton).toBeInTheDocument();

		const nameInput = screen.getByPlaceholderText("Nazwa");
		expect(nameInput).toBeInTheDocument();

		const priceInput = screen.getByPlaceholderText("Cena");
		expect(priceInput).toBeInTheDocument();
		expect(priceInput).toHaveAttribute("type", "number");
	});

	test("adds items to menu", () => {
		render(<Menu />);
		const addButton = screen.getByText("Dodaj");
		const nameInput = screen.getByPlaceholderText("Nazwa");
		const priceInput = screen.getByPlaceholderText("Cena");

		fireEvent.change(nameInput, { target: { value: "Test" } });
		fireEvent.change(priceInput, { target: { value: "10" } });
		fireEvent.click(addButton);

		const menuItem = screen.getByText("Test");
		expect(menuItem).toBeInTheDocument();
	});

	test("removes items from menu", () => {
		render(<Menu />);
		const addButton = screen.getByText("Dodaj");
		const nameInput = screen.getByPlaceholderText("Nazwa");
		const priceInput = screen.getByPlaceholderText("Cena");

		fireEvent.change(nameInput, { target: { value: "Test" } });
		fireEvent.change(priceInput, { target: { value: "10" } });
		fireEvent.click(addButton);

		const removeButton = screen.getAllByTitle("Usuń").pop();
		fireEvent.click(removeButton as HTMLElement);

		const menuItem = screen.queryByText("Test");
		expect(menuItem).toBeNull();
	});
});
