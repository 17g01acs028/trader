import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Group,
    useMantineTheme,
} from '@mantine/core';
import {
     IconTransitionBottom, IconWallet, IconUserPlus, IconAlignBoxBottomCenter,
} from '@tabler/icons-react';
import classes from './ActionsGrid.module.css';

const mockdata = [
    {title: 'Deposit', icon: IconWallet, color: 'violet'},
    {title: 'Withdraw', icon: IconTransitionBottom, color: 'red'},
    {title: 'Ranking', icon: IconAlignBoxBottomCenter, color: 'green'},
    {title: 'Invitations', icon: IconUserPlus, color: 'blue'}
];

export function ActionsGrid() {
    const theme = useMantineTheme();

    const items = mockdata.map((item, index) => {
            if (index < 9) {
                return (
                    <UnstyledButton key={item.title} className={classes.item}>
                        <item.icon color={theme.colors[item.color][6]} size="2rem"/>
                        <Text size="xs" mt={7}>
                            {item.title}
                        </Text>
                    </UnstyledButton>
                )
            }
        }
    );

    return (
        <Card>
            <Group justify="space-between">
                <Text className={classes.title}>Services</Text>
                <Anchor size="xs" c="dimmed" style={{lineHeight: 1}}>
                    {`${mockdata.length - 10 > 0 ? mockdata.length - 10 + " other service(s)" : ""}`}
                </Anchor>
            </Group>
            <SimpleGrid cols={{base: 4, md: 5, lg: 7}} verticalSpacing="0" mt="xs">
                {items}
            </SimpleGrid>
        </Card>
    );
}