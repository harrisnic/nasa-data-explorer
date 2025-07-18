import {Center, Grid, GridItem, Spinner} from "@chakra-ui/react";
import PhotoGrid from "@/components/PhotoGrid.tsx";
import {useContext, useEffect} from "react";
import AlertBox from "@/components/AlertBox.tsx";
import DateSelector from "@/components/DateSelector.tsx";
import useRovers from "@/hooks/useRovers.ts";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import {NasaActionTypes} from "@/stores/nasa/nasaReducer.ts";

function Homepage() {
    const { data: rovers, error, loading } = useRovers();
    const { nasaCtxData: {selectedRover}, nasaCtxDispatcher } = useContext(NasaCtx)

    // Preselect first rover when available
    useEffect(() => {
        if (rovers?.length > 0 && !selectedRover?.name) {
            nasaCtxDispatcher({ type: NasaActionTypes.SIMPLE_APPEND, payload: { selectedRover: rovers[0], rovers: rovers}});
        }
    }, [rovers]);

    if (loading) return <Spinner color="pink.600" m="6"/>;
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
                base: `"main"`,
                lg: `"main"`
            }}
            templateColumns={{
                base: "1fr",
                lg: "1fr"
            }}
        >

            <GridItem area="main">
                <DateSelector />
                <PhotoGrid />
            </GridItem>

        </Grid>
    )
}

export default Homepage;
