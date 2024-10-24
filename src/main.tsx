import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
// Import the generated route tree
import {routeTree} from './routeTree.gen';
import {createRouter, ErrorComponent, RouterProvider} from '@tanstack/react-router';
import "./index.css"
import {NotFoundImage} from "./Components/ERRORs/404/NotFoundImage.tsx";

// Create a new router instance
const router = createRouter({
    routeTree,
    defaultPendingComponent: () => (
        <div className={`p-2 text-2xl`}>

        </div>
    ),
    defaultNotFoundComponent: () => {

        return (
            <NotFoundImage/>
        )
    },
    defaultErrorComponent: ({error}) => {
        if (error instanceof Error) {
            // Render a custom error message
            return (
                <div style={{color: 'red'}}>
                    <div>Error!</div>
                    <div>{error.message}</div>
                </div>)
        }

        // Fallback to the default ErrorComponent
        return <ErrorComponent error={error}/>
    },

});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);