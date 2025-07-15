import useData from "@/hooks/useData.ts";
import type {Photo, Rover} from "@/types";

const usePhotos = (selectedRover: Rover | null, selectedDate: Date | null) => {

    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-CA') : '' // YYYY-MM-DD

    console.log(formattedDate)
    return useData<Photo>('/photos',
        {
            params: {
                rover: selectedRover?.name,
                ...(formattedDate && { date: formattedDate })
            }
        },
        [selectedRover, selectedDate])
}

export default usePhotos
