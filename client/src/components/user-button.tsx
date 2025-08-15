import { UserAvatar } from '@/components/avatar';
import { cn } from '@/lib/utils';
import { useRouteContext } from '@tanstack/react-router';

export default function UserButton({
	className,
	avatarClassName,
	onClick,
}: {
	className?: string;
	avatarClassName?: string;
	onClick?: () => void;
}) {
	const { auth } = useRouteContext({ from: '__root__' });

	return (
		<div
			className={cn('flex items-center gap-2 text-sm', className)}
			onClick={onClick}
		>
			<div
				className={cn('w-8 h-8 rounded-full overflow-hidden', avatarClassName)}
			>
				<UserAvatar user={auth.user} className='w-full h-full' />
			</div>
			<div className='flex flex-col'>
				<h1 className='font-medium'>{auth.user.name}</h1>
				<p className='text-xs text-gray-500'>@{auth.user.username}</p>
			</div>
		</div>
	);
}
