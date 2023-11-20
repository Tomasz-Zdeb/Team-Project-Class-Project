import { Outlet } from "react-router-dom";
import Clock from "./components/Clock";
import Card from "./components/Card";

export default function Layout() {
	return (
		<div className="flex flex-col items-center justify-center h-screen p-6 gap-6">
			<Card className="h-full w-full text-3xl">
				<div className="w-full flex justify-end">
					<Clock className="text-muted text-4xl" />
				</div>
				<Outlet />
			</Card>
		</div>
	);
}
