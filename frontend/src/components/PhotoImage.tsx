import { Image } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    src: string;
    alt: string;
}

const fallbackImage: string = "/fallback-image.png";

const PhotoImage = ({ src, alt }: Props) => {

    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        setImgSrc(fallbackImage);
    };

    return (
        <Image minHeight="220px" maxHeight="660px" fit="cover" src={imgSrc} alt={alt} onError={handleError} />
    );
};

export default PhotoImage;
