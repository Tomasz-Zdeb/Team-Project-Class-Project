import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, test, describe } from "vitest";

import Login from "./login";

describe("Login", () => {
	test("has login and password input", () => {
		const { getByLabelText } = render(<Login />);
		expect(getByLabelText("login")).toBeInTheDocument();
		expect(getByLabelText("password")).toBeInTheDocument();
	});

	test("has login button", () => {
		const { getByText } = render(<Login />);
		expect(getByText("Zaloguj")).toBeInTheDocument();
	});

	test("login", () => {
		const { getByLabelText, getByText } = render(<Login />);
		const loginInput = getByLabelText("login");
		const passwordInput = getByLabelText("password");
		const loginButton = getByText("Zaloguj");

		fireEvent.change(loginInput, { target: { value: "test" } });
		fireEvent.change(passwordInput, { target: { value: "test" } });
		fireEvent.click(loginButton);

		expect(loginInput).toHaveValue("test");
		expect(passwordInput).toHaveValue("test");
	});
});
