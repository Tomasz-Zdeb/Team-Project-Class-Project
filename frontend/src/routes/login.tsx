import { useState } from "react";
import Card from "../components/card";

const performLogin = async (login: string, password: string) => {
	console.log("login:", login, "password:", password);
	// TODO: make api call here
};

export default function Login() {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Card className="w-96 h-[418px]">
				<div className="flex flex-col gap-6 w-full grow">
					<div className="flex flex-col gap-1">
						<h1>Login</h1>
						<input
							className="py-3 px-2 w-full rounded-md"
							value={login}
							aria-label="login"
							onChange={(e) => setLogin(e.target.value)}
						></input>
					</div>
					<div className="flex flex-col gap-1">
						<h1>Hasło</h1>
						<input
							className="py-3 px-2 w-full rounded-md"
							type="password"
							value={password}
							aria-label="password"
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
				</div>
				<div className="grow w-full">
					<button
						className="py-8 w-full"
						onClick={() => performLogin(login, password)}
					>
						<h1>Zaloguj</h1>
					</button>
				</div>
			</Card>
		</div>
	);
}
