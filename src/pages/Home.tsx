import ThreadList from "../components/ThreadList";
import ForumThreadService from "../services/ForumThreadService";
import { IForumThread } from "../type/ForumThread";
import React from "react";

import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";

const Home: React.FC = () => {
    const [forumThreads, setForumThreads] = React.useState<IForumThread[]>([]);

    const [openThreadForm, setOpenThreadForm] = React.useState(false);

    const handleClickOpen = () => {
        setOpenThreadForm(true);
    };

    const handleClose = () => {
        setOpenThreadForm(false);
    };

    React.useEffect(() => {
        let mounted = true;
        ForumThreadService.getAllThreads().then((forumThread) => {
            if (mounted) {
                setForumThreads(forumThread);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <>
            <h3>{"Welcome to Frederick's Forum! Feel Free to Browse around and participate in discussions."}</h3>
            <br />
            <ThreadList forumThreads={forumThreads} />
            <Fab color="primary" aria-label="add" variant="extended" size="medium" onClick={handleClickOpen}>
                <AddIcon />
                Add new thread
            </Fab>
            <Dialog fullScreen open={openThreadForm} onClose={handleClose}>
                <DialogTitle>Create a new thread!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Talk about anything you want! Share with others whatever you want to share about!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        multiline
                        rows={10}
                        margin="dense"
                        id="name"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Home;
