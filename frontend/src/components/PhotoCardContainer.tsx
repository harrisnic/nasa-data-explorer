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
            _hover={{shadow: "md"}}
        >
            {children}
        </Box>
    )
}

export default PhotoCardContainer
