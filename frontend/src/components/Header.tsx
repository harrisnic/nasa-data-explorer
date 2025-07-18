import {Box, HStack, Image} from "@chakra-ui/react";
import NasaLogo from '../assets/nasa-logo.svg'
import {ColorModeButton} from "@/components/ui/color-mode.tsx";
import NavBar from "@/components/NavBar.tsx";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <HStack justifyContent="space-between" padding="6" mb="8">
            <HStack >
                <Link to="/">
                    <Image me="12" boxSize="60px" src={NasaLogo} alt="NASA logo" />
                </Link>
                <Box display={{ base: "none", lg: "block" }}>
                    <NavBar/>
                </Box>
            </HStack>
            <ColorModeButton/>
        </HStack>
    )
}

export default Header
