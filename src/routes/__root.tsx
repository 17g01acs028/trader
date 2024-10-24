import {createRootRoute, Outlet, redirect} from "@tanstack/react-router";
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "../Features/Authentication/Components/AuthContext.tsx";

const queryClient = new QueryClient()
export const Route = createRootRoute({

    component: () => (
        <MantineProvider defaultColorScheme="light">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                        <Notifications/>
                        <Outlet/>
                </AuthProvider>
            </QueryClientProvider>
        </MantineProvider>
    ),
    beforeLoad: async ({location}) => {
        if (location.pathname === '/') {
            throw redirect({
                to: '/auth'
            })
        }
    },
})