import {Box, Grid, GridItem, Spinner} from "@chakra-ui/react";
import NasaBotForm from "@/components/NasaBotForm.tsx";
import {useContext, useEffect, useState} from "react";
import useNasaBot from "@/hooks/useNasaBot.ts";
import Error from "@/components/Error.tsx";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import {NasaActionTypes} from "@/stores/nasa/nasaReducer.ts";
import NasaBotDescription from "@/components/NasaBotDescription.tsx";


const NasaBotPage = () => {
    const [prompt, setPrompt] = useState('');
    const [shouldFetch, setShouldFetch] = useState(false);
    const {data, error, loading} = useNasaBot(prompt, shouldFetch); // Pass shouldFetch here
    const { nasaCtxDispatcher } = useContext(NasaCtx);

    useEffect(() => {
        // Reset selected rover when component mounts
        nasaCtxDispatcher({
            type: NasaActionTypes.SIMPLE_APPEND,
            payload: { selectedRover: null }
        });
    }, [nasaCtxDispatcher]);


    const handlePromptSubmit = (newPrompt: string) => {
        setShouldFetch(true);
        setPrompt(newPrompt);
    };

    console.log(data);

    return (
        <Box p="2" maxWidth="1200px" width="100%" mx="auto">
            <Grid
                templateAreas={{
                    base: `"intro" "form" "response"`,
                    lg: `"intro intro" "form response"`
                }}
                templateColumns={{
                    base: "1fr",
                    lg: "1fr 1fr"
                }}
                gap={4}
            >
                <GridItem area="intro" p="3">
                    <NasaBotDescription/>
                </GridItem>

                <GridItem area="form" p="3">
                    <NasaBotForm onPromptSubmit={handlePromptSubmit}/>
                </GridItem>

                <GridItem area="response" p="3">
                    {loading && <Spinner />}
                    {error && <Error description={error} />}
                    {data && (
                        <div>{data}</div>
                    )}
                </GridItem>
            </Grid>
        </Box>
    )
}

export default NasaBotPage
