import { MapPin, MessageCircle, Plus, UserMinus, UserPlus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { UserAvatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { follow } from "@/services/auth";
import type { User } from "@/types/user.type";

export function DiscoverPeople({ user }: { user: User }) {
	const { data: session, refetch: refetchSession } = authClient.useSession();
	const queryClient = useQueryClient();

	const { mutateAsync: followUser, isPending: isFollowing } = useMutation({
		mutationKey: ["follow"],
		mutationFn: (data: { userId: string; isFollow: boolean }) =>
			follow(data.isFollow, data.userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			refetchSession();
		},
	});

	const following = session?.user.following?.includes(user._id);

	async function handleFollow() {
		if (following) {
			await followUser({ userId: user._id, isFollow: false });
		} else {
			await followUser({ userId: user._id, isFollow: true });
		}
	}

	return (
		<div
			key={user._id}
			className='flex flex-col items-center gap-3 px-4 pt-6 pb-4 shadow rounded-lg bg-white w-2xs'
		>
			<UserAvatar user={user} className='w-16 h-16 text-3xl' />
			<div className='flex flex-col items-center'>
				<Link to='/profile/$username' params={{ username: user.username }}>
					<h2 className='text-base font-semibold'>{user.name}</h2>
				</Link>
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
					onClick={() => handleFollow()}
					disabled={isFollowing}
				>
					{following ? <UserMinus /> : <UserPlus />}
					{following ? "Following" : "Follow"}
				</Button>
				<Button size='lg' variant='outline' disabled={isFollowing}>
					{following ? <MessageCircle /> : <Plus className='text-slate-500' />}
				</Button>
			</div>
		</div>
	);
}
