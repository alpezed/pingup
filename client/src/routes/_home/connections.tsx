import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/connections")({
  component: Connection,
});

function Connection() {
  return <div>Hello "/connections"!</div>;
}
