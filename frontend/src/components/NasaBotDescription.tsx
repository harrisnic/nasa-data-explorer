import {Center, Text} from "@chakra-ui/react";

const NasaBotDescription = () => {
    return (
        <Center>
            <Text
                backgroundImage="linear-gradient(45deg, var(--chakra-colors-pink-400), var(--chakra-colors-pink-600))"
                backgroundClip="text"
                color="transparent"
                fontWeight="light"
                fontSize={["2xl", "3xl", "4xl"]}
                lineHeight="1.2"
            >
                Hi! If you are curious about Mars or NASA's missions there, feel free to ask!
            </Text>
        </Center>
    )
}
export default NasaBotDescription
