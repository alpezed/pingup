import type { User } from "@/types/user.type";

export interface Auth {
	redirect: boolean;
	token: string;
	user: Pick<User, "id" | "email" | "name" | "image" | "username">;
}
