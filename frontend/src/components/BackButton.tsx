import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Button size="xs" onClick={handleBack} variant="solid" colorPalette={"pink"}>
            Back
        </Button>
    );
};

export default BackButton;
