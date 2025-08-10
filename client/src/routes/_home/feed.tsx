import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/feed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/feed"!</div>
}
