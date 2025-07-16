import {Box, Skeleton, SkeletonText} from '@chakra-ui/react';

const PhotoCardSkeleton = () => {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Skeleton height="220px" />
            <Box p="6">
                <SkeletonText />
            </Box>
        </Box>
    )
}

export default PhotoCardSkeleton
