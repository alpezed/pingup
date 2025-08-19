import Post from '@/components/post';
import Sidebar from '@/components/sidebar';
import Stories from '@/components/stories';
import { postQueries, storyQueries } from '@/services/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_home/')({
	component: RouteComponent,
	loader: ({ context }) =>
		Promise.all([
			context.queryClient.ensureQueryData(postQueries.posts()),
			context.queryClient.ensureQueryData(storyQueries.stories()),
		]),
	pendingComponent: () => <div>Please wait...</div>,
});

function RouteComponent() {
	const { data: posts } = useSuspenseQuery(postQueries.posts());

	return (
		<div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8 '>
			<div>
				<Stories />
				<div className='p-4 space-y-6'>
					{posts.data.map(post => (
						<Post post={post} key={post._id} />
					))}
				</div>
			</div>
			<Sidebar />
		</div>
	);
}
