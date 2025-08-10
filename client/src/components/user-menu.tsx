import { useRouteContext } from "@tanstack/react-router";
import UserButton from "./user-button";

export default function UserMenu() {
	const { logout } = useRouteContext({ from: "__root__" }).auth;

	return (
		<div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
			<UserButton className='cursor-pointer' />
			<button
				type='button'
				onClick={logout}
				className='flex items-center gap-2 cursor-pointer'
			>
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
					className='lucide lucide-log-out w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'
					aria-hidden='true'
				>
					<path d='m16 17 5-5-5-5' />
					<path d='M21 12H9' />
					<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
				</svg>
			</button>
		</div>
	);
}
