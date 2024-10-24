import {Menu, Group, Text, Avatar, useMantineTheme, rem} from '@mantine/core';
import {
    IconLogout,
    IconSettings,
    IconTrash,
    IconChevronRight, IconBell,
} from '@tabler/icons-react';
import {useNavigate} from "@tanstack/react-router";
import {useAuth} from "../../Authentication/Components/AuthContext.tsx";
export function Profile() {
    const theme = useMantineTheme();
    const navigate = useNavigate()
    const{user,logout} = useAuth();

    return (
        <Group justify="center">
            <Menu
                withArrow
                width={300}
                position="bottom"
                transitionProps={{ transition: 'pop' }}
                withinPortal
            >
                <Menu.Target>
                    <Avatar
                        radius="xl"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
                    />

                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        rightSection={
                            <IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        }
                    >
                        <Group>
                            <Avatar
                                radius="xl"
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
                            />

                            <div>
                                <Text fw={500}>{user?.name}</Text>
                                <Text size="xs" c="dimmed">
                                    {user?.email}
                                </Text>
                            </div>
                        </Group>
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Item
                        leftSection={
                            <IconBell
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                                color={theme.colors.blue[6]}
                            />
                        }
                        rightSection={
                            <Text size="xs" c="dimmed">
                                0
                            </Text>
                        }
                    >
                      Notifications
                    </Menu.Item>

                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item
                        leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    >
                        Account settings
                    </Menu.Item>
                    <Menu.Item
                        leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        onClick={()=>{
                            logout()
                            navigate({to: "/auth"})
                        }}
                    >
                        Logout
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                        color="red"
                        leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    >
                        Delete account
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}