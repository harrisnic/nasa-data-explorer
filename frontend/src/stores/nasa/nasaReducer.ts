import type {Photo, Rover} from "@/types";

export interface NasaState {
    selectedRover?: Rover | null;
    selectedDate?: Date | null;
    rovers?: Rover[];
    photos?: Photo[];
}

export interface NasaAction {
    type: string;
    payload: NasaState;
}

export const NasaActionTypes = {
    SIMPLE_APPEND: "simpleAppend"
}

export const nasaReducer = (state: NasaState, action: NasaAction) => {
    switch (action.type) {
        case NasaActionTypes.SIMPLE_APPEND:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
