import ThreadList from "../components/home/ThreadList";
import NewThreadForm from "../components/home/NewThreadForm";
import ForumThreadService from "../services/ForumThreadService";
import NoUsernameAlertDialog from "../components/misc/NoUsernameAlertDialog";
import { IForumThread } from "../types/ForumThread";
import React from "react";

import { Fab, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Home: React.FC = () => {
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

    // for opening no username alert
    const [noUsernameAlert, setNoUsernameAlert] = React.useState(false);
    const handleOpenNoUsernameAlert = () => {
        setNoUsernameAlert(true);
    };
    const handleCloseNoUsernameAlert = () => {
        setNoUsernameAlert(false);
    };

    const handleSetForumThreads = (newThread: IForumThread) => {
        setForumThreads([...forumThreads, newThread]);
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
                handleOpenNoUsernameAlert={handleOpenNoUsernameAlert}
                handleSetForumThreads={handleSetForumThreads}
            />
            <NoUsernameAlertDialog open={noUsernameAlert} handleClose={handleCloseNoUsernameAlert} />
        </Stack>
    );
};

export default Home;
