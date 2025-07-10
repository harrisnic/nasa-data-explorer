import { List, Stack, Heading, Spinner } from "@chakra-ui/react"
import useRovers from "@/hooks/useRovers.ts";
import { LuBot, LuRocket, LuSatellite, LuRadar } from "react-icons/lu"
import type {IconType} from "react-icons";

// Mapping object to assign specific icons to each rover by its name
const roverIcons: Record<string, IconType> = {
    'Curiosity': LuBot,
    'Opportunity': LuSatellite,
    'Spirit': LuRocket,
    'default': LuRadar,
}

const RoverList = () => {

    const {data, error, loading} = useRovers();

    if (error) return null;
    if (loading) return <Spinner size="sm" />;

    return (
        <Stack p="5" align="flex-start">
            <Heading size="sm" fontWeight="bold">Rovers</Heading>
            <List.Root gap="2" variant="plain" align="center">
                {data.map(rover => {
                    const RoverIcon = roverIcons[rover.name] || roverIcons.default;
                    return (
                        <List.Item key={rover.id}>
                            <List.Indicator asChild color="pink.600">
                                <RoverIcon/>
                            </List.Indicator>
                            <p>{rover.name}</p>
                        </List.Item>
                    )
                })}
            </List.Root>
        </Stack>
    )
}

export default RoverList
