import {Group, Stack, Text} from '@mantine/core';
import classes from './StatsGroup.module.css';
import {
    IconCurrencyRupee,

} from "@tabler/icons-react";

interface Props {
    data:any,

}

export function StatsGroup(props: Props) {
    const stats = props?.data.map((stat) => (
        <div key={stat.title} className={classes.stat}>
            {stat.icon}
            <Stack gap={0} justify={"start"} >
                <Text className={classes.title}>{stat.title}</Text>
                <Group gap={2} className={classes.title}><IconCurrencyRupee size={16}/><Text fz={12}>{(stat.amount).toLocaleString()}</Text></Group>
            </Stack>

        </div>
    ));
    return <div className={classes.root}>{stats}</div>;
}