import { UserAvatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user.type";
import { MapPin, UserPlus } from "lucide-react";

export function DiscoverPeople({ users }: { users: User[] }) {
	return (
		<>
			{users.map(user => (
				<div
					key={user.id}
					className="flex flex-col items-center gap-3 p-6 shadow rounded-lg bg-white w-2xs"
				>
					<UserAvatar user={user} className="w-16 h-16 text-3xl" />
					<div className="flex flex-col items-center">
						<h2 className="text-base font-semibold">{user.name}</h2>
						<div className="text-base text-gray-500">@{user.username}</div>
					</div>
					<div className="text-gray-600 text-center">{user.bio}</div>
					<div className="flex items-center text-xs gap-2">
						<div className="rounded-full border px-2 py-1 flex gap-1 text-gray-600 items-center">
							<MapPin size={14} />
							{user.location || "No Address"}
						</div>
						<div className="rounded-full border px-2 py-1 flex gap-1 text-gray-600 items-center">
							{user.followers?.length || 0} Followers
						</div>
					</div>
					<div className="mt-2">
						<Button
							size="lg"
							className="flex items-center justify-center gap-2"
						>
							<UserPlus />
							Following
						</Button>
					</div>
				</div>
			))}
		</>
	);
}
