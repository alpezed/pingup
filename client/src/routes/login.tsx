import { createFileRoute } from "@tanstack/react-router";
import SignInForm from "@/components/login-form";

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
