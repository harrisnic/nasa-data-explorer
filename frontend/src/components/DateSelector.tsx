import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

type Props = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
};

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

const DateSelector = ({ selectedDate, onDateChange }: Props) => {
    return (
        <StyledDatePickerWrapper>
            <Flatpickr
                placeholder="Select a date"
                value={selectedDate || undefined}
                onChange={(selectedDates) => {
                    const date = selectedDates[0] || null;
                    onDateChange(date);
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
