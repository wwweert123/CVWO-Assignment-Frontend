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

    const handleSubmitNewThread = () => {
        const data = {
            title: forumForm.title,
            description: forumForm.description,
            upvotes: 0,
        };
        ForumThreadService.createNewThread(data).then((response) => {
            setForumThreads([
                ...forumThreads,
                {
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    upvotes: response.data.upvotes,
                },
            ]);
        });
        setForumform(initialFormState);
        setOpenThreadForm(false);
    };

    const initialFormState = {
        title: "",
        description: "",
        upvotes: 0,
    };

    const [forumForm, setForumform] = React.useState<IForumThread>(initialFormState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name);
        setForumform({ ...forumForm, [name]: value });
    };

    React.useEffect(() => {
        let mounted = true;
        ForumThreadService.getAllThreads().then((fetchedForumThread) => {
            if (mounted) {
                setForumThreads(fetchedForumThread);
            }
        });
        return () => {
            mounted = false;
        };
    }, [forumThreads.length]);

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
                        name="title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={forumForm.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        multiline
                        rows={10}
                        margin="dense"
                        id="name"
                        label="Description"
                        name="description"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={forumForm.description}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmitNewThread}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Home;
