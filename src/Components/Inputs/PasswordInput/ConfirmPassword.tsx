import {Box, Center, PasswordInput, PasswordInputProps, rem} from "@mantine/core";
import {IconCircleCheck, IconX} from "@tabler/icons-react";
import {useEffect, useState} from "react";


interface ConfirmPasswordInputProps extends PasswordInputProps {
    value?: string
    passwordValue: string
    setIsMatching: (match: boolean) => void
}

export function ConfirmPasswordInput({value, passwordValue, setIsMatching, ...props}: ConfirmPasswordInputProps) {

    const [match, setMatch] = useState(false);

    useEffect(() => {
        setIsMatching(match)
    }, [setIsMatching,match]);

    const leftSection = (
        <Box component="div" c="dimmed" style={{cursor: 'help'}}>
            <Center>
                {!match ? (<IconX style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                ) : (<IconCircleCheck style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                )}
            </Center>
        </Box>
    );

    useEffect(() => {
        if (passwordValue === value) {
            setMatch(true);
        } else {
            setMatch(false);
        }
    }, [passwordValue,value]);

    return <PasswordInput {...props} leftSection={leftSection}/>
}