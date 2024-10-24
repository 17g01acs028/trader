import {createFileRoute, Outlet, useNavigate} from '@tanstack/react-router';
import {useAuth} from "../Features/Authentication/Components/AuthContext.tsx";
import {useEffect} from "react";

export const Route = createFileRoute('/_public')({
    component: LayoutRoute
})

function LayoutRoute() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const userStatus = user?.status;
    useEffect(() => {
        if (userStatus) {
            navigate({ to: "/home" });
        }
    }, [userStatus, navigate]);
    return (
        <>
            {!userStatus && (
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
                        <Outlet />
                    </div>
                </main>
            )}
        </>
    );
}