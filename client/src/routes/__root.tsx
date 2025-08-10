import type { AuthContext } from "@/hooks/use-auth";
import { authQueries } from "@/services/queries";
import type { User } from "@/types/user.type";
import { type QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<{
	auth: AuthContext;
	queryClient: QueryClient;
}>()({
	beforeLoad: async ({ context, location }) => {
		console.log("--beforeLoad", location.pathname !== "/login");

		if (location.pathname !== "/login") {
			const authState = await context.queryClient.ensureQueryData(
				authQueries.user()
			);
			context.auth.user = authState.data as User;
		}

		return context;
	},
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	),
});
