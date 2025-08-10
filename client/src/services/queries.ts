import { authClient } from "@/lib/auth-client";
import { queryOptions } from "@tanstack/react-query";

export const authQueries = {
	user: () =>
		queryOptions({
			queryKey: ["user"],
			queryFn: async () => (await authClient.getSession()).data?.user ?? null,
		}),
};
