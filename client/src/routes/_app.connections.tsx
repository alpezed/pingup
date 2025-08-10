import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/connections")({
	component: Connection,
});

function Connection() {
	return <div>Hello "/connections"!</div>;
}
