import navConfig from "./config";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
    openNav: boolean;
    onCloseNav: (open: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ openNav, onCloseNav }) => {
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
                            <ListItemButton>
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
