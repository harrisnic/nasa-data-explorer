import {Center, Grid, GridItem, Spinner} from "@chakra-ui/react";
import NavBar from "@/components/NavBar.tsx";
import PhotoGrid from "@/components/PhotoGrid.tsx";
import RoverList from "@/components/RoverList.tsx";
import {useEffect, useState} from "react";
import type {Rover} from "@/types";
import useRovers from "@/hooks/useRovers.ts";
import AlertBox from "@/components/AlertBox.tsx";
import DateSelector from "@/components/DateSelector.tsx";

function App() {
    const { data: rovers, error, loading } = useRovers();

    const [selectedRover, setSelectedRover] = useState<Rover | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Preselect first rover when available
    useEffect(() => {
        if (rovers?.length > 0 && !selectedRover) {
            setSelectedRover(rovers[0]);
        }
    }, [rovers]);

    if (loading) return <Spinner m="6"/>;
    if (error) {
        return (
            <Center minH="100vh">
                <AlertBox status="error" description={error}/>);
            </Center>
        );
    }

    return (
        <Grid
            templateAreas={{
                base: `"nav nav" "aside aside" "main main"`,
                lg: `"nav nav" "aside main"`
            }}
            templateColumns={{
                base: "1fr",
                lg: "80px 1fr"
            }}
        >

        <GridItem area="nav">
            <NavBar/>
        </GridItem>

        <GridItem area="aside" p="3">
            <RoverList rovers={rovers} selectedRover={selectedRover} onSelectRover={setSelectedRover}/>
        </GridItem>

        <GridItem area="main">
            <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <PhotoGrid selectedRover={selectedRover} selectedDate={selectedDate} />
        </GridItem>
    </Grid>)
}

export default App
