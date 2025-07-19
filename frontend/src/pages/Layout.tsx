import Header from "@/components/Header.tsx";
import {Outlet} from "react-router-dom";
import BackToTopButton from "@/components/BackToTopButton.tsx";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <BackToTopButton/>
        </>
    )
}
export default Layout
