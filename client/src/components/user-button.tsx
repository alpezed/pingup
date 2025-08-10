import { useRouteContext } from "@tanstack/react-router";

export default function UserButton() {
	const { user, logout } = useRouteContext({ from: "/_pathlessLayout/" }).auth;

	return (
		<div className='flex items-center gap-2 cursor-pointer' onClick={logout}>
			<div className='w-8 h-8 rounded-full overflow-hidden'>
				<img src={user.image} alt={user.username} className='object-cover' />
			</div>
			<div className='flex flex-col'>
				<h1 className='text-sm font-medium'>{user.name}</h1>
				<p className='text-xs text-gray-500'>@{user.username}</p>
			</div>
		</div>
	);
}
