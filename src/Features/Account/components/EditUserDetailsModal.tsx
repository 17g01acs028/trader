import {
    Avatar,
    Box,
    Button,
    Center,
    FileButton,
    Group,
    rem,
    Stack,
    TextInput,
    TextInputProps,
    Tooltip, useMantineTheme
} from "@mantine/core";
import {IconInfoCircle} from "@tabler/icons-react";
import {useAuth} from "../../Authentication/Components/AuthContext.tsx";

interface EditUserDetailsModalProps {
    onClose?: () => void;
    onSubmit?: () => void;

}


export function EditUserDetailsModal(props: EditUserDetailsModalProps) {
    const theme = useMantineTheme()
    const user = useAuth()
    console.log(user, props)
    return (
        <Stack>
            <Group justify={"center"}>

                <FileButton onChange={() => {
                }} accept="image/png,image/jpeg">
                    {(props) => <Avatar size={100} {...props}></Avatar>}
                </FileButton>
            </Group>
            <TooltipInput styles={{
                input: {borderColor: theme.colors.yellow[5]}
            }} placeholder={"Enter first name"} labelTooltip="Edit User Details"/>
            <TooltipInput styles={{
                input: {borderColor: theme.colors.yellow[5]}
            }} placeholder={"Enter last name"} labelTooltip="Edit User Details"/>
            <TooltipInput styles={{
                input: {borderColor: theme.colors.yellow[5]}
            }} placeholder={"Enter surname"} labelTooltip="Edit User Details"/>

            <Button variant={"outline"} color={theme.colors.yellow[5]}>Save Changes</Button>
        </Stack>)
}

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
            zIndex={99999}
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