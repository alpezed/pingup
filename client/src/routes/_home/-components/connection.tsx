import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/services/queries";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user.type";
import { UserAvatar } from "@/components/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { UserCheck } from "lucide-react";

export function Connections({ status }: { status?: "pending" | "accepted" }) {
  const { data: connections, isLoading } = useQuery(
    userQueries.connections(status),
  );

  if (isLoading) {
    return (
      <div className="flex gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <ConnectionLoader key={index} />
        ))}
      </div>
    );
  }

  if (!connections || connections.data.length === 0) {
    return (
      <div className="text-slate-400 text-center w-full py-12">
        <UserCheck className="w-8 h-8 mx-auto mb-2 text-slate-400 stroke-1.5" />
        No users found
      </div>
    );
  }

  return (
    <div className="flex gap-6">
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
        <div className="flex flex-col self-start">
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

export function FollowUser({ type }: { type: "followers" | "following" }) {
  const { data: session } = authClient.useSession();

  const { data: users, isLoading } = useQuery(
    userQueries.follow(session?.user.id, type),
  );

  if (isLoading) {
    return (
      <div className="flex gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <ConnectionLoader key={index} />
        ))}
      </div>
    );
  }

  if (!users || users.data.length === 0) {
    return (
      <div className="text-slate-400 text-center w-full py-12">
        <UserCheck className="w-8 h-8 mx-auto mb-2 text-slate-400 stroke-1.5" />
        No {type === "followers" ? "followers" : "users you are following"}{" "}
        found
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {users?.data.map((user) => (
        <ConntectionItem user={user} />
      ))}
    </div>
  );
}
