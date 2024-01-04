import { ICommentInfo, IThreadInfo } from "../type/ForumThread";
import ForumThreadService from "../services/ForumThreadService";
import CommentInputForm from "../components/CommentInputForm";
import ThreadCommentList from "../components/ThreadCommentList";
import NoUsernameAlertDialog from "../components/NoUsernameAlertDialog";
import useAuth from "../hooks/useAuth";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Stack, Typography, Divider, Button, CardContent } from "@mui/material";

const ThreadView: React.FC = () => {
    const initialFormState = {
        title: "",
        description: "",
        upvotes: 0,
        created_at: undefined,
        author: undefined,
    };

    const { auth } = useAuth();

    const [thread, setThread] = useState<IThreadInfo>(initialFormState);
    const [commentArr, setCommentArr] = useState<ICommentInfo[]>([]);

    const thread_id = useParams<{ id?: string }>().id;

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

    const [noUsernameAlert, setNoUsernameAlert] = React.useState(false);

    const handleOpenNoUsernameAlert = () => {
        setNoUsernameAlert(true);
    };

    const handleCloseNoUsernameAlert = () => {
        setNoUsernameAlert(false);
    };

    const handleSubmitNewComment = () => {
        if (auth.author == "") {
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
            author_id: auth.id,
            author: undefined,
            created_at: undefined,
        };
        ForumThreadService.createNewComment(data).then((resp) => {
            if (resp) {
                setCommentArr([...commentArr, resp.data]);
            }
        });
        setCommentText("");
        setOpenCommentForm(false);
    };

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
                <Card
                    sx={{
                        py: 5,
                        boxShadow: 0,
                        textAlign: "left",
                        color: (theme) => theme.palette["primary"].contrastText,
                        bgcolor: (theme) => theme.palette.grey[800],
                        // bgcolor: "grey",
                        // ...sx,
                    }}
                >
                    <CardContent>
                        <Typography variant="h5">{thread.title}</Typography>
                        <Divider />
                        <Typography variant="subtitle1">{thread.description}</Typography>
                        <Typography>{thread.upvotes + " Upvotes"}</Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {"Posted by " + thread.author?.name + " on "}
                            {thread.created_at ? new Date(Date.parse(thread.created_at)).toLocaleString() : ""}
                        </Typography>
                    </CardContent>
                </Card>
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
