import {Box} from "@chakra-ui/react";
import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

const PhotoCardContainer = ({children}: Props) => {
    return (
        <Box
            overflow="hidden"
            borderWidth="1px"
            borderRadius="md"
            shadow="md"
            _hover={{shadow: "lg"}}
        >
            {children}
        </Box>
    )
}

export default PhotoCardContainer
