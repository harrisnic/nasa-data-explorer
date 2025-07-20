import APIClient from "@/services/api-client.ts";
import type {FetchResponse} from "@/services/api-client.ts";
import type {Manifest, Rover} from "@/types";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<Manifest>('/manifests');

const useManifests = (selectedRover: Rover | null | undefined) => {

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

    // Get the first manifest from the results array
    const manifest = data?.results[0];

    return {
        data: manifest,
        error: error?.message,
        loading: isLoading
    };
};

export default useManifests;
