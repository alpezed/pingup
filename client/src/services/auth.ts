import type { APIResponse } from "@/types/api-response";
import type { LoginResponse } from "@/types/auth.type";

export async function login(email: string, password: string) {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
    mode: "cors",
  });

  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.message);
  }

  const response = (await result.json()) as APIResponse<LoginResponse>;

  return response;
}

export async function getMe() {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  });
  return result.json();
}

export async function logout() {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  });
  if (!result.ok) throw new Error("Logout failed");
  return result.json();
}

export async function follow(isFollow: boolean, userId: string) {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}/${isFollow ? "follow" : "unfollow"}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    },
  );

  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.message);
  }

  const response = (await result.json()) as APIResponse<unknown>;

  return response;
}
