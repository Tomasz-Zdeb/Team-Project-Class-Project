import { Outlet } from "react-router-dom";
import Clock from "./components/Clock";
import Card from "./components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Layout() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center h-screen p-4 gap-4">
			<Card className="h-full w-full text-3xl">
				<div className="w-full flex items-center">
					<button
						className="text-4xl p-6"
						onClick={() => {
							navigate("/dashboard");
						}}
					>
						<FontAwesomeIcon
							icon={faHome}
							className="text-muted text-4xl"
						/>
					</button>
					<div className="flex-grow" />
					<Clock className="text-muted text-6xl" />
				</div>
				<Outlet />
			</Card>
		</div>
	);
}
