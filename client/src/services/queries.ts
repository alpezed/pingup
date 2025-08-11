import { authClient } from "@/lib/auth-client";
import { posts as fetchPosts } from "@/services/post";
import { posts as fetchUserPosts } from "@/services/user";
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
	userPosts: (userId: string) =>
		queryOptions({
			queryKey: ["posts", userId],
			queryFn: () => fetchUserPosts(userId),
		}),
};

export const userQueries = {
	posts: (userId: string) =>
		queryOptions({
			queryKey: ["posts", userId],
			queryFn: () => fetchUserPosts(userId),
		}),
};
