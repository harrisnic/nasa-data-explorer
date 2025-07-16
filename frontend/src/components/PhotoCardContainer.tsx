import {Box} from "@chakra-ui/react";
import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

const PhotoCardContainer = ({children}: Props) => {
    return (
        <Box
            margin={2}
            overflow="hidden"
            borderWidth="1px"
            borderRadius="md"
            shadow="sm"
            _hover={{
                shadow: "md",
                transform: "scale(1.025)",
                transition: "transform .15s ease-in"
            }}
        >
            {children}
        </Box>
    )
}

export default PhotoCardContainer
