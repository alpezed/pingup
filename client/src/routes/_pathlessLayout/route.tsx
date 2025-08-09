import Menus from "@/components/menus";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessLayout")({
	component: App,
});

function App() {
	return (
		<div className="w-full flex h-screen">
			<Menus />
			<div className="flex-1 bg-slate-50">
				<Outlet />
			</div>
		</div>
	)
}
