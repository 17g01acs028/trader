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
    IconReceiptRefund, IconCurrencyRupee, IconAntennaBars5,
} from '@tabler/icons-react';
import classes from './Trade.module.css';

const mockdata = [
    {title: 'Balance', icon: IconCreditCard, color: 'violet', amount: 3000},
    {title: 'Sell', icon: IconBuildingBank, color: 'indigo', amount: 500},
    {title: 'My Commission', icon: IconRepeat, color: 'blue', amount: 10000},
    {title: 'Transaction', icon: IconReceiptRefund, color: 'green', amount: 2000},
];

export function Stats() {
    const theme = useMantineTheme();

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} className={classes.item}>
            <item.icon color={theme.colors[item.color][6]} size="2rem"/>
            <Stack gap={0} justify={"start"}>
                <Text className={classes.title}>{item.title}</Text>
                <Group gap={2} className={classes.title}><IconCurrencyRupee size={16}/><Text
                    fz={12}>{(item.amount).toLocaleString()}</Text></Group>
            </Stack>
        </UnstyledButton>
    ));

    return (
        <Stack gap={5}>
            <Group gap={3}>
                <IconAntennaBars5  color={theme.colors.yellow[5]}/>
                <Text className={classes.title} >Statistics</Text>
                <Text style={{color:theme.colors.gray[5],fontSize:"12px"}}>(12/12/2024)</Text>
            </Group>

            <SimpleGrid cols={{base: 2, md: 2, lg: 4}}>
                {items}
            </SimpleGrid>
        </Stack>


    );
}