import ThreadList from "../components/home/ThreadList";
import NewThreadForm from "../components/home/NewThreadForm";
import ForumThreadService from "../services/ForumThreadService";
import NoUsernameAlertDialog from "../components/misc/NoUsernameAlertDialog";
import useAuth from "../hooks/useAuth";
import { IForumThread, tagsType } from "../types/ForumThread";
import CommentListHome from "../components/home/CommentListHome";
import React from "react";

import { Fab, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";

const SORT_MAPPING = {
    0: "created_at",
    1: "cached_weighted_score",
};

const Home: React.FC = () => {
    const tag_topic = useParams<{ tag_topic?: tagsType | "myComments" | "myThreads" }>().tag_topic;
    const { auth } = useAuth();
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

    const [tabValue, setTabValue] = React.useState<0 | 1>(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue as 0 | 1);
    };

    // for fetching thread list
    React.useEffect(() => {
        let mounted = true;
        if (tag_topic === "myThreads" && auth.id) {
            ForumThreadService.getAuthorThreads(auth.id, SORT_MAPPING[tabValue]).then((fetchedForumThread) => {
                if (mounted && fetchedForumThread) {
                    setForumThreads(fetchedForumThread.data);
                }
            });
        } else {
            ForumThreadService.getThreads(tag_topic, SORT_MAPPING[tabValue]).then((fetchedForumThread) => {
                if (mounted && fetchedForumThread) {
                    setForumThreads(fetchedForumThread.data);
                }
            });
        }
        return () => {
            mounted = false;
        };
    }, [forumThreads.length, tag_topic, tabValue, auth]);

    return (
        <Stack spacing={2}>
            {tag_topic == "myComments" ? (
                <CommentListHome tabValue={tabValue} handleChangeTab={handleChangeTab} />
            ) : (
                <ThreadList
                    forumThreads={forumThreads}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                    title_mapping={tag_topic}
                />
            )}

            <Fab
                color="primary"
                aria-label="add"
                variant="extended"
                size="medium"
                onClick={handleClickOpen}
                sx={{ position: "fixed", bottom: 20, right: 20 }}
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
