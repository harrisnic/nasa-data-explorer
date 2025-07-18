import {useParams} from "react-router-dom";
import {useContext} from "react";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import type {Photo} from "@/types";
import PhotoImage from "@/components/PhotoImage.tsx";
import {Badge, Box, Flex, Grid, GridItem, HStack, Icon, Stack, Text} from "@chakra-ui/react";
import {LuBattery, LuBatteryFull, LuBot, LuCalendarDays, LuFocus, LuLandPlot, LuOrbit, LuRocket} from "react-icons/lu";
import BackButton from "@/components/BackButton.tsx";

const PhotoDetailPage = () => {
    const {id} = useParams();
    const {nasaCtxData: {photos}} = useContext(NasaCtx);

    // Find the photo by ID (convert string ID to number for comparison)
    const photo: Photo = photos?.find(photo => photo.id === Number(id));

    if (!photo) {
        return <div>Photo not found</div>;
    }

    console.log(photo);

    return (
        <Grid
            templateAreas={{
                base: `"buttons" "photo" "details"`,
                lg: `"buttons buttons" "photo details"`
            }}
            templateColumns={{
                base: "1fr",
                lg: "1fr 1fr"
            }}
        >
            <GridItem area="buttons" p="3">
                <BackButton />
            </GridItem>

            <GridItem area="photo" p="3">
                <Box borderRadius="lg" overflow="hidden">
                    <PhotoImage src={photo.img_src} alt={photo.camera.full_name} />
                </Box>
            </GridItem>

            <GridItem area="details" p="3">
                <Box p="4" bg="gray.100" _dark={{ bg: "gray.800" }}>
                    <Flex mb="4" justify="space-between">
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

                    <Stack mb={4} gap={0}>
                        <HStack gap={1}>
                            <Icon color="pink.400">
                                <LuRocket />
                            </Icon>
                            <Text textStyle="xs">Launch Date:</Text>
                        </HStack>
                        <Text textStyle="sm">{photo.rover.launch_date}</Text>
                    </Stack>

                    <Stack gap={0}>
                        <HStack gap={1}>
                            <Icon color="pink.400">
                                <LuLandPlot />
                            </Icon>
                            <Text textStyle="xs">Landing Date:</Text>
                        </HStack>
                        <Text textStyle="sm">{photo.rover.landing_date}</Text>
                    </Stack>
                </Box>

                <Box p="4">
                    <Stack gap={0}>
                        <HStack gap={1}>
                            <Icon color="pink.400">
                                <LuCalendarDays />
                            </Icon>
                            <Text textStyle="xs">Earth date:</Text>
                        </HStack>
                        <Text textStyle="sm">{photo.earth_date}</Text>
                    </Stack>
                </Box>

                <Box p="4">
                    <Stack gap={0}>
                        <HStack gap={1}>
                            <Icon color="pink.400">
                                <LuOrbit />
                            </Icon>
                            <Text textStyle="xs">SOL:</Text>
                        </HStack>
                        <Text textStyle="sm">{photo.sol}</Text>
                    </Stack>
                </Box>

                <Box p="4" spaceY="2">
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
            </GridItem>
        </Grid>
    )
}

export default PhotoDetailPage
