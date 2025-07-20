import APIClient from "@/services/api-client.ts";
import type {FetchResponse} from "@/services/api-client.ts";
import type {Photo} from "@/types";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<Photo>('/photos');

const usePhotoById = (photoId: number, selectedRover: string | null, selectedDate: string | null) => {

    const { data, error, isLoading } = useQuery<FetchResponse<Photo>>({
        queryKey: ['photoById', photoId, selectedRover, selectedDate],
        queryFn: () => apiClient.getAll({
            params: {
                rover: selectedRover,
                ...(selectedDate && { date: selectedDate })
            }
        }),
        enabled: !!selectedRover, // Only run query when rover is selected
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const photo = data?.results.find(photo => photo.id === photoId);

    return {
        data: photo,
        error: error?.message,
        loading: isLoading
    };
};

export default usePhotoById;
