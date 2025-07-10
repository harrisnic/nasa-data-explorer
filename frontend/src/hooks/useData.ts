import {useEffect, useState} from "react";
import apiClient from "@/services/api-client.ts";
import {CanceledError} from "axios";

interface FetchResponse<T> {
    success: boolean;
    message: string;
    results: T[];
}

const useData = <T>(endpoint: string) => {

    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true)
        apiClient
            .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
            .then(res => {
                setData(res.data.results)
                setLoading(false)
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                console.log(err)
                setError(err.message)
                setLoading(false)
            })

        return () => controller.abort()
    }, [])

    console.log(data)
    return {data, error, loading}
}

export default useData;
