import { UserAvatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import type { User } from "@/types/user.type";
import { MapPin, Plus, UserPlus } from "lucide-react";

export function DiscoverPeople({ users }: { users: User[] }) {
	const { data: session } = authClient.useSession();

	return (
		<>
			{users.map(user => (
				<div
					key={user.id}
					className='flex flex-col items-center gap-3 p-6 shadow rounded-lg bg-white w-2xs'
				>
					<UserAvatar user={user} className='w-16 h-16 text-3xl' />
					<div className='flex flex-col items-center'>
						<h2 className='text-base font-semibold'>{user.name}</h2>
						<div className='text-base text-gray-500'>@{user.username}</div>
					</div>
					<div className='text-gray-600 text-center'>{user.bio}</div>
					<div className='flex items-center text-xs gap-2 mb-1'>
						<div className='rounded-full border px-2 py-1 flex gap-1 text-gray-600 items-center'>
							<MapPin size={14} />
							{user.location || "No Address"}
						</div>
						<div className='rounded-full border px-2 py-1 flex gap-1 text-gray-600 items-center'>
							{user.followers?.length || 0} Followers
						</div>
					</div>
					<div className='mt-auto flex gap-2 w-full'>
						<Button
							size='lg'
							className='flex flex-1 items-center justify-center gap-2'
						>
							<UserPlus />
							{session?.user.following?.includes(user.id)
								? "Following"
								: "Follow"}
						</Button>
						<Button size='lg' variant='outline'>
							<Plus />
						</Button>
					</div>
				</div>
			))}
		</>
	);
}
