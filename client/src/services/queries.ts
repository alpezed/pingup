import { mutationOptions, queryOptions } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";
import { posts as fetchPosts, post as fetchPost } from "@/services/post";
import * as apiStory from "@/services/story";
import {
  posts as fetchUserPosts,
  users as fetchUsers,
  user as fetchUser,
  connections as fetchConnections,
  follow as fetchFollow,
} from "@/services/user";
import type { APIResponse } from "@/types/api-response";
import type { User } from "@/types/user.type";
import { queryClient } from "@/main";

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
  users: (query?: { search: string; page: number; limit: number }) => {
    const params = new URLSearchParams();

    if (query) {
      // add ? to the beginning of the query string
      if (query.search) params.append("search", query.search);
      if (query.page) params.append("page", query.page.toString());
      if (query.limit) params.append("limit", query.limit.toString());
    }

    return queryOptions({
      queryKey: ["users", params.toString()],
      queryFn: () => fetchUsers(params.toString()),
      select: (data: APIResponse<User[]>) =>
        data.data.map((user) => ({ ...user })),
    });
  },
  user: (userId: string, key: "username" | "id" = "id") =>
    queryOptions({
      queryKey: ["users", userId],
      queryFn: () => fetchUser(userId, key),
    }),
  connections: (status?: "pending" | "accepted") => {
    return queryOptions({
      queryKey: ["connections", status],
      queryFn: () => fetchConnections(status),
    });
  },
  follow: (userId?: string, status?: "followers" | "following") => {
    return queryOptions({
      queryKey: ["follow", userId, status],
      queryFn: () => fetchFollow(userId!, status!),
      enabled: !!userId,
    });
  },
};

export const storyQueries = {
  stories: () =>
    queryOptions({
      queryKey: ["stories"],
      queryFn: () => apiStory.stories(),
    }),
  story: (storyId: string) =>
    queryOptions({
      queryKey: ["stories", storyId],
      queryFn: () => apiStory.story(storyId),
    }),
  createStory: () =>
    mutationOptions({
      mutationFn: (payload: FormData) => apiStory.createStory(payload),
      onError: (error: Error) => {
        console.error("Error creating story:", error.message);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["stories"] });
      },
    }),
};
