import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/dashboard')({
    component: FileRoute,
})

function FileRoute() {
    return <h3>Dashboard Page</h3>
}