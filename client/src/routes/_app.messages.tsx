import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/messages")({
	component: Message,
});

function Message() {
	return <div>Hello "/messages"!</div>;
}
