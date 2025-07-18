import {useContext} from 'react'
import {Badge, Flex, HStack, Icon, Stack, Text} from "@chakra-ui/react";
import {LuBattery, LuBatteryFull, LuBot, LuLandPlot, LuPickaxe, LuRocket} from "react-icons/lu";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";

const RoverStatus = () => {
    const { nasaCtxData: {selectedRover} } = useContext(NasaCtx)

    return (
        <HStack gap={8}>

            <Flex justify="space-between" gap="6">
                <Stack gap={0}>
                    <Badge variant="solid" colorPalette={selectedRover?.status === "active" ? "green" : "pink"} size="md">
                        {selectedRover?.status === "active" ? <Icon color="green.400" size="md"><LuBatteryFull /></Icon> : <Icon color="pink.400" size="md"><LuBattery /></Icon>}
                        {selectedRover?.status}
                    </Badge>
                </Stack>

                <Stack gap={0}>
                    <HStack gap={1}>
                        <Icon color="pink.400">
                            <LuBot />
                        </Icon>
                        <Text textStyle="xs">Rover:</Text>
                    </HStack>
                    <Text textStyle="sm">{selectedRover?.name}</Text>
                </Stack>
            </Flex>

            <Stack gap={0}>
                <HStack gap={1}>
                    <Icon color="pink.400">
                        <LuRocket />
                    </Icon>
                    <Text textStyle="xs">Launch Date:</Text>
                </HStack>
                <Text textStyle="sm">{selectedRover?.launch_date}</Text>
            </Stack>

            <Stack gap={0}>
                <HStack gap={1}>
                    <Icon color="pink.400">
                        <LuLandPlot />
                    </Icon>
                    <Text textStyle="xs">Landing Date:</Text>
                </HStack>
                <Text textStyle="sm">{selectedRover?.landing_date}</Text>
            </Stack>

            <Stack gap={0}>
                <HStack gap={1}>
                    <Icon color="pink.400">
                        <LuPickaxe />
                    </Icon>
                    <Text textStyle="xs">Last operational date:</Text>
                </HStack>
                <Text textStyle="sm">{selectedRover?.max_date}</Text>
            </Stack>

        </HStack>
    )
}
export default RoverStatus
