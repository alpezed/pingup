import { authQueries } from "@/services/queries";
import { type QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { auth } from "@/utils/auth";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ context }) => {
    const authUser = await context.queryClient.ensureQueryData(
      authQueries.user(),
    );

    return {
      auth: {
        ...auth,
        user: authUser!,
      },
      isAuthed: !!authUser,
    };
  },
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster />
    </>
  ),
});
