import {createLazyFileRoute} from '@tanstack/react-router'
import {OrdersComponent} from "../../Components/Orders/Orders.tsx";

export const Route = createLazyFileRoute('/_protected/orders')({
    component: Orders,
})

function Orders() {

    return (
       <OrdersComponent/>
    )
}