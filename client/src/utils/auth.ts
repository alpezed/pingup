import type { User } from "@/types/user.type";
import { logout as logoutFn, login as loginFn } from "@/services/auth";

export const auth: Auth = {
	user: undefined,
	login: async (
		email: string,
		password: string
	): Promise<ReturnType<typeof loginFn>> => {
		const result = await loginFn(email, password);
		console.log({ result });
		return result;
	},
	logout: async () => {
		await logoutFn();
		window.location.href = "/login";
	},
};

export interface Auth {
	login: (
		email: string,
		password: string
	) => Promise<ReturnType<typeof loginFn>>;
	logout: () => Promise<void>;
	user?: User;
}
