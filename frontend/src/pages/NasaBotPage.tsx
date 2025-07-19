import {Box, Grid, GridItem} from "@chakra-ui/react";
import NasaBotForm from "@/components/bot/NasaBotForm.tsx";
import {useContext, useEffect, useState} from "react";
import useNasaBot from "@/hooks/useNasaBot.ts";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import {NasaActionTypes} from "@/stores/nasa/nasaReducer.ts";
import NasaBotDescription from "@/components/bot/NasaBotDescription.tsx";
import NasaBotResponse from "@/components/bot/NasaBotResponse.tsx";

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

    return (
        <Box p="2" maxWidth="1200px" width="100%" mx="auto">
            <Grid
                templateAreas={{
                    base: `"intro" "response" "form"`,
                    lg: `"intro intro" "form response"`
                }}
                templateColumns={{
                    base: "1fr",
                    lg: "1fr 1fr"
                }}
                gap="6"
            >
                <GridItem area="intro">
                    <NasaBotDescription/>
                </GridItem>

                <GridItem area="form">
                    <NasaBotForm onPromptSubmit={handlePromptSubmit}/>
                </GridItem>

                <GridItem area="response">
                    <NasaBotResponse data={data} loading={loading} error={error} />
                </GridItem>
            </Grid>
        </Box>
    )
}

export default NasaBotPage
