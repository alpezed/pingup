import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, logout } from '@/services/auth';
import { authQueries } from '@/services/queries';
import { useRouter } from '@tanstack/react-router';

export function useAuth() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data: user } = useQuery(authQueries.user());

	const { mutateAsync: loginMutation, isSuccess } = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			login(email, password),
		onSuccess: () => {
			window.location.href = '/';
		},
	});

	const { mutateAsync: logoutMutation } = useMutation({
		mutationFn: () => logout(),
	});

	const logoutHandler = async () => {
		await logoutMutation();
		await queryClient.invalidateQueries();
		router.invalidate();
	};

	return {
		user,
		login: loginMutation,
		logout: logoutHandler,
		isAuthSuccess: isSuccess,
	};
}

export type AuthContext = ReturnType<typeof useAuth>;
