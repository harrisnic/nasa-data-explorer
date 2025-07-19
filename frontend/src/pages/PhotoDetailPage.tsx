import {useParams, useSearchParams} from "react-router-dom";
import PhotoImage from "@/components/PhotoImage.tsx";
import {Badge, Box, Flex, Grid, GridItem, HStack, Icon, Spinner, Stack, Text} from "@chakra-ui/react";
import {LuBattery, LuBatteryFull, LuBot, LuCalendarDays, LuFocus, LuLandPlot, LuOrbit, LuRocket} from "react-icons/lu";
import usePhotoById from "@/hooks/usePhotoById.ts";
import BackToPreviousPageButton from "@/components/BackToPreviousPageButton.tsx";
import Error from "@/components/Error.tsx";

const PhotoDetailPage = () => {
    const {id} = useParams();
    const [searchParams] = useSearchParams(); // Note: destructure the array

    // Get individual parameters
    const selectedRover = searchParams.get('selectedRover');
    const selectedDate = searchParams.get('selectedDate');

    const {data, error, loading} = usePhotoById(Number(id), selectedRover, selectedDate)

    if (error) return  <Error description={error} alertBoxMaxW={"320px"}/>
    if (loading) return <Spinner size="xs" color="pink.600" m="5"/>

    return (
        <Box p="2" maxWidth="1200px" width="100%" mx="auto">
            <Box mb="4">
                <BackToPreviousPageButton />
            </Box>
            <Grid
                p="4"
                borderRadius="lg"
                bg="gray.100"
                _dark={{ bg: "gray.800" }}
                templateAreas={{
                    base: `"photo" "details"`,
                    lg: `"photo details"`
                }}
                templateColumns={{
                    base: "1fr",
                    lg: "1fr 1fr"
                }}
            >
                <GridItem area="photo">
                    <Box borderRadius="lg" overflow="hidden" maxH="660px" width="fit-content" mx="auto">
                        <PhotoImage src={data.img_src} alt={data.camera.full_name} />
                    </Box>
                </GridItem>

                <GridItem area="details">
                    <Box p="4">
                        <Flex mb="8" justify="space-between">
                            <Stack gap="0">
                                <HStack gap="1">
                                    <Icon color="pink.400">
                                        <LuBot />
                                    </Icon>
                                    <Text textStyle="xs">Rover:</Text>
                                </HStack>
                                <Text textStyle="sm">{data.rover.name}</Text>
                            </Stack>

                            <Stack gap="0">
                                <Badge variant="solid" colorPalette={data.rover.status === "active" ? "green" : "pink"} size="md">
                                    {data.rover.status === "active" ? <Icon color="green.400" size="md"><LuBatteryFull /></Icon> : <Icon color="pink.400" size="md"><LuBattery /></Icon>}
                                    {data.rover.status}
                                </Badge>
                            </Stack>
                        </Flex>

                        <Stack mb="8" gap="0">
                            <HStack gap="1">
                                <Icon color="pink.400">
                                    <LuRocket />
                                </Icon>
                                <Text textStyle="xs">Launch Date:</Text>
                            </HStack>
                            <Text textStyle="sm">{data.rover.launch_date}</Text>
                        </Stack>

                        <Stack gap="0">
                            <HStack gap="1">
                                <Icon color="pink.400">
                                    <LuLandPlot />
                                </Icon>
                                <Text textStyle="xs">Landing Date:</Text>
                            </HStack>
                            <Text textStyle="sm">{data.rover.landing_date}</Text>
                        </Stack>
                    </Box>

                    <Box p="4">
                        <Stack gap="0">
                            <HStack gap="1">
                                <Icon color="pink.400">
                                    <LuCalendarDays />
                                </Icon>
                                <Text textStyle="xs">Earth date:</Text>
                            </HStack>
                            <Text textStyle="sm">{data.earth_date}</Text>
                        </Stack>
                    </Box>

                    <Box p="4">
                        <Stack gap="0">
                            <HStack gap="1">
                                <Icon color="pink.400">
                                    <LuOrbit />
                                </Icon>
                                <Text textStyle="xs">SOL:</Text>
                            </HStack>
                            <Text textStyle="sm">{data.sol}</Text>
                        </Stack>
                    </Box>

                    <Box p="4" spaceY="2">
                        <Stack gap="0">
                            <HStack gap="1">
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
        </Box>
    )
}

export default PhotoDetailPage
