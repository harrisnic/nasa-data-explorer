import {SimpleGrid} from "@chakra-ui/react";
import usePhotos from "@/hooks/usePhotos.ts";
import PhotoCard from "./PhotoCard.tsx";
import PhotoCardSkeleton from "@/components/PhotoCardSkeleton.tsx";
import PhotoCardContainer from "@/components/PhotoCardContainer.tsx";
import AlertBox from "@/components/AlertBox.tsx";
import type {Rover} from "@/types";

interface Props {
    selectedRover: Rover | null;
    selectedDate: Date | null;
}

const PhotoGrid = ({selectedRover, selectedDate}: Props) => {

    console.log('****************************************************')
    console.log(typeof selectedRover)
    console.log(selectedRover?.name)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++')

    if (!selectedRover) return;

    const {data, error, loading} = usePhotos(selectedRover, selectedDate)
    const skeletons = [1, 2, 3, 4, 5, 6]

    // console.log('****************************************************')
    // console.log('Selected rover:', selectedRover)
    // console.log('Selected date:', selectedDate)
    // console.log('****************************************************')

    if (error) return <AlertBox status="error" description={error} />



    return (
        <SimpleGrid
            columns={{sm: 1, md: 2, lg: 3, xl: 5}}
            padding={4}
        >
            {loading &&
                skeletons.map((skeleton) => (
                    <PhotoCardContainer key={skeleton}>
                        <PhotoCardSkeleton />
                    </PhotoCardContainer>
                ))
            }
            {data && data.map((photo) => (
                    <PhotoCardContainer key={photo.id}>
                        <PhotoCard photo={photo} />
                    </PhotoCardContainer>
                ))
            }
        </SimpleGrid>
    )
}

export default PhotoGrid
