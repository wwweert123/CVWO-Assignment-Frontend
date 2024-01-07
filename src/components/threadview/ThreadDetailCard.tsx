import { IThreadInfo } from "../../types/ForumThread";
import React from "react";
import { Card, Typography, Divider, CardContent } from "@mui/material";

type Props = {
    thread: IThreadInfo;
};

const ThreadDetailCard: React.FC<Props> = ({ thread }) => {
    return (
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
    );
};

export default ThreadDetailCard;
