import {
    IconCalendarStats, IconChartArrowsVertical, IconClipboardList,
    IconDeviceDesktopAnalytics, IconDeviceWatchStats, IconFile,
    IconFingerprint,
    IconGauge,
    IconHome2, IconLogout, IconMenuOrder, IconPointerDollar, IconSettings, IconSwitchHorizontal,
    IconUser
} from "@tabler/icons-react";
import {Center, em, Group, rem, Stack, Tooltip, UnstyledButton} from "@mantine/core";

import classes from "./NavBarMinimal.module.css"
import {useState} from "react";
import {useMediaQuery} from "@mantine/hooks";
import {isFixed} from "@mantine/hooks/lib/use-headroom/use-headroom";
import {useNavigate} from "@tanstack/react-router";
import {Logout} from "../../Authentication/data-access/authedication.ts";
import {useMantineNotification} from "../../../Components/Notification/useMantineNotification.tsx";

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    main?: boolean

    onClick?(): void;
}

function NavbarLink({icon: Icon, main, label, active, onClick}: NavbarLinkProps) {

    const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
    return (

        <Tooltip
            label={label} position="right" transitionProps={{duration: 0}}>
            {isMobile ? (
                <UnstyledButton
                    style={{
                        backgroundColor: main && '#fff',
                        boxShadow: main && '0 4px 10px rgba(0, 0, 0, 0.1)', // Slight shadow for main item
                        borderRadius: main && '50%',
                        width: main && "60px",
                        height:main && "60px",
                        fontSize: main && '11px',
                        transform: main && 'translateY(-30px)',
                        zIndex: 1000,
                        display:"flex",
                        flexDirection:"column"
                    }}
                    onClick={onClick} className={`${classes.link}`} data-active={active || undefined}>
                    <Icon style={{width: rem(20), height: rem(20)}} stroke={1.5}/>
                    <span className={classes.navtext}>{label}</span>
                </UnstyledButton>
            ) : (
                <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                    <Icon style={{width: rem(20), height: rem(20)}} stroke={1.5}/>
                </UnstyledButton>
            )}

        </Tooltip>
    );
}

const mockdata = [
    {icon: IconHome2, label: 'Home',link:"/home"},
    {icon: IconClipboardList, label: 'Orders',link:"/orders"},
    {icon: IconPointerDollar, label: 'Trade', main: true,link:"/trade"},
    {icon: IconChartArrowsVertical, label: 'Statistics',link:"/statistics"},
    {icon: IconUser, label: 'Account', link:"/account"},
];

export function NavbarMinimal() {
    const [active, setActive] = useState(2);
    const navigate = useNavigate()
    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => {
                navigate({
                    to:link.link
                })
                setActive(index)}
        }
        />
    ));

    const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
    return (
        <nav
            className={`${classes.navbar} ${isMobile ? classes.mobileNav : ''}`}
            style={{
                width:"100%",
                maxWidth:"100%",

            }}
        >
            {
                isMobile ? "" : (
                    <Center>
                        {/*<MantineLogo type="mark" size={30} />*/}
                        Logo
                    </Center>
                )
            }
            {isMobile ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width:"100%",
                    }}
                >
                    <Group
                        justify="space-between"
                        align="center"
                        style={{
                            maxWidth: "400px",
                            flexWrap: "nowrap",
                        }}
                        gap={20}>
                        {links}
                    </Group>
                </div>

            ) : (
                <div className={classes.navbarMain}>
                    <Stack
                        justify="center"
                        gap={0}>
                        {links}
                    </Stack>
                </div>
            )}


            {
                isMobile ? "" : (
                    <Stack justify="center" gap={0}>
                        <NavbarLink  icon={IconLogout} onClick={()=>{
                            const  logout = Logout()
                            if(logout.isSuccess){
                                navigate({to:"/login"})
                            }
                            if(logout.isError){
                                useMantineNotification({type:"error",message:"Error Occurred Please Try again"})
                            }

                        }} label="Logout"/>
                    </Stack>
                )
            }
        </nav>
    );
}