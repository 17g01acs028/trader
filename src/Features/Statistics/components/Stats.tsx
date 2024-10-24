import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    useMantineTheme, Group, Stack,
} from '@mantine/core';
import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund, IconCurrencyRupee,
} from '@tabler/icons-react';
import classes from './Stats.module.css';

const mockdata = [
    { title: 'Deposit', icon: IconCreditCard, color: 'violet' ,amount:3000},
    { title: 'Withdraw', icon: IconBuildingBank, color: 'indigo',amount:500 },
    { title: 'Sell', icon: IconRepeat, color: 'blue',amount:10000 },
    { title: 'Profit', icon: IconReceiptRefund, color: 'green',amount:2000 },
];

export function Stats() {
    const theme = useMantineTheme();

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} className={classes.item}>
            <item.icon color={theme.colors[item.color][6]} size="2rem" />
            <Stack gap={0} justify={"start"} >
                <Text className={classes.title}>{item.title}</Text>
                <Group gap={2} className={classes.title}><IconCurrencyRupee size={16}/><Text fz={12}>{(item.amount).toLocaleString()}</Text></Group>
            </Stack>
        </UnstyledButton>
    ));

    return (
        <Card withBorder radius="md" className={classes.card}>
            <SimpleGrid cols={{base:2,md:2,lg:4}} mt="md">
                {items}
            </SimpleGrid>
        </Card>
    );
}