import {Box, HStack, Link, List, Text} from "@chakra-ui/react";
import {LuRadar, LuSatellite, LuBot, LuRocket, LuEclipse} from "react-icons/lu";
import type {IconType} from "react-icons";
import {useContext} from "react";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import type {Rover} from "@/types";
import {NasaActionTypes} from "@/stores/nasa/nasaReducer.ts";
import {useNavigate} from "react-router-dom";

// Mapping object to assign specific icons to each rover by its name
const roverIcons: Record<string, IconType> = {
    'Curiosity': LuBot,
    'Opportunity': LuSatellite,
    'Spirit': LuRocket,
    'Perseverance': LuEclipse,
    'default': LuRadar,
}

const NavBar = () => {
    const { nasaCtxData: {selectedRover, rovers}, nasaCtxDispatcher } = useContext(NasaCtx)
    const navigate = useNavigate();

    const handleRoverSelect = (rover: Rover) => {
        nasaCtxDispatcher({ type: NasaActionTypes.SIMPLE_APPEND, payload: { selectedRover: rover}});

        // Navigate to the photo grid page
        navigate('/');
    };

    return (
        <List.Root unstyled="true" variant="plain" >
            <HStack gap="6">
                {rovers?.map(rover => {
                    const RoverIcon = roverIcons[rover.name] || roverIcons.default;
                    const isSelected = selectedRover?.id === rover.id;
                    return (
                        <List.Item key={rover.id}>
                            <Link onClick={() => handleRoverSelect(rover)} variant="plain" _hover={{ textDecoration: "none" }}>
                                <HStack align="center" gap="2">
                                    <List.Indicator asChild color={isSelected ? "pink.600" : "gray.500"}>
                                        <Box p="2" bg={isSelected ? "pink.200" : "gray.200"} _dark={{ bg: isSelected ? "pink.900" : "gray.700" }} rounded="full">
                                            <RoverIcon size="16px"/>
                                        </Box>
                                    </List.Indicator>
                                    <Text textStyle="sm" color={isSelected ? "pink.600" : "gray.500"}>{rover.name}</Text>
                                </HStack>
                            </Link>
                        </List.Item>
                    )
                })}
            </HStack>
        </List.Root>
    )
}
export default NavBar
