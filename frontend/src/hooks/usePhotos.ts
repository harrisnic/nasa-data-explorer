import useData from "@/hooks/useData.ts";
import type {Photo, Rover} from "@/types";

const usePhotos = (selectedRover: Rover) =>

    useData<Photo>('/photos',
        {params: {rover: selectedRover?.name}},
        [selectedRover?.name])


export default usePhotos
