import Admin from "./admin";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("Admin component", () => {
	test("renders user table correctly", () => {
		render(<Admin />);

		expect(screen.getByText("Login")).toBeInTheDocument();
		expect(screen.getByText("Rola")).toBeInTheDocument();
		expect(screen.getByText("Akcje")).toBeInTheDocument();

		expect(screen.getByText("Dodaj użytkownika")).toBeInTheDocument();
	});

	test("adds a new user when 'Dodaj' button is clicked", () => {
		render(<Admin />);
		const addUserButton = screen.getByText("Dodaj użytkownika");

		fireEvent.click(addUserButton);

		fireEvent.change(screen.getByTitle("Login"), {
			target: { value: "newuser" },
		});

		fireEvent.change(screen.getByTitle("Hasło"), {
			target: { value: "newuser" },
		});

		fireEvent.change(screen.getByTitle("Rola"), {
			target: { value: "newrole" },
		});

		fireEvent.click(screen.getByText("Dodaj"));

		expect(screen.getByText("newuser")).toBeInTheDocument();
		expect(screen.getByText("newrole")).toBeInTheDocument();
	});

	test("edits a user when 'Edytuj' button is clicked", () => {
		render(<Admin />);

		fireEvent.click(screen.getAllByTitle("Edytuj")[0]);

		fireEvent.change(screen.getByTitle("Edytuj rolę admin"), {
			target: { value: "superadmin" },
		});

		fireEvent.click(screen.getByTitle("Zapisz"));

		expect(screen.getByText("superadmin")).toBeInTheDocument();
	});

	test("deletes a user when 'Usuń' button is clicked", () => {
		render(<Admin />);

		fireEvent.click(screen.getAllByTitle("Usuń")[0]);

		expect(screen.queryByText("admin")).not.toBeInTheDocument();
	});
});
