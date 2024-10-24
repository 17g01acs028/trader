import {createLazyFileRoute} from '@tanstack/react-router'

import {Account} from "../../Features/Account/components/Account.tsx";

export const Route = createLazyFileRoute('/_protected/account')({
    component: AccountRoute,
})

function AccountRoute() {
    return (
       <Account/>
    )
}