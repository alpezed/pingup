import type { User } from "@/types/user.type";
import type { Auth as AuthType } from "@/types/auth.type";
import type { APIResponse } from "@/types/api-response";
import { logout as logoutFn } from "@/services/api";

export const auth: Auth = {
	user: undefined,
	login: async (
		email: string,
		password: string
	): Promise<APIResponse<AuthType>> => {
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

		const response = await result.json();

		if (response?.error) throw new Error(response.message);

		auth.user = response.data.user;

		return response;
	},
	logout: async () => {
		await logoutFn();
		window.location.href = "/login";
	},
};

export interface Auth {
	login: (email: string, password: string) => Promise<APIResponse<AuthType>>;
	logout: () => Promise<void>;
	user?: User;
}
