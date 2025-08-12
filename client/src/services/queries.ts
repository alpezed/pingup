import { authClient } from "@/lib/auth-client";
import { posts as fetchPosts, post as fetchPost } from "@/services/post";
import { posts as fetchUserPosts, users as fetchUsers } from "@/services/user";
import type { APIResponse } from "@/types/api-response";
import type { User } from "@/types/user.type";
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
	post: (postId: string) =>
		queryOptions({
			queryKey: ["posts", postId],
			queryFn: () => fetchPost(postId),
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
	users: () =>
		queryOptions({
			queryKey: ["users"],
			queryFn: () => fetchUsers(),
			select: (data: APIResponse<User[]>) =>
				data.data.map(user => ({ ...user, id: user._id })),
		}),
};
