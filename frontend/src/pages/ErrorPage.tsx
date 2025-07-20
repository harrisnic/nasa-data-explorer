import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import Header from "@/components/Header.tsx";
import Error from "@/components/Error.tsx";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <>
            <Header/>
            <Error description={isRouteErrorResponse(error) ? "This page does not exist" : "An unexpected error occurred"}/>
        </>
    )
}

export default ErrorPage
