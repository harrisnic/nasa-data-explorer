import {Center, Grid, GridItem, Spinner} from "@chakra-ui/react";
import NavBar from "@/components/NavBar.tsx";
import PhotoGrid from "@/components/PhotoGrid.tsx";
import RoverList from "@/components/RoverList.tsx";
import {useContext, useEffect, useState} from "react";
import type {Rover} from "@/types";
import AlertBox from "@/components/AlertBox.tsx";
import DateSelector from "@/components/DateSelector.tsx";
import useRovers from "@/hooks/useRovers.ts";
import {NasaCtx} from "@/contexts/nasaCtx.ts";
import {NasaActionTypes} from "@/reducers/nasaReducer.ts";

function App() {
    const { data: rovers, error, loading } = useRovers();



    // const [selectedRover, setSelectedRover] = useState<Rover | null>(null)
    // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const { nasaCtxData, nasaCtxData: {selectedRover}, nasaCtxDispatcher } = useContext(NasaCtx)

    console.log("Ctx: ",nasaCtxData )


    // Preselect first rover when available
    useEffect(() => {
        if (rovers?.length > 0 && !selectedRover?.name) {
            nasaCtxDispatcher({ type: NasaActionTypes.SIMPLE_APPEND, payload: { selectedRover: rovers[0], rovers: rovers}});
        }
    }, [rovers]);

    console.log(selectedRover)

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
            <RoverList />
        </GridItem>

        <GridItem area="main">
            <DateSelector />
            <PhotoGrid />
        </GridItem>
    </Grid>)
}

export default App
