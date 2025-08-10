import Post from "@/components/post";
import Sidebar from "@/components/sidebar";
import Stories from "@/components/stories";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8 '>
			<div>
				<Stories />
				<div className='p-4 space-y-6'>
					<Post />
				</div>
			</div>
			<Sidebar />
		</div>
	)
}
