import {createLazyFileRoute} from '@tanstack/react-router'
import {StatsRingCard} from "../../Components/StatsRingCard/StatsRingCard.tsx";
import {UserInfor} from "../../Features/Home/components/UserInfor.tsx";
import {Grid, Group, Stack} from "@mantine/core";
import {TransactionInfor} from "../../Features/Home/components/TransactionInfor.tsx";
import {ActionsGrid} from "../../Features/Home/components/ActionsGrid.tsx";
import {StatementGrid} from "../../Features/Home/components/StatementGrid.tsx";

export const Route = createLazyFileRoute('/_protected/home')({
    component: FileRoute
})

function FileRoute() {
    return (
        <Stack
            p={5}
            style={{
                width:"100%",
                maxWidth: "100%",
                boxSizing: "border-box",
            }}
        >
            <Grid
            style={{
                width:"100%",
                maxWidth: "100%",
                overflow:"hidden",
                boxSizing: "border-box",
            }}
            >
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}><UserInfor/></Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}><TransactionInfor/></Grid.Col>
            </Grid>
            <ActionsGrid/>
            <StatementGrid/>
        </Stack>

    )
}