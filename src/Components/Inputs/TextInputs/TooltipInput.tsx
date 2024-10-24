import {Box, Center, rem, TextInput, TextInputProps, Tooltip} from "@mantine/core";
import {IconInfoCircle} from "@tabler/icons-react";
interface TooltipInputProps extends TextInputProps {
    labelTooltip: string;
}
export function TooltipInput(props: TooltipInputProps) {
    const rightSection = (
        <Tooltip
            label={props?.labelTooltip}
            position="top-end"
            withArrow
            transitionProps={{transition: 'pop-bottom-right'}}
        >
            <Box component="div" c="dimmed" style={{cursor: 'help'}}>
                <Center>
                    <IconInfoCircle style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                </Center>
            </Box>
        </Tooltip>
    );

    return (
        <TextInput
            rightSection={rightSection}
            {...props}
        />
    );
}