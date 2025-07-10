import {SimpleGrid, Text} from "@chakra-ui/react";
import usePhotos from "@/hooks/usePhotos.ts";
import PhotoCard from "./PhotoCard.tsx";
import PhotoCardSkeleton from "@/components/PhotoCardSkeleton.tsx";
import PhotoCardContainer from "@/components/PhotoCardContainer.tsx";

const PhotoGrid = () => {

    const {data, error, loading} = usePhotos()
    const skeletons = [1, 2, 3, 4, 5]

    if (error) return <Text>{error}</Text>;

    return (
        <SimpleGrid
            columns={{sm: 1, md: 2, lg: 3, xl: 5}}
            spacing={3}
            padding="10px"
        >
            {loading &&
                skeletons.map((skeleton) => (
                    <PhotoCardContainer key={skeleton}>
                        <PhotoCardSkeleton />
                    </PhotoCardContainer>
                ))
            }
            {!loading &&
                data.map((photo) => (
                    <PhotoCardContainer key={photo.id}>
                        <PhotoCard photo={photo} />
                    </PhotoCardContainer>
                ))
            }

        </SimpleGrid>
    )
}

export default PhotoGrid
