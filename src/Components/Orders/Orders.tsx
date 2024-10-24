import {Center,  Paper, rem, SegmentedControl, Stack, UnstyledButton, useMantineTheme} from "@mantine/core";
import {IconCircleCheck, IconCircleLetterA, IconCircleX, IconProgress} from "@tabler/icons-react";
import {IconNoFile} from "./assets/Nofile.tsx";
import classes from "./Orders.module.css"

export function OrdersComponent() {

    const theme = useMantineTheme();

    return (

        <Stack p={10} style={{
            height: "100%",
            maxHeight: "100%",
        }}>
            <SegmentedControl
                radius="xl"
                size="md"
                style={{
                    overflow: "auto",
                }}
                className={`${classes.overflow}`}
                data={[
                    {
                        value: "processing",
                        label: (<Center style={{gap: 3}}><IconProgress
                            style={{width: rem(14), height: rem(16), color: "blue"}}/><span
                            style={{fontSize: "12px", color: "blue"}}>Processing</span></Center>)
                    }, {
                        value: "Complete",
                        label: (<Center style={{gap: 3}}><IconCircleCheck
                            style={{width: rem(14), height: rem(16), color: "green"}}/><span
                            style={{fontSize: "12px", color: "green"}}>Complete</span></Center>)
                    },
                    {
                        value: "close",
                        label: (<Center style={{gap: 3}}><IconCircleX
                            style={{width: rem(14), height: rem(16), color: "red"}}/><span
                            style={{fontSize: "12px", color: "red"}}>Close</span></Center>)
                    },
                    {
                        value: "All",
                        label: (<Center style={{gap: 3}}><IconCircleLetterA
                            style={{width: rem(14), height: rem(16), color: "teal"}}/><span
                            style={{fontSize: "12px", color: "teal"}}>All</span></Center>)
                    }
                ]}
                // classNames={classes}
            />
            <Stack
                align={"center"}
                flex={1}
                style={{
                    height: "100%",
                    maxHeight: "100%",
                    overflowY: "auto",
                }}
            >
                <Stack align={"center"} justify="top"
                       style={{
                           height: "100%",
                           maxHeight: "100%",
                       }}
                       gap={0}
                >
                    <Paper mt={40}>
                        <IconNoFile  size={150} color={theme.colors.gray[4]}/>
                    </Paper>
                    <p style={{
                        fontSize: "14px",
                        color:theme.colors.gray[5],
                        fontWeight:900
                    }}>No Data</p>
                    <UnstyledButton style={{
                        fontSize: "16px",
                        color:theme.colors.gray[5],
                        fontWeight:900
                    }}>No more, Click to load again</UnstyledButton>
                </Stack>

            </Stack>


        </Stack>

    )
}