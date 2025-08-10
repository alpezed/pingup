import { authClient } from "@/lib/auth-client";
import { posts as fetchPosts } from "@/services/post";
import { queryOptions } from "@tanstack/react-query";

export const authQueries = {
	user: () =>
		queryOptions({
			queryKey: ["user"],
			queryFn: async () => (await authClient.getSession()).data?.user ?? null,
		}),
};

export const postQueries = {
	posts: () =>
		queryOptions({
			queryKey: ["posts"],
			queryFn: () => fetchPosts(),
		}),
};
