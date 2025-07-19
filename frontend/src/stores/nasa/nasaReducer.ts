import type {Photo} from "@/types";

export interface Rover {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol?: number;
    max_date?: string;
    total_photos?: number;
    cameras?: Camera[];
}

interface Camera {
    id?: number;
    name: string;
    rover_id?: number;
    full_name: string;
}

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
