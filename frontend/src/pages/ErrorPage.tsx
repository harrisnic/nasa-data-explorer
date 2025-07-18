import {Flex, Heading, Image,} from "@chakra-ui/react";
import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import Header from "@/components/Header.tsx";
import Mars from '../assets/mars.jpg'

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <>
            <Header/>
            <Flex justify="center">
                <Flex gap="4" direction="column" align="center">
                    <Image width="260px" borderRadius="20px" fit="cover" src={Mars} alt="Mars" />
                    <Heading color="pink.600">
                        {isRouteErrorResponse(error) ? "This page does not exist" : "An unexpected error occurred"}
                    </Heading>
                </Flex>
            </Flex>
        </>
    )
}

export default ErrorPage
