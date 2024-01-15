import navConfig from "./config";
import useAuth from "../../hooks/useAuth";
import { styled, alpha } from "@mui/material/styles";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Link,
    Typography,
    Avatar,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { PiMicrophoneStageBold } from "react-icons/pi";

type Props = {
    openNav: boolean;
    onCloseNav: () => void;
};

const StyledAccount = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const Sidebar: React.FC<Props> = ({ openNav, onCloseNav }) => {
    const { auth } = useAuth();
    return (
        <Drawer
            open={openNav}
            onClose={onCloseNav}
            PaperProps={{
                sx: {
                    bgcolor: "background.default",
                },
            }}
        >
            <Box sx={{ mb: 5, mx: 2.5, mt: 5 }}>
                <Link underline="none">
                    <StyledAccount>
                        <Avatar />

                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                                {auth.author}
                            </Typography>
                        </Box>
                    </StyledAccount>
                </Link>
                {auth.author !== "" ? (
                    <>
                        <ListItem
                            key="1"
                            disablePadding
                            component={NavLink}
                            to={"/myThreads"}
                            sx={{
                                "&.active": {
                                    bgcolor: "action.selected",
                                    fontWeight: "fontWeightBold",
                                },
                                "&": {
                                    color: "text.primary",
                                },
                            }}
                        >
                            <ListItemButton onClick={onCloseNav}>
                                <ListItemIcon>
                                    <PiMicrophoneStageBold />
                                </ListItemIcon>
                                <ListItemText primary={"My Posts"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            key="1"
                            disablePadding
                            component={NavLink}
                            to={"/myComments"}
                            sx={{
                                "&.active": {
                                    bgcolor: "action.selected",
                                    fontWeight: "fontWeightBold",
                                },
                                "&": {
                                    color: "text.primary",
                                },
                            }}
                        >
                            <ListItemButton onClick={onCloseNav}>
                                <ListItemIcon>
                                    <FaComments />
                                </ListItemIcon>
                                <ListItemText primary={"My Comments"} />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    ""
                )}
            </Box>
            <Box sx={{ width: 250 }} role="presentation">
                <List>
                    {navConfig.map((item) => (
                        <ListItem
                            key={item.title}
                            disablePadding
                            component={NavLink}
                            to={item.path}
                            sx={{
                                "&.active": {
                                    bgcolor: "action.selected",
                                    fontWeight: "fontWeightBold",
                                },
                                "&": {
                                    color: "text.primary",
                                },
                            }}
                        >
                            <ListItemButton onClick={onCloseNav}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
