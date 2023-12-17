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

	test("edits items in menu", () => {
		render(<Menu />);
		const addButton = screen.getByText("Dodaj");
		const nameInput = screen.getByPlaceholderText("Nazwa");
		const priceInput = screen.getByPlaceholderText("Cena");

		fireEvent.change(nameInput, { target: { value: "Test name" } });
		fireEvent.change(priceInput, { target: { value: "10" } });
		fireEvent.click(addButton);

		const editButton = screen.getAllByTitle("Edytuj").pop();

		fireEvent.click(editButton as HTMLElement);

		const editNameInput = screen.getByTitle("Edytuj nazwę Test name");
		const editPriceInput = screen.getByTitle("Edytuj cenę Test name");

		fireEvent.change(editNameInput, { target: { value: "Test2" } });
		fireEvent.change(editPriceInput, { target: { value: "48947841" } });

		const saveButton = screen.getByTitle("Zapisz");

		fireEvent.click(saveButton);

		const menuItem = screen.getByText("Test2");
		const menuItemPrice = screen.getByText("48947841.00zł");

		expect(menuItem).toBeInTheDocument();
		expect(menuItemPrice).toBeInTheDocument();
	});
});
