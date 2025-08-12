import {
	DiscoverPeople,
	DiscoverPeopleSkeleton,
} from "@/routes/_home/-components/discover-people";
import { userQueries } from "@/services/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_home/discover")({
	component: RouteComponent,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(userQueries.users()),
});

function RouteComponent() {
	const { data: users, isFetching } = useSuspenseQuery(userQueries.users());

	return (
		<div className='max-w-6xl mx-auto p-6'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-900 mb-2'>
					Discover People
				</h1>
				<p className='text-slate-600'>
					Connect with amazing people and grow your network
				</p>
			</div>
			<div className='mb-8 shadow-md rounded-md border border-slate-200/60 bg-white/80'>
				<div className='p-6'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
						<input
							placeholder='Search people by name, username, bio, or location...'
							className='pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm'
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-wrap gap-6'>
				{isFetching ? (
					<>
						{Array.from({ length: 6 }).map((_, i) => (
							<DiscoverPeopleSkeleton key={i} />
						))}
					</>
				) : (
					<>
						{users?.map(user => (
							<DiscoverPeople key={user._id} user={user} />
						))}
					</>
				)}
			</div>
		</div>
	);
}
