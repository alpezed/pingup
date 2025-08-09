// src/hooks/useAuth.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, login } from "@/services/auth";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export function useAuth() {
	const router = useRouter();
	// const { user, setUser } = useAuthStore();

	const { data, isSuccess } = useQuery({
		queryKey: ["me"],
		queryFn: getMe,
		retry: false,
	});

	const loginMutation = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			login(email, password),
		onSuccess: async data => {
			// setUser(data.user);
			await router.invalidate();
			router.navigate({ to: "/" });
		},
		onError: error => {
			alert(error.message);
		},
	});

	useEffect(() => {
		if (isSuccess && data) {
			// Perform side effects or update state with 'data'
			console.log("Data successfully fetched:", data);
			// Example: update a local state, trigger another action, etc.
		}
	}, [isSuccess, data]);

	// const signupMutation = useMutation({
	//   mutationFn: ({ email, password }: { email: string; password: string }) =>
	//     apiSignup(email, password),
	//   onSuccess: (data) => {
	//     setUser(data.user);
	//     queryClient.invalidateQueries({ queryKey: ["currentUser"] });
	//   },
	// });

	return {
		// user,
		login: loginMutation.mutateAsync,
		// signup: signupMutation.mutateAsync,
		// signupStatus: signupMutation.status,
	};
}
