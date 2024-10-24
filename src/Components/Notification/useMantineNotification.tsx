import {notifications} from "@mantine/notifications";
import {IconInfoCircle, IconX, IconCheck} from "@tabler/icons-react";
import {NotificationProps, rem} from "@mantine/core";

type AdditionalProps = Partial<NotificationProps>;

interface INotification extends AdditionalProps{
    type?: "success" | "infor" | "error";
    message: string;
}

export function useMantineNotification(props: INotification) {
    let icon;
    let color;

    // Automatically determine icon and color based on 'type'
    if (props?.type === "success") {
        icon = <IconCheck style={{width: rem(20), height: rem(20)}}/>;
        color = "teal"; // Teal for success
    } else if (props?.type === "infor") {
        icon = <IconInfoCircle style={{width: rem(20), height: rem(20)}}/>;
        color = "blue"; // Blue for information
    } else if (props?.type === "error") {
        icon = <IconX style={{width: rem(20), height: rem(20)}}/>;
        color = "red"; // Red for error
    }

    notifications.show({
       ...props,
        icon: props?.type ? icon : '',
        color: props?.type ? color : '',
    });
}
