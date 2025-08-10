import { getMe } from "@/services/api";
import { queryOptions } from "@tanstack/react-query";

export const authQueries = {
	user: (enabled: boolean = true) =>
		queryOptions({
			queryKey: ["me"],
			queryFn: getMe,
			retry: false,
			enabled: enabled,
		}),
};
