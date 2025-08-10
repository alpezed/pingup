import { authQueries } from "@/services/queries";
import type { User } from "@/types/user.type";
import { type QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { auth } from "@/utils/auth";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	beforeLoad: async ({ context }) => {
		const authUser = await context.queryClient.ensureQueryData(
			authQueries.user()
		);

		return {
			auth: {
				...auth,
				user: authUser as User,
			},
			isAuthed: !!authUser,
		};
	},
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	),
});
