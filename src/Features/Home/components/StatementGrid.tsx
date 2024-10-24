import {
    Card,
    Text,
    Anchor,
    Group, Accordion, ThemeIcon,
} from '@mantine/core';
import classes from './ActionsGrid.module.css';
import {IconArrowUpRight, IconArrowDownRight} from '@tabler/icons-react';


export function StatementGrid() {
    const data = [
        {title: 'Revenue', value: '$13,456', diff: 34},
        {title: 'Profit', value: '$4,145', diff: -13},
        {title: 'Coupons usage', value: '$745', diff: 18},
    ];

    const items = data.map((item) => {
        const DiffIcon = item.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
        return (
            <Accordion.Item key={item.value} value={item.value}>
                <Accordion.Control icon={<>
                    <ThemeIcon
                        color="gray"
                        variant="light"
                        style={{
                            color: item.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
                        }}
                        size={35}
                        radius="md"
                    >
                        <DiffIcon size="1.8rem" stroke={1.5}/>
                    </ThemeIcon>
                </>}>
                    <div>
                        <Text size="sm" fw={500}>
                            {item.value}
                        </Text>
                        <Text c="dimmed" size="xs">
                            17 Oct, 16:29 PM
                        </Text>
                    </div>

                </Accordion.Control>
                <Accordion.Panel>{item.value}</Accordion.Panel>
            </Accordion.Item>
        )
    });

    return (
        <Card>
            <Group justify="space-between">
                <Text className={classes.title}>Statements</Text>
                <Anchor size="xs" c="dimmed" style={{lineHeight: 1}}>
                    + 30 other Statements
                </Anchor>
            </Group>
            <Accordion>
                {items}
            </Accordion>
        </Card>
    );
}