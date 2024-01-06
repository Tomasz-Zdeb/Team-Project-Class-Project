import {
	faArrowRightFromBracket,
	faUtensils,
  faGears,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";

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
			// TODO: add logout functionality
			>
				<FontAwesomeIcon
					icon={faArrowRightFromBracket}
					className="text-muted"
				/>
				<span>Wyloguj</span>
			</DashboardButton>
		</div>
	);
}
