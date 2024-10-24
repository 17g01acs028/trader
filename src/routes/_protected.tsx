import {createFileRoute, Outlet} from '@tanstack/react-router'
import {NavbarMinimal} from "../Features/NavBar/components/NavBar.tsx";
import AuthenticatedComponent from "../Features/Authentication/Components/AuthedicatedContext.tsx";
import {Header} from "../Features/Header/components/Header.tsx";

export const Route = createFileRoute('/_protected')({
    component: LayoutRoute,
})


function LayoutRoute() {

    return (
        <AuthenticatedComponent>
            <div className="portal-layout">
                <header className={'portal-header'}>
                    <Header/>
                </header>
                <aside className="portal-sidebar">
                    <NavbarMinimal/>
                </aside>
                <main className="portal-main">
                    <Outlet/>
                </main>
            </div>
        </AuthenticatedComponent>
    )
}
