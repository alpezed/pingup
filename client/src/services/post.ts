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

export async function post(postId: string) {
	const result = await fetch(
		`${import.meta.env.VITE_API_URL}/posts/${postId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		}
	);

	const response = (await result.json()) as APIResponse<Post>;

	return response;
}

export async function addPost(payload: FormData) {
	const result = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
		method: "POST",
		credentials: "include",
		body: payload,
	});

	if (!result.ok) {
		const error = await result.json();
		throw new Error(error.message);
	}

	const response = (await result.json()) as APIResponse<Post>;

	return response;
}
