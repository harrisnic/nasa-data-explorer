import { IconButton } from '@chakra-ui/react';
import {LuArrowLeft} from 'react-icons/lu';
import {useNavigate} from "react-router-dom";

const BackToTopButton = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <IconButton
            onClick={handleBack}
            size="xs"
            bgColor="pink.400"
            color="white"
            rounded="full"
            _hover={{ bgColor: "pink.600"}}
        >
            <LuArrowLeft size="16px" />
        </IconButton>
    );
};

export default BackToTopButton;
