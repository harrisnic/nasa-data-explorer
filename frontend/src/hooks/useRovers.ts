import useData from "@/hooks/useData.ts";
import type {Rover} from "@/types";

const useRovers = () => useData<Rover>('/rovers')

export default useRovers
