import useData from "@/hooks/useData.ts";

export interface Photo {
    id: number;
    sol: number;
    img_src: string;
    earth_date: string;
}

const usePhotos = () => useData<Photo>('/')

export default usePhotos
