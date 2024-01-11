import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";

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
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
