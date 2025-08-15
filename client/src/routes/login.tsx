import { createFileRoute, redirect } from '@tanstack/react-router';
import SignInForm from '@/components/sign-in-form';
import { Star } from 'lucide-react';

export const Route = createFileRoute('/login')({
	component: Login,
	beforeLoad: ({ context }) => {
		if (context.isAuthed) {
			throw redirect({ to: '/' });
		}
	},
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
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={`rating-${i}`}
										size={24}
										className='size-4 md:size-4.5 text-transparent fill-amber-500'
									/>
								))}
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
						{' '}
						connect with global community on pingup.{' '}
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
