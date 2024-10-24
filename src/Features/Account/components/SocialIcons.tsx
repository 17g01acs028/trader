import classes from './SocialIcons.module.css';
import {Box, Group, Paper} from "@mantine/core";

interface Props {
    data: stat[],
    onClick: (link: string) => void,
}

interface stat {
    link: string,
    icon: any
    description: string,
}

export function SocialIcon(props: Props) {
    const stats = props?.data.map((stat,index) => (
        <div key={stat.link} onClick={() => props?.onClick(stat?.link)} className={classes.stat}>
            <Group
                style={{
                    width: "100%",
                }}
                align={"center"}
                justify={"center"}
                className={`${index> 0 ? classes.iconB : ""}`}
            >
                <Box className={classes.icon}>{stat.icon}</Box>
            </Group>
            <label>{stat.description}</label>
        </div>
    ));
    return <div className={classes.root}>{stats}</div>;
}