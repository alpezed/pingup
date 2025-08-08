import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-post")({
	component: CreatePost,
});

function CreatePost() {
	return <div>Hello "/create-post"!</div>;
}
