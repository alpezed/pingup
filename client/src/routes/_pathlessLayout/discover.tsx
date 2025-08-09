import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathlessLayout/discover')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/discover"!</div>
}
