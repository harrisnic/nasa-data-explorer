import type {NasaAction, NasaState} from "@/reducers/nasaReducer.ts";
import type {Dispatch} from "react";
import {createContext} from "react";

interface NasaCtxType {
    nasaCtxData: NasaState;
    nasaCtxDispatcher: Dispatch<NasaAction>
}

export const NasaCtx = createContext<NasaCtxType>({} as NasaCtxType);
