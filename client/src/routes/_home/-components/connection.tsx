import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/services/queries";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user.type";
import { UserAvatar } from "@/components/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function Connections({ status }: { status?: "pending" | "accepted" }) {
  const { data: connections, isLoading } = useQuery(
    userQueries.connections(status),
  );

  return (
    <div className="flex gap-6">
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <ConnectionLoader key={index} />
        ))}
      {connections?.data.map((connection) => (
        <ConntectionItem user={connection.to_user} />
      ))}
    </div>
  );
}

export function ConntectionItem({ user }: { user: User }) {
  return (
    <div
      key={user._id}
      className="flex gap-3 p-6 shadow rounded-md bg-white w-[352px]"
    >
      <UserAvatar user={user} className="w-12 h-12 text-3xl" />
      <div className="flex flex-col flex-1 truncate">
        <div className="flex flex-col">
          <Link to="/profile/$username" params={{ username: user.username }}>
            <h2 className="text-base font-semibold">{user.name}</h2>
          </Link>
          <div className="text-base text-gray-500">@{user.username}</div>
        </div>
        <div className="text-gray-600 mb-2 truncate">{user.bio}</div>
        <Link to="/profile/$username" params={{ username: user.username }}>
          <Button size="lg" className="w-full">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function ConnectionLoader() {
  return (
    <div className="flex gap-3 p-6 shadow rounded-md bg-white w-[352px]">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-3 w-full mb-1" />
        <div className="flex text-xs gap-2 mb-1">
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
