import React from "react";
import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";
import { Box } from "@chakra-ui/react";
const DefaultLayout = (props) => {
    return (
        <>
            <Box as={"div"} className="ml-260">
                <Box as={"div"} className="container">
                    <Header></Header>
                </Box>
            </Box>
            <SideBar></SideBar>
            <Box as={"div"} className="ml-260">
                <Box as={"div"} className="container mt-5">
                    {props.children}
                </Box>
            </Box>
        </>
    );
};

export default DefaultLayout;
