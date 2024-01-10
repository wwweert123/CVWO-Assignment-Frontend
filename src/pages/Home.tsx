import ThreadList from "../components/home/ThreadList";
import NewThreadForm from "../components/home/NewThreadForm";
import ForumThreadService from "../services/ForumThreadService";
import NoUsernameAlertDialog from "../components/misc/NoUsernameAlertDialog";
import { IForumThread, INewThreadInfo } from "../types/ForumThread";
import useAuth from "../hooks/useAuth";
import React from "react";

import { Fab, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const initialFormState = {
    title: "",
    description: "",
    author_id: undefined,
};

const Home: React.FC = () => {
    const { auth } = useAuth(); // authentication informations

    // for displaying threads list
    const [forumThreads, setForumThreads] = React.useState<IForumThread[]>([]);

    // for opening new thread form component
    const [openThreadForm, setOpenThreadForm] = React.useState(false);
    const handleClickOpen = () => {
        setOpenThreadForm(true);
    };
    const handleClose = () => {
        setOpenThreadForm(false);
    };

    // for setting new thread details
    const [forumForm, setForumform] = React.useState<INewThreadInfo>(initialFormState);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name);
        setForumform({ ...forumForm, [name]: value });
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

    // for opening no username alert
    const [noUsernameAlert, setNoUsernameAlert] = React.useState(false);
    const handleOpenNoUsernameAlert = () => {
        setNoUsernameAlert(true);
    };
    const handleCloseNoUsernameAlert = () => {
        setNoUsernameAlert(false);
    };

    // for fetching thread list
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
            <Fab
                color="primary"
                aria-label="add"
                variant="extended"
                size="medium"
                onClick={handleClickOpen}
                sx={{ position: "absolute", bottom: 20, right: 20 }}
            >
                <AddIcon />
                Add new thread
            </Fab>
            <NewThreadForm
                openThreadForm={openThreadForm}
                handleClose={handleClose}
                forumForm={forumForm}
                handleInputChange={handleInputChange}
                handleSubmitNewThread={handleSubmitNewThread}
            />
            <NoUsernameAlertDialog open={noUsernameAlert} handleClose={handleCloseNoUsernameAlert} />
        </Stack>
    );
};

export default Home;
