import {
	faArrowRightFromBracket,
	faUtensils,
  faGears,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";


const performLogout = async (navigate: (path: string) => void) => {
     const accessToken = localStorage.getItem('accessToken');
    try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        const response = await fetch('http://localhost:8000/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to logout');
        }

        // Czyszczenie tokenów z localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Przekierowanie do strony logowania
        navigate('/login');
    } catch (error) {
        console.error('Error during logout:', error);
        // Tutaj można dodać obsługę błędów, np. wyświetlić komunikat
    }
};


export default function Dashboard() {
	const navigate = useNavigate();

	return (
        <div className="flex flex-wrap gap-4 justify-center items-center w-full h-full">
            <DashboardButton
                onClick={() => {
                    navigate("/order");
                }}
            >
                <FontAwesomeIcon icon={faShoppingCart} className="text-muted" />
                <span>Zamów</span>
            </DashboardButton>
            <DashboardButton
                onClick={() => {
                    navigate("/menu");
                }}
            >
                <FontAwesomeIcon icon={faUtensils} className="text-muted" />
                <span>Menu</span>
            </DashboardButton>
            <DashboardButton
                onClick={() => {
                    navigate("/admin");
                }}
            >
                <FontAwesomeIcon icon={faGears} className="text-muted" />
                <span>Zarządzanie</span>
            </DashboardButton>
            <DashboardButton
                onClick={() => {
                    performLogout(navigate);
                }}
            >
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-muted" />
                <span>Wyloguj</span>
            </DashboardButton>
        </div>
    );
}

