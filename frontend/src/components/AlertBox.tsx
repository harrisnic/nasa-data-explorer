import {Alert} from "@chakra-ui/react";

interface Props {
    status: "error" | "info" | "warning" | "success" | "neutral";
    description: string;
    maxW?: string;
}

const AlertBox = ({status, description, maxW="300px;"}: Props) => {
    return (
        <Alert.Root status={status} maxW={maxW}>
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Description textAlign="center">
                    {description}
                </Alert.Description>
            </Alert.Content>
        </Alert.Root>
    )
}

export default AlertBox
