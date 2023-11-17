import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="flex flex-col items-center justify-center h-screen p-6 gap-6">
			<Outlet />
		</div>
	);
}
