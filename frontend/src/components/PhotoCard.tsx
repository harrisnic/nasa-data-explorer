import {Box, Flex, HStack, Stack, Text, Icon} from "@chakra-ui/react";
import {LuCalendarDays, LuOrbit, LuAperture} from "react-icons/lu";
import type {Photo} from "@/types";
import PhotoImage from "@/components/PhotoImage.tsx";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";

interface Props {
    photo: Photo;
}

const PhotoCard = ({photo}: Props) => {
    const { nasaCtxData: {selectedRover, selectedDate}} = useContext(NasaCtx);
    const createSearchParams = () => {
        const params = new URLSearchParams();
        if (selectedRover?.name) {
            params.set('selectedRover', selectedRover.name);
        }
        if (selectedDate) {
            params.set('selectedDate', selectedDate.toLocaleDateString('en-CA'));
        }
        return params.toString();
    };

    return (
        <Box>
            <Box height="220px" overflow="hidden">
                <PhotoImage src={photo.img_src} alt={photo.camera.full_name} />
            </Box>

            <Box p="2">
                <Flex justify="space-between">
                    <Stack gap={0}>
                        <HStack gap={1}>
                            <Icon color="pink.400">
                                <LuCalendarDays />
                            </Icon>
                            <Text textStyle="xs">Earth date:</Text>
                        </HStack>
                        <Text textStyle="sm">{photo.earth_date}</Text>
                    </Stack>

                    <Stack gap={0}>
                        <HStack gap={1}>
                            <Icon color="pink.400">
                                <LuOrbit />
                            </Icon>
                            <Text textStyle="xs">SOL:</Text>
                        </HStack>
                        <Text textStyle="sm">{photo.sol}</Text>
                    </Stack>
                </Flex>
            </Box>

            <Box p="2">
                <HStack>
                    <Icon color="pink.400">
                        <LuAperture />
                    </Icon>
                    <Text color="pink.400">

                        <Link to={{
                            pathname: `/photos/${photo.id}`,
                            search: createSearchParams()
                        }}>Photo details</Link>
                    </Text>
                </HStack>
            </Box>
        </Box>
    )
}

export default PhotoCard
