import CreatePost from "@/components/create-post";
import UserMenu from "@/components/user-menu";
import { Link, useRouterState } from "@tanstack/react-router";

const menuItems = [
	{
		label: "Feed",
		to: "/",
		icon: (
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
				className='lucide lucide-house w-5 h-5'
				aria-hidden='true'
			>
				<path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' />
				<path d='M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
			</svg>
		),
		activeProps: () => ({
			className: "bg-indigo-50 text-indigo-700",
		}),
	},
	{
		label: "Messages",
		to: "/messages",
		icon: (
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
				className='lucide lucide-message-circle w-5 h-5'
				aria-hidden='true'
			>
				<path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
			</svg>
		),
		activeProps: () => ({
			className: "bg-indigo-50 text-indigo-700",
		}),
	},
	{
		label: "Connections",
		to: "/connections",
		icon: (
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
				className='lucide lucide-users w-5 h-5'
				aria-hidden='true'
			>
				<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
				<path d='M16 3.128a4 4 0 0 1 0 7.744' />
				<path d='M22 21v-2a4 4 0 0 0-3-3.87' />
				<circle cx={9} cy={7} r={4} />
			</svg>
		),
		activeProps: () => ({
			className: "bg-indigo-50 text-indigo-700",
		}),
	},
	{
		label: "Discover",
		to: "/discover",
		icon: (
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
				className='lucide lucide-search w-5 h-5'
				aria-hidden='true'
			>
				<path d='m21 21-4.34-4.34' />
				<circle cx={11} cy={11} r={8} />
			</svg>
		),
		activeProps: () => ({
			className: "bg-indigo-50 text-indigo-700",
		}),
	},
	{
		label: "Profile",
		to: "/account/profile",
		icon: (
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
				className='lucide lucide-user w-5 h-5'
				aria-hidden='true'
			>
				<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
				<circle cx={12} cy={7} r={4} />
			</svg>
		),
		activeProps: () => ({
			className: "bg-indigo-50 text-indigo-700",
		}),
	},
];

export default function Menus() {
	const { location } = useRouterState();

	return (
		<div className='w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20  max-sm:-translate-x-full transition-all duration-300 ease-in-out'>
			<div className=' w-full'>
				<img className='w-26 ml-7 my-2 cursor-pointer' src='/assets/logo.svg' />
				<hr className='border-gray-300 mb-8' />
				<div className='px-6 text-gray-600 space-y-1 font-medium'>
					{menuItems.map(item => (
						<Link
							key={item.to}
							className={`px-3.5 py-2 flex items-center gap-3 rounded-xl ${location.pathname === item.to ? "" : "hover:bg-gray-50"}`}
							to={item.to}
							{...(item.activeProps ? { activeProps: item.activeProps } : {})}
						>
							{item.icon}
							{item.label}
						</Link>
					))}
				</div>
				<CreatePost />
			</div>
			<UserMenu />
		</div>
	);
}
