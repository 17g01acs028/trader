import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    useMantineTheme, Group, Stack, NavLink,
} from '@mantine/core';
import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund, IconCurrencyRupee, IconAntennaBars5, IconCoins, IconLoader3,
} from '@tabler/icons-react';
import classes from './Trade.module.css';


export function StatsDefComponent() {
    const theme = useMantineTheme();
    const mockdata = [
        {title: 'On process Payment', icon: IconLoader3, color: "yellow", amount: 3000},
        {title: 'My Commission Rate', icon: IconLoader3, color: 'yellow', amount: '0.5%'},
        {title: 'Matching', icon: IconLoader3, color: 'yellow', amount: 3},
        {title: 'Estimated Income', icon: IconLoader3, color: 'yellow', amount: 2000},
    ];

    const items = mockdata.map((item) => (
        <UnstyledButton p={5} key={item.title} className={classes.itemStart}>
            <Group gap={10}>
                <item.icon color={theme.colors[item.color][6]} size={16}/>
                <Text style={{fontSize:"12px", color:theme.colors.gray[5]}}>{item.title}</Text>
            </Group>
            <Group>
                <span style={{width:"15px"}}></span>
                <Group> {item.amount}</Group>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Stack gap={5}>
            <Group gap={3}>
                <IconCoins color={theme.colors.yellow[5]}/>
                <Text className={classes.title}>Payment</Text>
            </Group>

            <Card radius={"md"}>
                <Card.Section p={"xs"} style={{
                    backgroundColor: theme.colors.yellow[0]

                }}>
                    <Group justify="space-between">
                        <Text style={{fontSize: "12px", color: theme.colors.yellow[7], fontWeight: 900}}>Real
                            Time Exchange Rates(INR/USDT)</Text>
                        <Text
                            style={{fontSize: "12px", color: theme.colors.yellow[7], fontWeight: 900}}>95</Text>
                    </Group>
                </Card.Section>
                <Card.Section p={10}>
                    <SimpleGrid cols={{base: 2, md: 2, lg: 4}}>
                        {items}
                    </SimpleGrid>
                </Card.Section>

            </Card>

        </Stack>


    );
}