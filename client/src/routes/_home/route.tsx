import Menus from "@/components/menus";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_home")({
	component: Home,
	beforeLoad: async ({ context, location }) => {
		if (!context.isAuthed) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function Home() {
	return (
		<div className='w-full flex h-screen'>
			<Menus />
			<div className='flex-1 bg-slate-50'>
				<Outlet />
			</div>
		</div>
	);
}
