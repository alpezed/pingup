import type { Post } from "@/schema/post.schema";
import type { Profile } from "@/schema/profile.schema";
import type { APIResponse } from "@/types/api-response";
import type { Connection, User } from "@/types/user.type";

export async function users(query?: any) {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/users${query ? `?${query}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const response = (await result.json()) as APIResponse<User[]>;
  return response;
}

export async function user(userId: string, key: "username" | "id" = "id") {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${key === "username" ? "account/" : ""}${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.message);
  }

  const response = (await result.json()) as APIResponse<User>;

  return response;
}

export async function posts(userId: string) {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}/posts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const response = (await result.json()) as APIResponse<Post[]>;
  return response;
}

export async function updateProfile(input: FormData) {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/users/update-me`,
    {
      method: "PUT",
      body: input,
      credentials: "include",
    },
  );

  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.message);
  }

  const response = (await result.json()) as APIResponse<Profile>;

  return response;
}

export async function connections(status?: "pending" | "accepted") {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/connections${status ? `?status=${status}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const response = (await result.json()) as APIResponse<Connection[]>;
  return response;
}

export async function follow(
  userId: string,
  status: "followers" | "following",
) {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}/${status}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const response = (await result.json()) as APIResponse<User[]>;
  return response;
}
