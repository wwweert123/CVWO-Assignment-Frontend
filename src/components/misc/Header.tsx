import IncorrectCredentialsDialog from "./IncorrectCredentialsDialog";
import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import ForumThreadService from "../../services/ForumThreadService";

import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Stack } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

type Props = {
    onOpenNav: () => void;
};

const Header: React.FC<Props> = ({ onOpenNav }) => {
    const { auth, setAuth } = useAuth();

    const [author, resetAuthor, authorAttribs] = useInput("author", ""); //useState("");
    const [password, setPassword] = useState<string>("");

    const [openAuthForm, setOpenAuthForm] = useState<boolean>(false);
    // const [author, setAuthor] = useState<string>();

    const [credentialsAlert, setCredentialsAlert] = useState<boolean>(false);

    const handleOpen = () => {
        setOpenAuthForm(true);
    };

    const handleClose = () => {
        setOpenAuthForm(false);
    };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { value } = event.target;
    //     setAuthor(value);
    // };

    const handleSetUsername = () => {
        if (author && password !== "") {
            ForumThreadService.createNewAuthor(author, password).then((response) => {
                if (response?.token) {
                    setAuth({ author: author, accessToken: response.token });
                    handleClose();
                } else {
                    setCredentialsAlert(true);
                    return;
                }
            });
        }
        resetAuthor();
        setPassword("");
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={onOpenNav}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {"Frederick's Forum"}
                        </Typography>
                        <Button color="inherit" onClick={handleOpen}>
                            {auth.author == "" ? (
                                "Login"
                            ) : (
                                <Stack direction="row" spacing={1}>
                                    <AccountCircle />
                                    <Typography variant="body2">{auth.author}</Typography>
                                </Stack>
                            )}
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
                <DialogTitle>Enter your username and password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        All threads and comments created will then be associated with this username.
                    </DialogContentText>
                    <strong>
                        After creating your username and password for the first time, you will need to login with the
                        same password for the corresponding username
                    </strong>
                    <TextField
                        margin="dense"
                        id="username"
                        label="username"
                        name="Username"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={author}
                        {...authorAttribs}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="password"
                        name="Password"
                        type="password"
                        fullWidth
                        variant="filled"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSetUsername}>Login</Button>
                </DialogActions>
            </Dialog>
            <IncorrectCredentialsDialog open={credentialsAlert} handleClose={() => setCredentialsAlert(false)} />
        </>
    );
};

export default Header;
