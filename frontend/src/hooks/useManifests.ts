import APIClient from "@/services/api-client.ts";
import type {FetchResponse} from "@/services/api-client.ts";
import type {Manifest, Rover} from "@/types";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<Manifest>('/manifests');

const useManifests = (selectedRover: Rover) => {

    const { data, error, isLoading } = useQuery<FetchResponse<Manifest>>({
        queryKey: ['manifests', selectedRover?.name],
        queryFn: () => apiClient.getAll({
            params: {
                rover: selectedRover?.name,
            }
        }),
        enabled: !!selectedRover?.name, // Only run query when rover is selected
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        data: data?.results || [],
        error: error?.message,
        loading: isLoading
    };
};

export default useManifests;
