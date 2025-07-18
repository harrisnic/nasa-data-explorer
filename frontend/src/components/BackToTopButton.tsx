import { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { LuArrowUp } from 'react-icons/lu';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button when user scrolls 500px
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisible) return null;

    return (
        <IconButton
            onClick={scrollToTop}
            position="fixed"
            bottom="6"
            right="6"
            size="lg"
            bgColor="pink.400"
            color="white"
            rounded="full"
            zIndex={1000}
            _hover={{ bgColor: "pink.600", transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.95)" }}
            transition="all 0.2s"
            aria-label="Back to top"
        >
            <LuArrowUp size="16px" />
        </IconButton>
    );
};

export default BackToTopButton;
