import {ReactNode, useReducer} from 'react'
import type {NasaAction, NasaState, Rover} from "@/reducers/nasaReducer.ts";
import {NasaCtx} from "@/contexts/nasaCtx.ts";
import {nasaReducer} from "@/reducers/nasaReducer.ts";
import type {Photo} from "@/types";

interface Props {
    children?: ReactNode;
}

const NasaCtxProvider = ({children}: Props) => {
    const [nasaCtxData, nasaCtxDispatcher] = useReducer(nasaReducer, {
        selectedRover: {} as Rover,
        selectedDate: null,
        rovers: [] as Rover[],
        photos: [] as Photo[],
    })

    return (
        <NasaCtx.Provider value={{nasaCtxData, nasaCtxDispatcher}}>{children}</NasaCtx.Provider>
    )
}

export default NasaCtxProvider
