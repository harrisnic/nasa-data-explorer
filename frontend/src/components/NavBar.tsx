import {HStack, Image} from "@chakra-ui/react";
import NasaLogo from '../assets/nasa-logo.svg'
import {ColorModeButton} from "@/components/ui/color-mode.tsx";

const NavBar = () => {
    return (
        <HStack justifyContent="space-between" padding={"10px"}>
            <Image boxSize="60px" src={NasaLogo} alt="NASA logo" />
            <ColorModeButton/>
        </HStack>
    )
}

export default NavBar
