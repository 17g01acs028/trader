import {
    Avatar,
    Box,
    Button,
    Center, em,
    FileButton,
    Group,
    rem,
    Stack,
    TextInput,
    TextInputProps,
    Tooltip, useMantineTheme
} from "@mantine/core";
import {z} from "zod"
import {IconEdit, IconGripHorizontal, IconInfoCircle, IconX} from "@tabler/icons-react";
import {useAuth} from "../../Authentication/Components/AuthContext.tsx";
import {useForm} from "@mantine/form";
import {zodResolver} from "mantine-form-zod-resolver";
import {useState} from "react";
import {useMediaQuery} from "@mantine/hooks";
import {TooltipInput} from "../../../Components/Inputs/TextInputs/TooltipInput.tsx";

interface EditUserDetailsModalProps {
    onClose?: () => void;

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
    const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
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
                <Group justify={isMobile ? "center" : "end"} align={"center"}>{isMobile ? (<IconGripHorizontal onClick={props?.onClose} color={theme.colors.gray[6]}/>) : (<IconX onClick={props?.onClose} color={theme.colors.gray[6]}/>)}</Group>
                <Group justify={"center"}>
                    <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
                        {(props) => <Group gap={-30} align={"end"}>


                            <Avatar
                            name = {user?.name} src={imageUrl} size={100} {...props}></Avatar>

                            <Tooltip
                                label={"Change user Profile Photo"}
                                position="top-end"
                                withArrow
                                transitionProps={{transition: 'pop-bottom-right'}}
                            ><IconEdit {...props}/>
                            </Tooltip>
                        </Group>}
                    </FileButton>
                </Group>
                <TooltipInput styles={{
                    input: {borderColor: theme.colors.yellow[5]}
                }} placeholder={"Enter first name"} {...form.getInputProps('firstName')}
                              key={form.key('firstName')} labelTooltip="Edit Your first name"/>
                <TooltipInput styles={{
                    input: {borderColor: theme.colors.yellow[5]}
                }}  {...form.getInputProps('middleName')}
                              key={form.key('middleName')} placeholder={"Enter last name"}
                              labelTooltip="Edit Your Second Name"/>
                <TooltipInput styles={{
                    input: {borderColor: theme.colors.yellow[5]}
                }} {...form.getInputProps('surnameName')}
                              key={form.key('surnameName')} placeholder={"Enter surname"}
                              labelTooltip="Edit Your Surname"/>

                <Button variant={"outline"} type={"submit"} color={theme.colors.yellow[5]}>Save Changes</Button>
            </Stack>
        </form>
    )
}





