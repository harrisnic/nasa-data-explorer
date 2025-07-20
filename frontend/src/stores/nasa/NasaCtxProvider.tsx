import {useReducer} from 'react'
import type {ReactNode} from 'react'
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import {nasaReducer} from "@/stores/nasa/nasaReducer.ts";
import type {Photo, Rover} from "@/types";

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
