import {Box, Progress, PasswordInput, Group, Text, Center, PasswordInputProps} from '@mantine/core';
import {IconCheck, IconX} from '@tabler/icons-react';
import {useEffect} from "react";

function PasswordRequirement({meets, label}: { meets: boolean; label: string }) {
    return (
        <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
            <Center inline>
                {meets ? <IconCheck size="0.9rem" stroke={1.5}/> : <IconX size="0.9rem" stroke={1.5}/>}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    );
}

const requirements = [
    {re: /[0-9]/, label: 'Includes number'},
    {re: /[a-z]/, label: 'Includes lowercase letter'},
    {re: /[A-Z]/, label: 'Includes uppercase letter'},
    {re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol'},
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

interface PasswordStrengthProps extends PasswordInputProps {
    value: string
    form: any
}

export function PasswordStrength(props: PasswordStrengthProps) {
    const strength = getStrength(props?.value);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(props?.value)}/>
    ));
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{section: {transitionDuration: '0ms'}}}
                value={
                    props?.value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                }
                color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
                key={index}
                size={4}
            />
        ));

    useEffect(() => {
        if (strength < 100 || props?.value?.length < 8) {
            props?.form?.setFieldError('newPassword','Password is too weak');
        } else {
            props?.form?.clearFieldError('newPassword');
        }
    }, [strength, props?.form]);

    return (
        <div>
            <PasswordInput {...props} />

            <Group gap={5} grow mt="xs" mb="md">
                {bars}
            </Group>

            <PasswordRequirement label="Has at least 8 characters" meets={props?.value.length >= 8}/>
            {checks}
        </div>
    );
}