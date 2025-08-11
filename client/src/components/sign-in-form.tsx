import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import { signInSchema, type SignInFormValues } from "@/schema/login.schema";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";

export default function SignInForm() {
	const { login, isAuthSuccess } = useAuth();
	const [statusMessage, setStatusMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async (data: SignInFormValues) => {
		setStatusMessage("");
		await login(
			{ email: data.email, password: data.password },
			{
				onSuccess: () => {
					setStatusMessage("Login successful!");
				},
				onError: error => {
					setStatusMessage(error.message);
				},
			}
		);
	};

	return (
		<div className="flex flex-col w-full max-w-[400px]">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 bg-white px-8 py-8 rounded-lg rounded-b-none rounded-bl-none"
			>
				<div className="text-center mb-7 flex flex-col justify-center gap-1">
					<h2 className="text-lg font-bold">Sign in to</h2>
					<p className="text-gray-500 text-sm">
						Welcome back! Please sign in to continue
					</p>
				</div>
				{statusMessage && (
					<Alert variant={isAuthSuccess ? "success" : "destructive"}>
						<AlertCircleIcon />
						<AlertDescription>{statusMessage}</AlertDescription>
					</Alert>
				)}
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						autoComplete="email"
						placeholder="Enter your email address"
						{...register("email")}
						className={cn(
							"mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2",
							{
								"border-red-600": errors.email,
							}
						)}
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
					)}
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						autoComplete="current-password"
						{...register("password")}
						placeholder="Password here"
						className={cn(
							"mt-1 block w-full rounded-md border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2",
							{
								"border-red-600": errors.password,
							}
						)}
					/>
					{errors.password && (
						<p className="mt-1 text-sm text-red-600">
							{errors.password.message}
						</p>
					)}
				</div>
				<button
					type="submit"
					disabled={isSubmitting}
					className={cn(
						"w-full py-2 px-4 mt-2 cursor-pointer text-sm bg-indigo-950 text-white font-semibold rounded-md enabled:hover:bg-indigo-800 transition",
						{
							"bg-gray-300 cursor-not-allowed": isSubmitting,
						}
					)}
				>
					{isSubmitting ? "Signing in..." : "Sign In"}
				</button>
			</form>
			<div className="flex items-center justify-center h-14 bg-gray-100 rounded-b-lg rounded-bl-lg">
				<p className="text-gray-500 text-sm">
					Don’t have an account?{" "}
					<a href="#" className="text-gray-800 transition">
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}
