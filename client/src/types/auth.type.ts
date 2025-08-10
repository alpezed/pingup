import type { User } from "@/types/user.type";

export interface LoginResponse {
	redirect: boolean;
	token: string;
	user: Pick<
		User,
		| "id"
		| "email"
		| "name"
		| "image"
		| "createdAt"
		| "updatedAt"
		| "emailVerified"
	>;
}
