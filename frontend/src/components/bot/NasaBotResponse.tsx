import {Box, SkeletonText, Text} from "@chakra-ui/react";
import type {BotResponse} from "@/types";
import Error from "@/components/Error.tsx";

interface Props {
    data?: BotResponse;
    loading: boolean;
    error?: string;
}

const NasaBotResponse = ({ data, loading, error }: Props) => {
    if (error) return  <Error description={error} />
    if (loading) return <SkeletonText noOfLines={4} />
    if (!data) return null;

    return (
        <Box p="3" borderRadius="md" maxHeight="420px" overflow="auto" bg="gray.100" _dark={{ bg: "gray.800" }}>
            <Text>{data.answer}</Text>
        </Box>
    );
}
export default NasaBotResponse
