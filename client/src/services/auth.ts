import type { APIResponse } from "@/types/api-response";
import type { LoginResponse } from "@/types/auth.type";

export async function login(email: string, password: string) {
	const result = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
		credentials: "include",
	});

	if (!result.ok) {
		const error = await result.json();
		throw new Error(error.message);
	}

	const response = (await result.json()) as APIResponse<LoginResponse>;

	return response;
}

export async function getMe() {
	const result = await fetch("http://localhost:3001/api/v1/users/me", {
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // This automatically includes cookies
	});
	// if (!result.ok) throw new Error("Not authenticated");
	return result.json();
}

export async function logout() {
	const result = await fetch("http://localhost:3001/api/v1/users/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for logout
	});
	if (!result.ok) throw new Error("Logout failed");
	return result.json();
}
