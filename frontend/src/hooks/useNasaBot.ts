import APIClient from "@/services/api-client.ts";
import type {FetchResponse} from "@/services/api-client.ts";
import type {BotResponse} from "@/types";
import {useQuery} from "@tanstack/react-query";

const apiClient = new APIClient<BotResponse>('/bot');

const useNasaBot = (prompt: string, enabled: boolean = false) => {

    const { data, error, isLoading } = useQuery<FetchResponse<BotResponse>>({
        queryKey: ['nasa-bot', prompt],
        queryFn: () => apiClient.post({prompt}),
        enabled: enabled && !!prompt, // Only run when enabled is true and prompt exists
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        data: data?.results,
        error: error?.message,
        loading: isLoading
    };
};

export default useNasaBot;
