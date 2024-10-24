import {Card} from "@mantine/core";
import {StatsGroup} from "./StatsGroup.tsx";
import classes from './StatsGroup.module.css';
import {IconArrowDown, IconArrowUp} from "@tabler/icons-react";

export const TransactionInfor = () => {
    const data = [
        {
            title: 'Deposits',
            icon: <IconArrowUp size={35} className={classes.depositIcon}/>,
            amount:2000
        },
        {
            title: 'Withdraws',
            icon: <IconArrowDown size={35} className={classes.withdrawIcon}/>,
            amount:3000
        },
    ];
    return (
        <Card withBorder className={classes.statP} radius={"md"} m={5} color={"white"}>
                <StatsGroup data={data}/>
        </Card>
    )
}