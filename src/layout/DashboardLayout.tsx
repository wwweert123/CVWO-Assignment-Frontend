import Header from "../components/misc/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledRoot = styled("div")({
    //display: "flex",
    minHeight: "100%",
    overflow: "hidden",
});

const Main = styled("div")(() => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    maxWidth: "80%",
    marginLeft: "10%",
    padding: "1%",
}));

const DashboardLayout = () => {
    return (
        <StyledRoot>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </StyledRoot>
    );
};

export default DashboardLayout;
