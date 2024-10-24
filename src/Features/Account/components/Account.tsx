import {
    ActionIcon,
    Avatar, Button,
    Card,
    CopyButton,
    Group, Modal,
    NavLink, rem,
    Stack,
    Text,
    Tooltip,
    useMantineTheme
} from "@mantine/core";
import {useNavigate} from "@tanstack/react-router";
import {
    IconBrandTelegram, IconCheck,
    IconChevronRight, IconCopy,
    IconEdit, IconId,
    IconMail,
    IconMessageChatbot,
    IconUser
} from "@tabler/icons-react";
import {SocialIcon} from "./SocialIcons.tsx";
import classes from "./Account.module.css"
import {useAuth} from "../../Authentication/Components/AuthContext.tsx";
import {EditUserDetailsModal} from "./EditUserDetailsModal.tsx";

export function Account() {
    const theme = useMantineTheme()
    const navigate = useNavigate()
    const{user,logout} = useAuth()
    const data=   [
        {
            icon: <IconMessageChatbot size={20} />,
            link:"https://google.com",
            description:"Customer Care"
        },
        {
            icon: <IconBrandTelegram size={20} />,
            link:"https://telegram.com",
            description: "Telegram Group"
        },
    ];
    return (
        <Stack align={"center"}>
            <Stack p={10} className={classes.root} align={"stretch"} >
                <Card withBorder radius={"md"} bg={theme.colors.yellow[5]} style={{maxWidth: '500px'}}>
                    <Group>
                        <Avatar size={100}></Avatar>
                        <Stack>
                            <div style={{color:"white"}}>
                                <Text fz="md" tt={"capitalize"} fw={700} c={{base: "white", md: "white"}}>
                                    {user?.name}
                                </Text>
                                <Group wrap="nowrap" mt={3} gap={2}>
                                    <Text fz="md" c={{base: theme.colors.gray[3], md: theme.colors.gray[3]}}>
                                        Edit your profile
                                    </Text>
                                    <IconEdit size={12} />
                                </Group>

                                <Modal opened={true} onClose={()=>{}}>
                                    <EditUserDetailsModal/>
                                </Modal>
                            </div>
                        </Stack>
                    </Group>
                </Card>
                <Card withBorder radius={"md"} style={{maxWidth: '500px'}}>
                    <NavLink
                        label="Name"
                        leftSection={<IconUser size="1rem" stroke={1.5}/>}
                        rightSection={<Group><label>{user?.name}</label><IconChevronRight/></Group>}
                    />
                    <NavLink
                        label="Email"
                        leftSection={<IconMail size="1rem" stroke={1.5}/>}
                        rightSection={<Group><label>{user?.email}</label></Group>}
                    />
                    <NavLink
                        label="UID"
                        leftSection={<IconId size="1rem" stroke={1.5}/>}
                        rightSection={<Group gap={0}>
                            <label>{user?.$id}</label>
                            <CopyButton value={user?.$id} timeout={2000}>
                                {({ copied, copy }) => (
                                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                            {copied ? (
                                                <IconCheck style={{ width: rem(16) }} />
                                            ) : (
                                                <IconCopy style={{ width: rem(16) }} />
                                            )}
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Group>}
                    />
                    <NavLink
                        label="Withdraw Address"
                        leftSection={<IconUser size="1rem" stroke={1.5}/>}
                        rightSection={<Group><IconChevronRight/></Group>}
                    />
                </Card>
                <Card mt={50} style={{maxWidth: '500px'}}>
                    <SocialIcon data={data} onClick={(link)=>navigate({to:link})}/>
                </Card>
                <Button variant={"outline"} color={"yellow"} radius={"md"}  style={{
                    maxWidth:"500px"
                }} onClick={logout}>Logout</Button>
                <Text mb={30} style={{color:theme.colors.gray[5],width:"100%",textAlign:"center",textTransform:"lowercase"}} fz={"xm"}>Trade@2024 - V1.0</Text>
            </Stack>
        </Stack>
    )
}