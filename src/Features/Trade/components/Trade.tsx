import {Button, Card, Stack, useMantineTheme} from "@mantine/core";
import classes from "./Trade.module.css"
import {Stats} from "./Stats.tsx";
import {StatsDefComponent} from "./StatsDefComponent.tsx";
export function Trade(){
    const theme = useMantineTheme();
    return (
        <Stack p={10}>
            <Card className={classes.maincard} p={9}>
                <Stack gap={10}>
                    <Stats/>
                    <StatsDefComponent/>
                </Stack>
            </Card>
            <Button radius={"md"} mb={20} variant="filled" color={theme.colors.yellow[5]}>START</Button>
        </Stack>
    )
}