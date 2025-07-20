import { Dialog, Portal, CloseButton, IconButton } from "@chakra-ui/react";
import {LuCpu} from "react-icons/lu";
import RoverManifest from "@/components/RoverManifest.tsx";

const RoverStatusDialog = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <IconButton aria-label="Rover Manifest" variant="ghost">
                    <LuCpu />
                </IconButton>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content maxW="300px">
                        <Dialog.Body pt="10">
                            <RoverManifest/>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
export default RoverStatusDialog
