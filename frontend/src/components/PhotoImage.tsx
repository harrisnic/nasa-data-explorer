import { Image } from "@chakra-ui/react";
import { useState } from "react";

interface PhotoImageProps {
    src: string;
    alt: string;
}

const fallbackImage: string = "/fallback-image.png";

const PhotoImage = ({ src, alt }: PhotoImageProps) => {

    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        setImgSrc(fallbackImage);
    };

    return (
        <Image minHeight="220px" fit="cover" src={imgSrc} alt={alt} onError={handleError} />
    );
};

export default PhotoImage;
