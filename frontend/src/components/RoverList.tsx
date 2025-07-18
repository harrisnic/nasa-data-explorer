import {List, Stack, Box, Link, Drawer, Portal, CloseButton, IconButton} from "@chakra-ui/react"
import { LuBot, LuRocket, LuSatellite, LuRadar, LuPanelsTopLeft } from "react-icons/lu"
import {useContext, useState} from "react"
import type {IconType} from "react-icons";
import type {Rover} from "@/types";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import {NasaActionTypes} from "@/stores/nasa/nasaReducer.ts";

// Mapping object to assign specific icons to each rover by its name
const roverIcons: Record<string, IconType> = {
    'Curiosity': LuBot,
    'Opportunity': LuSatellite,
    'Spirit': LuRocket,
    'default': LuRadar,
}

const RoverList = () => {
    const { nasaCtxData: {selectedRover, rovers}, nasaCtxDispatcher } = useContext(NasaCtx)

    const [isOpen, setIsOpen] = useState(false);

    const handleRoverSelect = (rover: Rover) => {
        nasaCtxDispatcher({ type: NasaActionTypes.SIMPLE_APPEND, payload: { selectedRover: rover}});
        setIsOpen(false); // Close the drawer
    };

    const handleOpenChange = (details: { open: boolean }) => {
        setIsOpen(details.open);
    };

    return (
        <Drawer.Root placement="start" open={isOpen} onOpenChange={handleOpenChange}>
            <Drawer.Trigger asChild>
                <IconButton bgColor="pink.600" rounded="full">
                    <LuPanelsTopLeft />
                </IconButton>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner padding="5">
                    <Drawer.Content rounded="md" width="auto">
                        <Drawer.Body px="8">
                            <Stack align="center" justify="center" height="100%">

                                <List.Root gap="6" variant="plain" align="center">
                                    {rovers?.map(rover => {
                                        const RoverIcon = roverIcons[rover.name] || roverIcons.default;
                                        const isSelected = selectedRover?.id === rover.id;
                                        return (
                                            <List.Item key={rover.id} gap="2">
                                                <List.Indicator asChild color={isSelected ? "pink.600" : "gray.500"}>
                                                    <Box
                                                        p="3"
                                                        bg={isSelected ? "pink.200" : "gray.200"}
                                                        _dark={{ bg: isSelected ? "pink.900" : "gray.700" }}
                                                        rounded="full"
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <RoverIcon size="32px"/>
                                                    </Box>
                                                </List.Indicator>
                                                <Link onClick={() => handleRoverSelect(rover)} variant="plain" color={isSelected ? "pink.600" : "gray.500"}>
                                                    {rover.name}
                                                </Link>
                                            </List.Item>
                                        )
                                    })}
                                </List.Root>

                            </Stack>
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

export default RoverList
