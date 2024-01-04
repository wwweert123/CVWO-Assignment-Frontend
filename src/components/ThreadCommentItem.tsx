import { ICommentInfo } from "../type/ForumThread";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
    comment: ICommentInfo;
};
const useStyles = makeStyles(() => ({
    commentBody: {
        fontSize: 16,
        whiteSpace: "pre-wrap",
        paddingBottom: "1em",
    },
    commentCard: {
        marginBottom: "1em",
    },
    metadata: {
        fontSize: 14,
    },
}));

const CommentItem: React.FC<Props> = ({ comment }) => {
    const classes = useStyles();
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
                <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                    {comment.attributes.text}
                </Typography>
                <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                    {"Posted by " + comment.attributes.author?.name + " on "}
                    {comment.attributes?.created_at
                        ? new Date(Date.parse(comment.attributes?.created_at)).toLocaleString()
                        : ""}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CommentItem;
