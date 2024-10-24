import {useToggle, upperFirst} from '@mantine/hooks';
import {useForm} from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack, useMantineTheme,
} from '@mantine/core';
import {useNavigate} from "@tanstack/react-router";
import {useEffect, useState} from "react";
import {account, ID} from '../../../lib/appwrite.ts';
import {useAuthenticate, useGenerateOtp, useOtpAuthentication} from "../data-access/authedication.ts";
import {useMantineNotification} from "../../../Components/Notification/useMantineNotification.tsx";
import {useAuth} from "./AuthContext.tsx";

export function AuthenticationForm(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register', 'otp']);
    const navigate = useNavigate()
    const theme = useMantineTheme()
    const [userId, setUserId] = useState("")
    const[email,setEmail]= useState("")
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            otp: '',
            password: '',
            terms: true,
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const otpForm = useForm({
        initialValues: {
            otp: '',
        },
    });


    const useLogin = useAuthenticate()
    const otp = useGenerateOtp()
    const otpLogin = useOtpAuthentication()

    //OTP
    const [otpExpired, setOtpExpired] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setOtpExpired(true);
        }
    }, [timeLeft]);

    // Helper to format the time in mm:ss
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const {login,logout,setUserFC} = useAuth();

    async function handleSubmit(data: any) {
        const {email, password} = data
        if (type === "login") {
            //await account.createEmailPasswordSession(data?.email, data?.password);
            useLogin.mutate(
                {email, password},
                {
                    onSuccess: (response) => {
                        setEmail(response?.email)
                        otp.mutate({email: response?.email}, {
                            onSuccess: async (response) => {
                                useMantineNotification({
                                    title: "Login Success",
                                    message: "Successfully Login, OTP details send to your email.",
                                    type: "success",
                                })

                                setUserId(response)
                                await account.deleteSession('current');
                                toggle('otp')
                            },
                            onError: async (error) => {
                                useMantineNotification({
                                    title: "OTP",
                                    message: "Send OTP error.",
                                    type: "error",
                                })
                            }
                        })
                    },
                    onError: async (error) => {
                        useMantineNotification({
                            title: "Login Error",
                            message: "An Error Occurred Please try Again",
                            type: "error",
                        })
                        console.log(error)
                    }
                })

        }
        if (type === "register") {
            await account.create(ID.unique(), data?.email, data?.password, data?.name);
            await account.createEmailPasswordSession(data?.email, data?.password);
            logout()
            toggle("login")
        }
    }

    function otpSubmit(data: any) {
        otpLogin.mutate({userId, secret: data?.otp}, {
            onSuccess: (response) => {
                useMantineNotification({
                    title: "OTP",
                    message: "OTP OK, Welcome....",
                    type: "success",
                })
                login(response,"")
                setUserFC(response)
                navigate({to: "/home"})
            },
            onError: (error) => {
                toggle('login')
            }
        })
    }

    function resendOtp(){
        otp.mutate({email}, {
            onSuccess: async (response) => {
                setOtpExpired(false);
                setTimeLeft(300)

                useMantineNotification({
                    title: "New OTP",
                    message: "Successfully Generated New OTP, check your email.",
                    type: "success",
                })

                setUserId(response)
                await account.deleteSession('current');
                toggle('otp')
            },
            onError: async (error) => {
                useMantineNotification({
                    title: "New OTP Error",
                    message: "There Was an error generation OTP, Try again",
                    type: "error",
                })
            }
        })
    }
    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            {type === "otp" ? (
                <>
                    <Text size="md" fw={500} style={{
                        maxWidth: "320px"
                    }}>
                        {otpExpired ? "Click on the Resend OTP button to have a One Time Password (OTP) sent to you" : "Enter OTP send to your email address."}
                    </Text>
                    <Divider label="OTP Details" labelPosition="center" my="lg"/>
                    <form onSubmit={otpForm.onSubmit(otpSubmit)}>
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
                                    value={otpForm.values.otp}
                                    onChange={(event) => otpForm.setFieldValue('otp', event.currentTarget.value)}
                                    radius="md"
                                />

                                <Button
                                    w={150}
                                    type="button"
                                    radius="xl"
                                    variant="default"
                                    disabled={!otpExpired}
                                    onClick={() =>{resendOtp()}}
                                >
                                    Resend OTP
                                </Button>
                            </Group>
                        </Stack>

                        <Group justify="space-between" mt="xl">
                            <Button
                                type="submit"
                                radius="xl"
                                loading={otpLogin.isLoading}
                                disabled={(!otpExpired && !otpForm.getDirty().otp) || otpExpired}
                            >
                                Submit
                            </Button>
                        </Group>
                    </form>
                </>
            ) : (
                <>
                    <Text size="lg" fw={500} style={{textAlign:"center"}}>
                        Welcome to Trader, {type}
                    </Text>
                    {/*<Group grow mb="md" mt="md">*/}
                    {/*    <GoogleButton radius="xl">Google</GoogleButton>*/}
                    {/*    <TwitterButton radius="xl">Twitter</TwitterButton>*/}
                    {/*</Group>*/}

                    <Divider label="Enter Login Details" labelPosition="center" my="lg"/>

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack>
                            {type === 'register' && (
                                <TextInput
                                    label="Name"
                                    placeholder="Your name"
                                    value={form.values.name}
                                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                    radius="md"
                                />
                            )}

                            <TextInput
                                required
                                label="Email"
                                placeholder="example@gmail.com"
                                value={form.values.email}
                                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                error={form.errors.email && 'Invalid email'}
                                radius="md"
                            />

                            <PasswordInput
                                required
                                label="Password"
                                placeholder="Your password"
                                value={form.values.password}
                                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                error={form.errors.password && 'Password should include at least 6 characters'}
                                radius="md"
                            />

                            {type === 'register' && (
                                <Checkbox
                                    label="I accept terms and conditions"
                                    checked={form.values.terms}
                                    onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                                />
                            )}
                        </Stack>

                        <Group justify="space-between" mt="xl">
                            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                                {type === 'register'
                                    ? 'Already have an account? Login'
                                    : "Don't have an account? Register"}
                            </Anchor>
                            <Button loading={useLogin.isLoading} type="submit" radius="xl">
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </form>
                </>
            )}

        </Paper>
    );
}