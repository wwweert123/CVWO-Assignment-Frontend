import ThreadList from "../components/ThreadList";
import ForumThreadService from "../services/ForumThreadService";
import NoUsernameAlertDialog from "../components/NoUsernameAlertDialog";
import { IForumThread, IThreadInfo } from "../type/ForumThread";
import useAuth from "../hooks/useAuth";
import React from "react";

import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Stack,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";

const Home: React.FC = () => {
    const { auth } = useAuth();

    const [forumThreads, setForumThreads] = React.useState<IForumThread[]>([]);

    const [openThreadForm, setOpenThreadForm] = React.useState(false);

    const [noUsernameAlert, setNoUsernameAlert] = React.useState(false);

    const handleOpenNoUsernameAlert = () => {
        setNoUsernameAlert(true);
    };

    const handleCloseNoUsernameAlert = () => {
        setNoUsernameAlert(false);
    };

    const handleClickOpen = () => {
        setOpenThreadForm(true);
    };

    const handleClose = () => {
        setOpenThreadForm(false);
    };

    const handleSubmitNewThread = () => {
        if (auth.author == "") {
            setOpenThreadForm(false);
            console.log("No username found");
            handleOpenNoUsernameAlert();
            return;
        }
        const data = {
            title: forumForm.title,
            description: forumForm.description,
            upvotes: 0,
            author_id: auth.id,
        };
        ForumThreadService.createNewThread(data).then((response) => {
            if (response) {
                setForumThreads([...forumThreads, response]);
            }
        });
        setForumform(initialFormState);
        setOpenThreadForm(false);
    };

    const initialFormState = {
        title: "",
        description: "",
        upvotes: 0,
    };

    const [forumForm, setForumform] = React.useState<IThreadInfo>(initialFormState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name);
        setForumform({ ...forumForm, [name]: value });
    };

    React.useEffect(() => {
        let mounted = true;
        ForumThreadService.getAllThreads().then((fetchedForumThread) => {
            if (mounted && fetchedForumThread) {
                setForumThreads(fetchedForumThread.data);
            }
        });
        return () => {
            mounted = false;
        };
    }, [forumThreads.length]);

    return (
        <Stack spacing={2}>
            <ThreadList forumThreads={forumThreads} />
            <Fab color="primary" aria-label="add" variant="extended" size="medium" onClick={handleClickOpen}>
                <AddIcon />
                Add new thread
            </Fab>
            <Dialog
                fullScreen
                open={openThreadForm}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: "#212B36",
                    },
                }}
            >
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
            <NoUsernameAlertDialog open={noUsernameAlert} handleClose={handleCloseNoUsernameAlert} />
        </Stack>
    );
};

export default Home;
