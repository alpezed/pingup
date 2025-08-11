import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export default function UserButton({
	className,
	avatarClassName,
	onClick,
}: {
	className?: string;
	avatarClassName?: string;
	onClick?: () => void;
}) {
	const { user } = useAuth();

	return (
		<div
			className={cn("flex items-center gap-2 text-sm", className)}
			onClick={onClick}
		>
			<div
				className={cn("w-8 h-8 rounded-full overflow-hidden", avatarClassName)}
			>
				<img
					src={user.image ?? ""}
					alt={user.username}
					className='object-cover'
				/>
			</div>
			<div className='flex flex-col'>
				<h1 className='font-medium'>{user.name}</h1>
				<p className='text-xs text-gray-500'>@{user.username}</p>
			</div>
		</div>
	);
}
