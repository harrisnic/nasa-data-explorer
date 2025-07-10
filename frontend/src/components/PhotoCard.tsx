import type {Photo} from "@/hooks/usePhotos.ts";
import {Box, Heading, HStack, Text, Image} from "@chakra-ui/react";

interface Props {
    photo: Photo;
}

const PhotoCard = ({photo}: Props) => {
    return (
        <Box>
            <Image src={photo.img_src} alt={photo.id} />
            <HStack>
                <Text fontSize="1xl">{photo.id}-{photo.sol}</Text>
            </HStack>
        </Box>
    )
}

export default PhotoCard
