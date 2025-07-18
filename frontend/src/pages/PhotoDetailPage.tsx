import {useParams, useSearchParams} from "react-router-dom";
import {useContext} from "react";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import type {Photo} from "@/types";
import PhotoImage from "@/components/PhotoImage.tsx";
import {Badge, Box, Flex, Grid, GridItem, HStack, Icon, Stack, Text} from "@chakra-ui/react";
import {LuBattery, LuBatteryFull, LuBot, LuCalendarDays, LuFocus, LuLandPlot, LuOrbit, LuRocket} from "react-icons/lu";
import BackButton from "@/components/BackButton.tsx";
import usePhotoById from "@/hooks/usePhotoById.ts";

const PhotoDetailPage = () => {
    const {id} = useParams();
    const [searchParams] = useSearchParams(); // Note: destructure the array

    // Get individual parameters
    const selectedRover = searchParams.get('selectedRover');
    const selectedDate = searchParams.get('selectedDate');


    const {data, error, loading} = usePhotoById(Number(id), selectedRover, selectedDate)

    console.log("Data",data)

    if (error) {
        return <div>Photo not found</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

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
                    <PhotoImage src={data.img_src} alt={data.camera.full_name} />
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
                            <Text textStyle="sm">{data.rover.name}</Text>
                        </Stack>

                        <Stack gap={0}>
                            <Badge variant="solid" colorPalette={data.rover.status === "active" ? "green" : "pink"} size="md">
                                {data.rover.status === "active" ? <Icon color="green.400" size="md"><LuBatteryFull /></Icon> : <Icon color="pink.400" size="md"><LuBattery /></Icon>}
                                {data.rover.status}
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
                        <Text textStyle="sm">{data.rover.launch_date}</Text>
                    </Stack>

                    <Stack gap={0}>
                        <HStack gap={1}>
                            <Icon color="pink.400">
                                <LuLandPlot />
                            </Icon>
                            <Text textStyle="xs">Landing Date:</Text>
                        </HStack>
                        <Text textStyle="sm">{data.rover.landing_date}</Text>
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
                        <Text textStyle="sm">{data.earth_date}</Text>
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
                        <Text textStyle="sm">{data.sol}</Text>
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
                        <Text textStyle="sm">{data.camera.full_name}</Text>
                    </Stack>
                </Box>
            </GridItem>
        </Grid>
    )
}

export default PhotoDetailPage
