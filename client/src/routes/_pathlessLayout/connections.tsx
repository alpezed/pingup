import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessLayout/connections")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/connections"!</div>;
}
