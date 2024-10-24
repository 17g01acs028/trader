import { createLazyFileRoute } from '@tanstack/react-router'
import {Trade} from "../../Features/Trade/components/Trade.tsx";

export const Route = createLazyFileRoute('/_protected/trade')({
  component: TradeRoute,
})

function TradeRoute(){
    return <Trade/>
}