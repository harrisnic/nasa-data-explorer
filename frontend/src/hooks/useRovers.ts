import useData from "@/hooks/useData.ts";

export interface Rover {
    id: number;
    name: string;
}

const useRovers = () => useData<Rover>('/rovers')

export default useRovers
