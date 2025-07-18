import APIClient from "@/services/api-client.ts";
import type {FetchResponse} from "@/services/api-client.ts";
import type {Photo, Rover} from "@/types";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<Photo>('/photos');

const usePhotoById = (photoId: number, selectedRover: string, selectedDate: string | null) => {



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


    return {
        data: data?.results.find(photo => photo.id === photoId) || {},
        error: error?.message,
        loading: isLoading
    };
};

export default usePhotoById;
