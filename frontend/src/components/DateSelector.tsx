import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {useContext} from "react";
import {NasaCtx} from "@/contexts/nasaCtx.ts";
import {NasaActionTypes} from "@/reducers/nasaReducer.ts";

const StyledDatePickerWrapper = styled(Box)`
    .flatpickr-input {
        width: 140px;
        padding: 8px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.2s, box-shadow 0.2s;
        background-color: white;
    
        &:focus {
          border-color: #3182ce;
          box-shadow: 0 0 0 1px #3182ce;
          outline: none;
        }
    
        &:hover {
          border-color: #cbd5e0;
        }
        
        &::placeholder {
          color: #a0aec0;
        }
    }
`;

const DateSelector = () => {
    const { nasaCtxData: {selectedDate}, nasaCtxDispatcher } = useContext(NasaCtx)

    return (
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
    );
};

export default DateSelector;
