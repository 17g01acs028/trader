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
import {z} from "zod"
import {IconEdit, IconInfoCircle} from "@tabler/icons-react";
import {useAuth} from "../../Authentication/Components/AuthContext.tsx";
import {useForm} from "@mantine/form";
import {zodResolver} from "mantine-form-zod-resolver";
import {useState} from "react";

interface EditUserDetailsModalProps {
    onClose?: () => void;
    onSubmit?: () => void;

}

const EditUserDatailsSchema = z.object({
    firstName: z.string().min(2, {message: 'First Name should have at least 2 letters'}),
    avatar:z.any().optional().nullable(),
    middleName: z.string().min(2, {message: 'Middle Name should have at least 2 letters'}),
    surnameName: z.string().optional(),
});

export function EditUserDetailsModal(props: EditUserDetailsModalProps) {
    const theme = useMantineTheme()
    const {user} = useAuth()
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [avatarFile,setAvatarFile] = useState<File | null>(null)
    const handleFileChange = (file: File | null) => {
        if (file) {
            setAvatarFile(file)
            form.setValues("avatar", file)
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            firstName: user?.name?.split(" ")[0],
            middleName: user?.name?.split(" ")[1],
            surnameName: user?.name?.split(" ")[2],
            avatar: user?.avatar || null,
        },
        validate: zodResolver(EditUserDatailsSchema)
    });

    function handleSubmit(data: any) {
        const formData = new FormData()
        formData.append('request_body', JSON.stringify(data));
        formData.append('file', avatarFile);
        console.log("data is :", formData)
    }

    function handleInValidSubmit(error: any) {
        console.log("Error is :", JSON.stringify(error))
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit, handleInValidSubmit)}>
            <Stack>
                <Group justify={"center"}>
                    <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
                        {(props) => <Group gap={-30} align={"baseline"}><Avatar
                            name = {user?.name} src={imageUrl} size={100} {...props}></Avatar>
                            <IconEdit {...props}/></Group>}
                    </FileButton>
                </Group>
                <TooltipInput styles={{
                    input: {borderColor: theme.colors.yellow[5]}
                }} placeholder={"Enter first name"} {...form.getInputProps('firstName')}
                              key={form.key('firstName')} labelTooltip="Edit User Details"/>
                <TooltipInput styles={{
                    input: {borderColor: theme.colors.yellow[5]}
                }}  {...form.getInputProps('middleName')}
                              key={form.key('middleName')} placeholder={"Enter last name"}
                              labelTooltip="Edit User Details"/>
                <TooltipInput styles={{
                    input: {borderColor: theme.colors.yellow[5]}
                }} {...form.getInputProps('surnameName')}
                              key={form.key('surnameName')} placeholder={"Enter surname"}
                              labelTooltip="Edit User Details"/>

                <Button variant={"outline"} type={"submit"} color={theme.colors.yellow[5]}>Save Changes</Button>
            </Stack>
        </form>
    )
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