import {Grid, GridItem} from "@chakra-ui/react";
import NavBar from "@/components/NavBar.tsx";
import PhotoGrid from "@/components/PhotoGrid.tsx";
import RoverList from "@/components/RoverList.tsx";

function App() {


    return (
        <Grid
            templateAreas={{
                base: `"nav" "main"`,
                lg: `"nav nav" "aside main"`}}
            templateColumns={{
                base: "1fr",
                lg: "200px 1fr"
            }}
        >

        <GridItem area="nav">
            <NavBar/>
        </GridItem>

        <GridItem hideBelow="lg" area="aside">
            <RoverList/>
        </GridItem>

        <GridItem area="main">
            {/*<PhotoGrid/>*/}
        </GridItem>

    </Grid>)

}

export default App
