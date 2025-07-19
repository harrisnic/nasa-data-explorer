import {HStack, Box, Link, IconButton} from '@chakra-ui/react';
import {LuBotMessageSquare, LuBrainCircuit} from 'react-icons/lu';
import {useNavigate} from "react-router-dom";

const BotButton = () => {
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

export default BotButton;
