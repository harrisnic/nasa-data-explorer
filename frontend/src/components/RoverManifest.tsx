import {Box, Timeline, Text, HStack, Stack, Flex, Icon, Badge, Spinner, VStack} from "@chakra-ui/react";
import {useContext} from "react";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import useManifests from "@/hooks/useManifests.ts";
import {LuBattery, LuBatteryFull, LuBot, LuLandPlot, LuPickaxe, LuRocket } from "react-icons/lu";
import Error from "@/components/Error.tsx";

const RoverManifest = () => {
    const { nasaCtxData: {selectedRover}} = useContext(NasaCtx)
    const {data, error, loading} = useManifests(selectedRover)

    if (error) return <Error description={error} />
    if (!data) return <Error description="Manifest not found" />;

    return(
        <VStack>
            { loading && <Spinner size="xs" color="pink.600" m="5"/> }
            { !loading && data &&
                <Box>
                    <Flex gap="6" mb="6" justify="space-between" >
                        <Stack gap={0}>
                            <HStack gap={1}>
                                <Icon color="pink.400">
                                    <LuBot />
                                </Icon>
                                <Text textStyle="xs">Rover:</Text>
                            </HStack>
                            <Text textStyle="sm">{data.name}</Text>
                        </Stack>
                        <Stack gap={0}>
                            <Badge variant="solid" colorPalette={data.status === "active" ? "green" : "pink"} size="md">
                                {data.status === "active" ? <Icon color="green.400" size="md"><LuBatteryFull /></Icon> : <Icon color="pink.400" size="md"><LuBattery /></Icon>}
                                {data.status}
                            </Badge>
                        </Stack>
                    </Flex>
                    <Timeline.Root>
                        <Timeline.Item>
                            <Timeline.Connector>
                                <Timeline.Separator />
                                <Timeline.Indicator>
                                    <LuRocket />
                                </Timeline.Indicator>
                            </Timeline.Connector>
                            <Timeline.Content>
                                <Timeline.Title>Launch date</Timeline.Title>
                                <Timeline.Description>{data.launch_date}</Timeline.Description>
                            </Timeline.Content>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Timeline.Connector>
                                <Timeline.Separator />
                                <Timeline.Indicator>
                                    <LuLandPlot />
                                </Timeline.Indicator>
                            </Timeline.Connector>
                            <Timeline.Content>
                                <Timeline.Title>Landing date</Timeline.Title>
                                <Timeline.Description>{data.landing_date}</Timeline.Description>
                            </Timeline.Content>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Timeline.Connector>
                                <Timeline.Separator />
                                <Timeline.Indicator>
                                    <LuPickaxe />
                                </Timeline.Indicator>
                            </Timeline.Connector>
                            <Timeline.Content>
                                <Timeline.Title>Last operational date</Timeline.Title>
                                <Timeline.Description>{data.max_date}</Timeline.Description>
                            </Timeline.Content>
                        </Timeline.Item>
                    </Timeline.Root>
                </Box>
            }
        </VStack>
    )
}

export default RoverManifest
