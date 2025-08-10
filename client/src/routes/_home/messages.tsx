import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/messages")({
	component: Message,
});

function Message() {
	return <div>Hello "/messages"!</div>;
}
