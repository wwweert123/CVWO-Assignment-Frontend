import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@mui/material";

export default function Header() {
    const [openAuthForm, setOpenAuthForm] = useState<boolean>(false);
    const [author, setAuthor] = useState<string>();

    const handleOpen = () => {
        setOpenAuthForm(true);
    };

    const handleClose = () => {
        setOpenAuthForm(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setAuthor(value);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {"Frederick's Forum"}
                        </Typography>
                        <Button color="inherit" onClick={handleOpen}>
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Dialog
                open={openAuthForm}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: "#212B36",
                    },
                }}
            >
                <DialogTitle>Enter your username</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        All threads and comments created will then be associated with this username
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="username"
                        label="username"
                        name="Username"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={author}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Login</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
