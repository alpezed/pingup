import Post from "@/components/post";
import Sidebar from "@/components/sidebar";
import Stories from "@/components/stories";
import { postsQueryOptions } from "@/utils/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/")({
	component: RouteComponent,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(postsQueryOptions()),
});

function RouteComponent() {
	const { data: posts } = useSuspenseQuery(postsQueryOptions());

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
