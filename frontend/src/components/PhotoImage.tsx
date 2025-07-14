import { Image } from "@chakra-ui/react";
import { useState } from "react";

interface PhotoImageProps {
    src: string;
    alt: string;
}

const FALLBACK_IMAGE = "/fallback-image.png";

const PhotoImage = ({ src, alt }: PhotoImageProps) => {

    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        setImgSrc(FALLBACK_IMAGE);
    };

    return (
        <Image src={imgSrc} alt={alt} onError={handleError} />
    );
};

export default PhotoImage;
