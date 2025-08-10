import type { Post } from "@/schema/post.schema";
import type { APIResponse } from "@/types/api-response";

export async function posts() {
	const result = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	const response = (await result.json()) as APIResponse<Post[]>;

	return response;
}
