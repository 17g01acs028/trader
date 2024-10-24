import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';
import {account} from "../lib/appwrite.ts";

export const Route = createFileRoute('/_public')({
    component: LayoutRoute,
    beforeLoad: async ({location}) => {
        try {
            const user = await account.get();
            if (user && user?.status) {
                throw redirect({
                    to: '/home'
                })
            }
        }catch (error){
            console.log(error)
        }


        if (location.pathname === '/') {
            throw redirect({
                to: '/auth'
            })
        }
    },
})

function LayoutRoute() {
    return (
        <main
            className="flex-column"
            style={{
                height: '100vh',
                width: '100%'
            }}
        >
            <div
                style={{
                    flex: 1,
                    boxSizing: 'border-box',
                    height: '100vh',
                    width: '100%',
                    padding: '.5rem'
                }}
            >
                {/* Render the outlet for child routes */}
                <Outlet/>
            </div>
        </main>
    );
}