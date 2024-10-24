import { createLazyFileRoute } from '@tanstack/react-router'
import {Statistics} from "../../Features/Statistics/components/Statistics.tsx";

export const Route = createLazyFileRoute('/_protected/statistics')({
  component: StatisticsRoute,
})

function StatisticsRoute(){
    return <Statistics/>
}