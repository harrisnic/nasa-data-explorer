import APIClient from "@/services/api-client.ts";
import type {FetchResponse} from "@/services/api-client.ts";
import type {Photo, Rover} from "@/types";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<Photo>('/photos');

const usePhotos = (selectedRover: Rover, selectedDate: Date | null) => {
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-CA') : ''; // YYYY-MM-DD

    const { data, error, isLoading } = useQuery<FetchResponse<Photo>>({
        queryKey: ['photos', selectedRover?.name, formattedDate],
        queryFn: () => apiClient.getAll({
            params: {
                rover: selectedRover?.name,
                ...(formattedDate && { date: formattedDate })
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

export default usePhotos;
