import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/profile")({
	component: Profile,
});

function Profile() {
	return <div>Hello "/profile"!</div>;
}
