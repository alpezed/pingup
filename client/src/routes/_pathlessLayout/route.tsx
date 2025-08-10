import Menus from "@/components/menus";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessLayout")({
	component: App,
	beforeLoad: async ({ context, location }) => {
		if (!context.auth.user) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function App() {
	return (
		<div className='w-full flex h-screen'>
			<Menus />
			<div className='flex-1 bg-slate-50'>
				<Outlet />
			</div>
		</div>
	);
}
