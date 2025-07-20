import {Box, SimpleGrid} from "@chakra-ui/react";
import usePhotos from "@/hooks/usePhotos.ts";
import PhotoCard from "./PhotoCard.tsx";
import PhotoCardSkeleton from "@/components/PhotoCardSkeleton.tsx";
import PhotoCardContainer from "@/components/PhotoCardContainer.tsx";
import AlertBox from "@/components/AlertBox.tsx";
import {useContext, useEffect} from "react";
import {NasaCtx} from "@/stores/nasa/nasaCtx.ts";
import {NasaActionTypes} from "@/stores/nasa/nasaReducer.ts";
import RoverManifest from "@/components/RoverManifest.tsx";
import Error from "@/components/Error.tsx";

const PhotoGrid = () => {

    const { nasaCtxData: {selectedRover, selectedDate}, nasaCtxDispatcher} = useContext(NasaCtx)

    const {data, error, loading} = usePhotos(selectedRover!, selectedDate!)
    const skeletons = [1, 2, 3, 4, 5, 6]

    // Add photos to context when data is available to share with other components (PhotoDetailsPage.tsx)
    useEffect(() => {
        if (data && data.length > 0) {
            nasaCtxDispatcher({ type: NasaActionTypes.SIMPLE_APPEND, payload: { photos: data}});
        }
    }, [data?.length, nasaCtxDispatcher]);

    if (error) return <Error description={error} />

    if (data && data.length === 0 && !loading) {
        return(
            <>
                <Box my="8" display="flex" justifyContent="center">
                    <AlertBox status="warning" maxW="340px" description="No photos found for the selected date."/>
                </Box>
                <RoverManifest />
            </>
        )
    }

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
