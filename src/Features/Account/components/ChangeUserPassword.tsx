import {
    Avatar,
    Box,
    Button,
    Center, em,
    FileButton,
    Group, PasswordInput,
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
import {PasswordStrength} from "../../../Components/Inputs/PasswordInput/PasswordStrength.tsx";
import {ConfirmPasswordInput} from "../../../Components/Inputs/PasswordInput/ConfirmPassword.tsx";

interface CahngeUserPasswordModalProps {
    onClose?: () => void;

}

const ChangeUserPassword = z.object({
    previousPassword: z.string().min(2, {message: 'Old Password Required'}),
    confirmPassword: z.string().min(2, {message: 'New password Required'}),
    newPassword: z.string().min(2, {message: 'Confirm password Required'}),
});

export function ChangeUserPasswordModal(props: CahngeUserPasswordModalProps) {
    const theme = useMantineTheme()
    const [strength, setStrength] = useState<number>(0);
    const [match, setMatch] = useState(false)
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            previousPassword: "",
            confirmPassword: "",
            newPassword: "",
        },
        validate: zodResolver(ChangeUserPassword)
    });
    const isMobile = useMediaQuery(`(max-width: ${em(500)})`);

    function handleSubmit(data: any) {
        const formData = new FormData()
        formData.append('request_body', JSON.stringify(data));
        // formData.append('file', avatarFile);
        if (strength < 100) {
            form.setFieldError("newPassword", "Password does not meat all requirements")
        }

        if (!match) {
            form.setFieldError("confirmPassword", "Password do not match")
        }

    }


    function handleInValidSubmit(error: any) {
        console.log("Error is :", JSON.stringify(error))
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit, handleInValidSubmit)}>
            <Stack>
                <Group justify={isMobile ? "center" : "end"} align={"center"}>{isMobile ? (
                    <IconGripHorizontal onClick={props?.onClose} color={theme.colors.gray[6]}/>) : (
                    <IconX onClick={props?.onClose} color={theme.colors.gray[6]}/>)}
                </Group>
                <PasswordInput
                    styles={{
                        input: {borderColor: theme.colors.yellow[5]}
                    }}
                    placeholder={"Enter Previous Password"}
                    {...form.getInputProps('previousPassword')}
                    key={form.key('previousPassword')}
                />
                <PasswordStrength
                    onStrengthChange={(v) => setStrength(v)}
                    styles={{
                        input: {borderColor: theme.colors.yellow[5]}
                    }}
                    {...form.getInputProps('newPassword')}
                    key={form.key('newPassword')}
                    placeholder={"Enter New password"}
                />
                <ConfirmPasswordInput
                    setIsMatching={(v) => setMatch(v)}
                    passwordValue={form.getValues().newPassword}
                    styles={{
                        input: {borderColor: theme.colors.yellow[5]}
                    }}
                    {...form.getInputProps('confirmPassword')}
                    key={form.key('confirmPassword')}
                    placeholder={"Confirm password"}
                />

                <Button variant={"outline"} type={"submit"} color={theme.colors.yellow[5]}>Save Changes</Button>
            </Stack>
        </form>
    )
}





