import {Box, Center, PasswordInput, PasswordInputProps, rem} from "@mantine/core";
import {IconCircleCheck, IconX} from "@tabler/icons-react";
import {useEffect, useState} from "react";


interface ConfirmPasswordInputProps extends PasswordInputProps {
    form: any
    value: string
    passwordKey: string
}

export function ConfirmPasswordInput(props: ConfirmPasswordInputProps) {

    const [match, setMatch] = useState(false);

    const rightSection = (
        <Box component="div" c="dimmed" style={{cursor: 'help'}}>
            <Center>
                {match ? (<IconX style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                ) : (<IconCircleCheck style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                )}
            </Center>
        </Box>
    );

    const key = props?.passwordKey;
    useEffect(() => {
        console.log("Password Key value",props?.form?.getValue(key) )
        if (props?.form?.getValues(props?.passwordKey) === props?.value) {
            setMatch(true);
        } else {
            setMatch(true);
        }
    }, [ props?.form]);

    return <PasswordInput {...props} rightSection={rightSection}/>
}