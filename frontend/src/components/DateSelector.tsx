import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {useContext} from "react";
import {NasaCtx} from "@/contexts/nasaCtx.ts";
import {NasaActionTypes} from "@/reducers/nasaReducer.ts";

const StyledDatePickerWrapper = styled(Box)`
    .flatpickr-input {
        width: 180px;
        padding: 8px 12px;
        border: 1px solid #f472b6;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.2s, box-shadow 0.2s;
        background-color: white;

        &:focus {
            border-color: #db2777;
            box-shadow: 0 0 5px 2px rgba(219, 39, 119, 0.2);
            outline: none;
        }

        &:hover {
            border-color: #db2777;
        }

        &::placeholder {
            color: #71717a;
        }
    }
`;

const DateSelector = () => {
    const { nasaCtxData: {selectedDate}, nasaCtxDispatcher } = useContext(NasaCtx)

    return (
        <Box pl={6}>
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

    );
};

export default DateSelector;
