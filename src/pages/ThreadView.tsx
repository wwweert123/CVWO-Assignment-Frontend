import ThreadDetailCard from "../components/threadview/ThreadDetailCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ICommentInfo, IThreadInfo } from "../types/ForumThread";
import ForumThreadService from "../services/ForumThreadService";
import CommentInputForm from "../components/threadview/CommentInputForm";
import ThreadCommentList from "../components/threadview/ThreadCommentList";
import NoUsernameAlertDialog from "../components/misc/NoUsernameAlertDialog";
import useAuth from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Stack, Button } from "@mui/material";

const initialFormState = {
    title: "",
    description: "",
    upvotes: 0,
    created_at: undefined,
    author: undefined,
    cached_weighted_score: 0,
    tags: [],
};

const ThreadView: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();

    const { auth } = useAuth();

    const thread_id = useParams<{ id?: string }>().id;

    const [thread, setThread] = useState<IThreadInfo>(initialFormState);
    const [commentArr, setCommentArr] = useState<ICommentInfo[]>([]);

    // For comment form
    const [openCommentForm, setOpenCommentForm] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>("");
    const handleOpenForm = () => {
        setOpenCommentForm(true);
    };
    const handleClose = () => {
        setOpenCommentForm(false);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setCommentText(value);
    };

    const handleSubmitNewComment = () => {
        if (auth.author == "" || !auth.accessToken) {
            handleClose();
            console.log("No username found");
            handleOpenNoUsernameAlert();
            return;
        }
        if (!thread_id) {
            return;
        }
        const data = {
            text: commentText,
            forum_thread_id: +thread_id,
        };
        ForumThreadService.createNewComment(data, axiosPrivate).then((resp) => {
            if (resp) {
                setCommentArr([...commentArr, resp.data]);
            }
        });
        setCommentText("");
        setOpenCommentForm(false);
    };

    // For no username alert
    const [noUsernameAlert, setNoUsernameAlert] = React.useState(false);
    const handleOpenNoUsernameAlert = () => {
        setNoUsernameAlert(true);
    };
    const handleCloseNoUsernameAlert = () => {
        setNoUsernameAlert(false);
    };

    // For fetching thread and comments
    useEffect(() => {
        console.log(thread_id);
        let mounted = true;
        if (thread_id) {
            ForumThreadService.getSingleThread(thread_id).then((fetchedForumThread) => {
                if (mounted && fetchedForumThread) {
                    setThread(fetchedForumThread.data.attributes);
                    setCommentArr(fetchedForumThread.included);
                }
            });
        }
        return () => {
            mounted = false;
        };
    }, []);
    return (
        <Container>
            <Stack spacing={2}>
                <ThreadDetailCard thread={thread} />
                <Button variant="contained" onClick={handleOpenForm}>
                    Add Comment
                </Button>
                <ThreadCommentList commentArr={commentArr} />
            </Stack>
            <Link to="/">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
            <CommentInputForm
                openCommentForm={openCommentForm}
                handleClose={handleClose}
                handleInputChange={handleInputChange}
                handleSubmitNewComment={handleSubmitNewComment}
                commentText={commentText}
            />
            <NoUsernameAlertDialog open={noUsernameAlert} handleClose={handleCloseNoUsernameAlert} />
        </Container>
    );
};

export default ThreadView;
