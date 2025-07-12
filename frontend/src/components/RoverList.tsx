import {List, Stack, Heading, Spinner, Link} from "@chakra-ui/react"
import { LuBot, LuRocket, LuSatellite, LuRadar } from "react-icons/lu"
import type {IconType} from "react-icons";
import type {Rover} from "@/types";

interface Props {
    rovers: Rover[];
    selectedRover: Rover | null;
    onSelectRover: (rover: Rover) => void;
}

// Mapping object to assign specific icons to each rover by its name
const roverIcons: Record<string, IconType> = {
    'Curiosity': LuBot,
    'Opportunity': LuSatellite,
    'Spirit': LuRocket,
    'default': LuRadar,
}

const RoverList = ({rovers, selectedRover, onSelectRover}: Props) => {

    return (
        <Stack p="5" align="flex-start">
            <Heading size="sm" fontWeight="bold">Rovers</Heading>
            <List.Root gap="2" variant="plain" align="center">
                {rovers.map(rover => {
                    const RoverIcon = roverIcons[rover.name] || roverIcons.default;
                    const isSelected = selectedRover?.id === rover.id;
                    return (
                        <List.Item key={rover.id}>
                            <List.Indicator asChild color={isSelected ? "pink.600" : "gray.400"}>
                                <RoverIcon/>
                            </List.Indicator>
                            <Link onClick={() => {onSelectRover(rover)}} variant="plain">
                                {rover.name}
                            </Link>
                        </List.Item>
                    )
                })}
            </List.Root>
        </Stack>
    )
}

export default RoverList
