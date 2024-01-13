import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const performLogin = async (login: string, password: string, navigate: (path: string) => void) => {
    // Sprawdzenie, czy pola nie są puste przed wysłaniem żądania
    if (!login || !password) {
        if (!login) alert("Username field may not be blank.");
        if (!password) alert("Password field may not be blank.");
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: login, password: password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Obsługa błędów zwróconych przez serwer
            if (data.detail) {
                alert(data.detail); // "No active account found with the given credentials"
            } else if (data.username) {
                alert(data.username.join(" ")); // "This field may not be blank."
            } else if (data.password) {
                alert(data.password.join(" ")); // "This field may not be blank."
            } else {
                throw new Error("An unknown error occurred.");
            }
        } else {
            console.log('Login successful:', data);
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            navigate('/dashboard');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Login failed:', error);
            alert("Login failed: " + error.message);
        } else {
            console.error('An unknown error occurred:', error);
            alert("Login failed: An unknown error occurred.");
        }
    }
};

export default function Login() {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

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
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1>Hasło</h1>
                        <input
                            className="py-3 px-2 w-full rounded-md"
                            type="password"
                            value={password}
                            aria-label="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grow w-full">
                        <button
                            className="py-8 w-full"
                            onClick={() => performLogin(login, password, navigate)}
                        >
                            <h1>Zaloguj</h1>
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
