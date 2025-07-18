import React from 'react'
import {Box, Grid, GridItem} from "@chakra-ui/react";
import NasaBotForm from "@/components/NasaBotForm.tsx";


const NasaBotPage = () => {
    return (
        <Grid
            templateAreas={{
                base: `"form"`,
                lg: `"form"`
            }}
            templateColumns={{
                base: "1fr",
                lg: "1fr 1fr"
            }}
        >


            <GridItem area="form" p="3">
                <NasaBotForm/>
            </GridItem>

        </Grid>
    )
}
export default NasaBotPage
