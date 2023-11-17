import {
	faArrowRightFromBracket,
	faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import DashboardButton from "../components/DashboardButton";
import Clock from "../components/Clock";

export default function Dashboard() {
	const navigate = useNavigate();

	return (
		<Card className="h-full w-full text-3xl">
			<div className="w-full flex justify-end">
				<Clock className="text-muted text-4xl" />
			</div>
			<div className="flex flex-wrap gap-4 justify-center items-center w-full h-full">
				<DashboardButton
					onClick={() => {
						navigate("/menu");
					}}
				>
					<FontAwesomeIcon icon={faUtensils} className="text-muted" />
					<span>Menu</span>
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
		</Card>
	);
}
