import "flatpickr/dist/themes/dark.css";
import "../styles/flatpickr-custom.css";
import Flatpickr from "react-flatpickr";
import {Box, HStack} from "@chakra-ui/react";
import styled from "@emotion/styled";
import {useContext} from "react";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import {NasaActionTypes} from "@/stores/nasa/nasaReducer.ts";
import RoverStatus from "@/components/RoverStatus.tsx";
import RoverStatusDialog from "@/components/RoverStatusDialog.tsx";

const StyledDatePickerWrapper = styled(Box)`
    .flatpickr-input {
        width: 180px;
        padding: 8px 12px;
        border: 1px solid #db2777;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.2s, box-shadow 0.2s;

        &:focus {
            border-color: #db2777;
            box-shadow: 0 0 5px 2px rgba(219, 39, 119, 0.2);
            outline: none;
        }

        &:hover {
            border-color: #db2777;
        }

        &::placeholder {
            color: #a1a1aa;
        }
    }
`;

const DateSelector = () => {
    const { nasaCtxData: {selectedDate}, nasaCtxDispatcher } = useContext(NasaCtx)

    return (
        <HStack justifyContent="space-between" px="6">
            <Box>
                <StyledDatePickerWrapper>
                    <Flatpickr
                        placeholder="Select a date"
                        value={selectedDate ?? ""}
                        onChange={(selectedDates) => {
                            const date = selectedDates[0] || null;
                            nasaCtxDispatcher({ type: NasaActionTypes.SIMPLE_APPEND, payload: { selectedDate: date}});
                        }}
                        options={{
                            dateFormat: "Y-m-d",
                            enableTime: false,
                        }}
                    />
                </StyledDatePickerWrapper>
            </Box>
            <Box display={{ base: "none", lg: "block" }}>
                <RoverStatus />
            </Box>
            <Box display={{ base: "block", lg: "none" }}>
                <RoverStatusDialog/>
            </Box>
        </HStack>
    );
};

export default DateSelector;
