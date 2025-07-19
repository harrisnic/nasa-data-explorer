import {IconButton} from '@chakra-ui/react';
import {LuBrainCircuit} from 'react-icons/lu';
import {useNavigate} from "react-router-dom";

const NasaBotButton = () => {
    const navigate = useNavigate();

    const handleBotNavigate = () => {
        navigate('/bot');
    };

    return (
        <IconButton onClick={() => handleBotNavigate()} size="xs" bg="pink.600" rounded="full">
            <LuBrainCircuit/>
        </IconButton>
    );
};

export default NasaBotButton;
