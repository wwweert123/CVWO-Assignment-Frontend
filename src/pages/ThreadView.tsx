import { IThreadInfo } from "../type/ForumThread";
import ForumThreadService from "../services/ForumThreadService";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Stack, Typography, Divider } from "@mui/material";

const ThreadView: React.FC = () => {
    const initialFormState = {
        title: "",
        description: "",
        upvotes: 0,
    };
    const [thread, setThread] = useState<IThreadInfo>(initialFormState);
    // const [newComment, setNewComment] = useState("");
    const id = useParams<{ id?: string }>();

    useEffect(() => {
        console.log(id);
        let mounted = true;
        if (id.id) {
            ForumThreadService.getSingleThread(id.id).then((fetchedForumThread) => {
                if (mounted && fetchedForumThread) {
                    setThread(fetchedForumThread.data.attributes);
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
                        // color: (theme) => theme.palette[color].contrastText,
                        // bgcolor: (theme) => theme.palette.grey[800],
                        // bgcolor: "grey",
                        // ...sx,
                    }}
                >
                    <Typography variant="h5">{thread.title}</Typography>
                    <Divider />
                    <Typography variant="subtitle1">{thread.description}</Typography>
                    <Typography>{thread.upvotes}</Typography>
                </Card>
            </Stack>
        </Container>
    );
};

export default ThreadView;
