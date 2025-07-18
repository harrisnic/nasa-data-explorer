import Header from "@/components/Header.tsx";
import {Outlet} from "react-router-dom";
import RoverList from "@/components/RoverList.tsx";
import {Box} from "@chakra-ui/react";
import BackToTopButton from "@/components/BackToTopButton.tsx";

const Layout = () => {
    return (
        <>
            <Header/>
            <Box display={{ base: "block", lg: "none" }} m="6">
                <RoverList/>
            </Box>
            <Outlet/>
            <BackToTopButton/>
        </>
    )
}
export default Layout
