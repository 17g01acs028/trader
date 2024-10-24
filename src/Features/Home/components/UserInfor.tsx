import {Card, em, Group, Text, useMantineTheme} from "@mantine/core";
import classes from './UserInfoIcons.module.css';
import {useMediaQuery} from "@mantine/hooks";
import {useAuth} from "../../Authentication/Components/AuthContext.tsx";

export const UserInfor = () => {

    const{user} = useAuth()
    const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
    const theme = useMantineTheme();
    return (

        <Card withBorder={!isMobile}
             mx={{base:0,md:10}}
             mt={{base:0,md:6}}
              bg={{base:"",md:"#FFAE58"}}
              c={{base:"",md:"white"}}
        >
            <Group
                justify="space-between"
                p={{base:10, md:7}}
            >
                <Group wrap="nowrap">
                    <div>
                        <Text fz="xs" tt="capitalize" fw={700} c={{base:"dark",md:"white"}}>
                            Hello {user?.name},
                        </Text>
                        <Group wrap="nowrap" gap={10} mt={3}>
                            <Text fz="xs" c={{base:"dimmed",md:theme.colors.gray[3]}}>
                                Your available Balance
                            </Text>
                        </Group>
                    </div>
                </Group>
                <Group wrap="nowrap" gap={10} mt={3}>
                    <Text className={classes.value}>{`$3000`}</Text>
                </Group>

            </Group>
        </Card>


    )
}