import AlertBox from "@/components/AlertBox.tsx";
import {Image, VStack} from "@chakra-ui/react";
import ErrorUfo from "@/assets/error-ufo.png";

interface Props {
    description: string;
    alertBoxMaxW?: string;
}

const Error = ({description, alertBoxMaxW="300px;"}: Props) => {
    return (
        <VStack>
            <Image mb="4" h="160px" src={ErrorUfo} alt="error" />
            <AlertBox status="error" description={description} maxW={alertBoxMaxW} />
        </VStack>
    )
}

export default Error
