import {Box, Flex, HStack, Stack, Text, Icon, Badge} from "@chakra-ui/react";
import {LuCalendarDays, LuOrbit, LuFocus, LuBot, LuBattery, LuBatteryFull} from "react-icons/lu";
import type {Photo} from "@/types";
import PhotoImage from "@/components/PhotoImage.tsx";

interface Props {
    photo: Photo;
}

const PhotoCard = ({photo}: Props) => {
    return (
        <Box>
            <PhotoImage src={photo.img_src} alt={photo.camera.full_name} />

            <Box p="2" spaceY="2">
                <Flex gap="4" justify="space-between">
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

            <Box p="2" spaceY="2">
                <Stack gap={0}>
                    <HStack gap={1}>
                        <Icon color="pink.400">
                            <LuFocus />
                        </Icon>
                        <Text textStyle="xs">Camera:</Text>
                    </HStack>
                    <Text textStyle="sm">{photo.camera.full_name}</Text>
                </Stack>
            </Box>

            <Box p="4" spaceY="2" bg="gray.100">
                <Flex gap="4" justify="space-between">
                    <Stack gap={0}>
                        <HStack gap={1}>
                            <Icon color="pink.400">
                                <LuBot />
                            </Icon>
                            <Text textStyle="xs">Rover:</Text>
                        </HStack>
                        <Text textStyle="sm">{photo.rover.name}</Text>
                    </Stack>

                    <Stack gap={0}>
                        <Badge variant="solid" colorPalette={photo.rover.status === "active" ? "green" : "pink"} size="md">
                            {photo.rover.status === "active" ? <Icon color="green.400" size="md"><LuBatteryFull /></Icon> : <Icon color="pink.400" size="md"><LuBattery /></Icon>}
                            {photo.rover.status}
                        </Badge>
                    </Stack>
                </Flex>
            </Box>

        </Box>
    )
}

export default PhotoCard
