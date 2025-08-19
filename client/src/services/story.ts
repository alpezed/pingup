import type { Story } from "@/schema/story.schema";
import type { APIResponse } from "@/types/api-response";

export async function stories() {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/stories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const response = (await result.json()) as APIResponse<Story[]>;

  return response;
}

export async function story(storyId: string) {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/stories/${storyId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  const response = (await result.json()) as APIResponse<Story>;

  return response;
}

export async function addStory(payload: FormData) {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/stories`, {
    method: "POST",
    credentials: "include",
    body: payload,
  });

  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.message);
  }

  const response = (await result.json()) as APIResponse<Story>;

  return response;
}
