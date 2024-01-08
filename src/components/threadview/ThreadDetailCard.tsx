import VotingComponent from "./VotingComponent";
import { IThreadInfo } from "../../types/ForumThread";
import React from "react";
import { Card, Typography, Divider, CardContent, Grid } from "@mui/material";

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
                <Grid container spacing={2} sx={{ padding: "1rem" }}>
                    <Grid xs={10}>
                        <Typography variant="subtitle1">{thread.description}</Typography>
                    </Grid>
                    <Grid xs={2}>
                        <VotingComponent />
                    </Grid>
                </Grid>
                <Typography color="textSecondary" gutterBottom>
                    {"Posted by " + thread.author?.name + " on "}
                    {thread.created_at ? new Date(Date.parse(thread.created_at)).toLocaleString() : ""}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ThreadDetailCard;
