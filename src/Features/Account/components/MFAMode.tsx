import {useState} from 'react';
import {QRCodeSVG} from 'qrcode.react';
import {
    ActionIcon,
    Card,
    CopyButton,
    Group,
    rem,
    Stack,
    Text,
    Tooltip, useMantineTheme
} from "@mantine/core";
import {
    IconCheck,
    IconCopy,
    IconKeyboard
} from "@tabler/icons-react";


const MFASetup = () => {
    const [secret, setSecret] = useState(`QDWSM3OYBPGTEVSPB5FKVDM3CSNCWHVK`);
    const [qrCodeUrl, setQrCodeUrl] = useState(`otpauth://totp/wallet:stevemutioo123@gmail.com?secret=${secret}&issuer=wallet`);
    const theme = useMantineTheme()

    function setter() {
        setSecret(`QDWSM3OYBPGTEVSPB5FKVDM3CSNCWHVK`)
        setQrCodeUrl(`otpauth://totp/wallet:stevemutioo123@gmail.com?secret=${secret}&issuer=wallet`)
    }

    setter()

    return (
        <Stack p={10} gap={5}>
            <h1>Set up MFA</h1>
            {secret && (
                <Stack align={"center"}>
                    <p>Scan this QR code in Google Authenticator:</p>
                    <QRCodeSVG
                        value={qrCodeUrl}
                        title={"Title for my QR Code"}
                        size={128}
                        bgColor={"#ffffff"}
                        fgColor={"#151514"}
                        level={"L"}
                        minVersion={6}
                        imageSettings={{
                            src: "https://static.zpao.com/favicon.png",
                            x: undefined,
                            y: undefined,
                            height: 24,
                            width: 24,
                            opacity: 1,
                            excavate: true,
                        }}
                    />
                    <p>Or manually enter this secret</p>
                    <Card>
                        <Card.Section>

                        </Card.Section>
                        <Card.Section>
                            Steps:
                            <Stack gap={5}>

                                <Group gap={5} align={"center"}>
                                    Press : <Card withBorder p={5} radius={"md"}> <Text>Enter a setup key </Text></Card><Card
                                    bg={theme.colors.blue[6]} p={5} radius={"md"}><IconKeyboard color={"white"}/></Card>
                                </Group>
                                <Group gap={5} align={"center"}>
                                    Enter : <Card withBorder p={5} radius={"md"}> <Text>Code name(Enter name eg:
                                    Wallet)</Text></Card>
                                </Group>
                                <Group gap={5} align={"center"}>
                                    Enter : <Card withBorder p={5} radius={"md"}> <Text>Your key(copy the key
                                    below)</Text></Card>
                                </Group>
                                <Group gap={5} align={"center"}>
                                    Select : <Card withBorder p={5} radius={"md"}> <Text>Time base</Text></Card>
                                </Group>
                                <Card withBorder radius={"md"} mb={{base: 20, md: 0}}>
                                    <Group gap={5}>
                                        <Text>Key: </Text>
                                        <Text fz={12}>{secret}</Text>
                                        <CopyButton value={secret} timeout={2000}>
                                            {({copied, copy}) => (
                                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle"
                                                                onClick={copy}>
                                                        {copied ? (
                                                            <IconCheck style={{width: rem(16)}}/>
                                                        ) : (
                                                            <IconCopy style={{width: rem(16)}}/>
                                                        )}
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
                                        </CopyButton>
                                    </Group>
                                </Card>

                            </Stack>
                        </Card.Section>
                    </Card>
                </Stack>
            )}
        </Stack>
    );
};

export default MFASetup;
