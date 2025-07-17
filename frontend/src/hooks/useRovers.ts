import APIClient from "@/services/api-client.ts";
import type {FetchResponse} from "@/services/api-client.ts";
import type {Rover} from "@/types";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<Rover>('/rovers');

const useRovers = () => {

    const { data, error, isLoading } = useQuery<FetchResponse<Rover>>({
        queryKey: ['rovers'],
        queryFn: apiClient.getAll,
        staleTime: 24 * 60 * 60 * 1000, // 24h
    })

    return {
        data: data?.results || [],
        error: error?.message,
        loading: isLoading
    };
};

export default useRovers;
