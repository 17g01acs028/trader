import {Group, Image} from "@mantine/core";
import logo from "./assets/logo.png";
import {Profile} from "./Profile.tsx";

export function Header() {
    return(
        <Group
            style={{
                width: "100%",
            }}
            justify="space-between"
        >
            <Image
                src={logo}
                h={{base: 50, md: 60, lg: 60}}
                w="auto"
                fit="contain"
            />
            <Profile/>
        </Group>
    )
}