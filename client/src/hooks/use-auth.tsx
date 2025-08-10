import { useMutation, useQuery } from "@tanstack/react-query";
import { login, logout } from "@/services/auth";
import { authQueries } from "@/services/queries";
import type { User } from "@/types/user.type";

export function useAuth() {
	const { data: user } = useQuery(authQueries.user());

	const { mutateAsync: loginMutation } = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			login(email, password),
		onSuccess: () => {
			window.location.href = "/";
		},
		onError: error => {
			alert(error.message);
		},
	});

	const { mutateAsync: logoutMutation } = useMutation({
		mutationFn: () => logout(),
	});

	const logoutHandler = async () => {
		await logoutMutation();
		window.location.href = "/login";
	};

	return {
		user: user as User, // user as User,
		login: loginMutation,
		logout: logoutHandler,
	};
}

export type AuthContext = ReturnType<typeof useAuth>;
