import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { userQueries } from "@/services/queries";

import { UserScreen } from "./-components/user-screen";

export const Route = createFileRoute("/_home/profile/$username")({
	component: UserProfile,
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(
			userQueries.user(params.username, "username")
		),
});

function UserProfile() {
	const { data: user } = Route.useLoaderData();
	const { data: posts } = useQuery(userQueries.posts(user._id));

	return <UserScreen user={user} posts={posts} />;
}
