import Header from "../components/misc/Header";
import Sidebar from "../components/SideNav/Sidebar";
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
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <StyledRoot>
            <Header onOpenNav={() => setOpen(true)} />
            <Sidebar openNav={open} onCloseNav={() => setOpen(false)} />
            <Main>
                <Outlet />
            </Main>
        </StyledRoot>
    );
};

export default DashboardLayout;
