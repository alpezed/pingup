import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	return (
		<div className='min-h-screen flex flex-col md:flex-row '>
			<img
				className='absolute top-0 left-0 -z-1 w-full h-full object-cover'
				alt=''
				src='/assets/bgImage.png'
			/>
			<div className='flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40 '>
				<img className='h-12 object-contain' alt='' src='/assets/logo.svg' />
				<div>
					<div className='flex items-center gap-3 mb-4 max-md:mt-10'>
						<img className='h-8 md:h-10' alt='' src='/assets/group_users.png' />
						<div>
							<div className='flex'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width={24}
									height={24}
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth={2}
									strokeLinecap='round'
									strokeLinejoin='round'
									className='lucide lucide-star size-4 md:size-4.5 text-transparent fill-amber-500'
									aria-hidden='true'
								>
									<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width={24}
									height={24}
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth={2}
									strokeLinecap='round'
									strokeLinejoin='round'
									className='lucide lucide-star size-4 md:size-4.5 text-transparent fill-amber-500'
									aria-hidden='true'
								>
									<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width={24}
									height={24}
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth={2}
									strokeLinecap='round'
									strokeLinejoin='round'
									className='lucide lucide-star size-4 md:size-4.5 text-transparent fill-amber-500'
									aria-hidden='true'
								>
									<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width={24}
									height={24}
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth={2}
									strokeLinecap='round'
									strokeLinejoin='round'
									className='lucide lucide-star size-4 md:size-4.5 text-transparent fill-amber-500'
									aria-hidden='true'
								>
									<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width={24}
									height={24}
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth={2}
									strokeLinecap='round'
									strokeLinejoin='round'
									className='lucide lucide-star size-4 md:size-4.5 text-transparent fill-amber-500'
									aria-hidden='true'
								>
									<path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
								</svg>
							</div>
							<p className='text-blue-900 font-medium mt-0.5 '>
								Used by 12k+ developers
							</p>
						</div>
					</div>
					<h1 className='text-3xl md:text-6xl md:pb-2 font-bold bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent'>
						More than just friends truly connect
					</h1>
					<p className='text-xl md:text-3xl text-indigo-900 max-w-72 md:max-w-md'>
						{" "}
						connect with global community on pingup.{" "}
					</p>
				</div>
				<span className='md:h-10' />
			</div>
			<div className='flex-1 flex items-center justify-center p-6 sm:p-10'>
				<SignInForm />
			</div>
		</div>
	);
}

const signInSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

function SignInForm() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async (data: SignInFormValues) => {
		// handle sign in logic here
		console.log(data);
		await new Promise(resolve => setTimeout(resolve, 2000));

		navigate({ to: "/" });
	};

	return (
		<div className='flex flex-col w-full max-w-[400px]'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4 bg-white px-8 py-8 rounded-lg rounded-b-none rounded-bl-none'
			>
				<div className='text-center mb-7 flex flex-col justify-center gap-1'>
					<h2 className='text-lg font-bold'>Sign in to</h2>
					<p className='text-gray-500 text-sm'>
						Welcome back! Please sign in to continue
					</p>
				</div>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Email
					</label>
					<input
						id='email'
						type='email'
						autoComplete='email'
						placeholder='Enter your email address'
						{...register("email")}
						className={cn(
							"mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2",
							{
								"border-red-600": errors.email,
							}
						)}
					/>
					{errors.email && (
						<p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
					)}
				</div>
				<div>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'
					>
						Password
					</label>
					<input
						id='password'
						type='password'
						autoComplete='current-password'
						{...register("password")}
						placeholder='Password here'
						className={cn(
							"mt-1 block w-full rounded-md border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2",
							{
								"border-red-600": errors.password,
							}
						)}
					/>
					{errors.password && (
						<p className='mt-1 text-sm text-red-600'>
							{errors.password.message}
						</p>
					)}
				</div>
				<button
					type='submit'
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
			<div className='flex items-center justify-center h-14 bg-gray-100 rounded-b-lg rounded-bl-lg'>
				<p className='text-gray-500 text-sm'>
					Don’t have an account?{" "}
					<a href='#' className='text-gray-800 transition'>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}
