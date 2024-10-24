import {
    Box,
    Button,
    Divider,
    Group,
    Paper,
    PaperProps,
    Stack,
    Text,
    TextInput, useMantineTheme
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useEffect, useState} from "react";
import {useMantineNotification} from "../../../Components/Notification/useMantineNotification.tsx";
import {useNavigate} from "@tanstack/react-router";


export function OTPForm(props: PaperProps) {
    const form = useForm({
        initialValues: {
            otp: '',
        },
        validate: {
            otp: (val) => (val.length === 6 ? null : 'Invalid email'),
        },
    });

    const theme = useMantineTheme();
    const [otpExpired, setOtpExpired] = useState(false);
    const [timeLeft, setTimeLeft] = useState(50);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer); // Cleanup on component unmount
        } else {
            setOtpExpired(true); // Set OTP as expired when time runs out
        }
    }, [timeLeft]);

    // Helper to format the time in mm:ss
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const navigate = useNavigate()

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="md" fw={500} style={{
                maxWidth: "320px"
            }}>
                {otpExpired ? "Click on the Resend OTP button to have a One Time Password (OTP) sent to you" : "Enter OTP send to your email address."}
            </Text>
            <Divider label="OTP Details" labelPosition="center" my="lg"/>
            <form onSubmit={form.onSubmit(() => {
                useMantineNotification({
                    title: "OTP Details",
                    message: "Successfully sent OTP details.",
                    type: "success",
                })

                navigate({to:"/home"})
            })}>
                <Stack
                    gap={0}
                >
                    <Stack
                        gap={0}
                    >
                        <Text fz={14}>OTP (One Time Password)</Text>

                        {!otpExpired && (
                            <Text
                                fz={12}
                                style={{
                                    color: theme.colors.gray[5]
                                }}
                            > {`You can request for another OTP in ${formatTime(timeLeft)}`}</Text>
                        )}
                    </Stack>
                    <Group
                        justify="center"
                        align="center"
                        wrap={"nowrap"}
                    >

                        <TextInput
                            placeholder=""
                            value={form.values.otp}
                            onChange={(event) => form.setFieldValue('otp', event.currentTarget.value)}
                            radius="md"
                        />

                        <Button
                            w={150}
                            type="button"
                            radius="xl"
                            variant="default"
                            disabled={!otpExpired}
                            onClick={() => {
                                setOtpExpired(false);
                                setTimeLeft(50)
                            }}
                        >
                            Resend OTP
                        </Button>
                    </Group>
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Button
                        type="submit"
                        radius="xl"
                        disabled={(!otpExpired && !form.getDirty().otp) || otpExpired}
                    >
                        Submit
                    </Button>
                </Group>
            </form>
        </Paper>

    )
}