import ForumThreadService from "../../services/ForumThreadService";
import useAuth from "../../hooks/useAuth";
import { LikeStatusData } from "../../types/ForumThread";
import React from "react";
import { Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useParams } from "react-router-dom";

const initialLikeState = {
    liked: false,
    disliked: false,
    tally: 0,
};

const VotingComponent: React.FC = () => {
    const { auth } = useAuth();

    const forum_id = useParams<{ id?: string }>().id;

    const [threadLikeStatus, setThreadLikeStatus] = React.useState<LikeStatusData>(initialLikeState);
    const fetchLikeStatus = () => {
        if (!forum_id) {
            return;
        }
        const bodydata = {
            author_id: auth.id ? auth.id : 0,
            forum_id: +forum_id,
        };
        ForumThreadService.getThreadLikesStatus(bodydata).then((response) => {
            if (response) {
                setThreadLikeStatus(response);
            }
        });
    };

    React.useEffect(() => {
        fetchLikeStatus();
    }, []);
    return (
        <>
            <IconButton aria-labe="like">
                <ThumbUpIcon />
            </IconButton>
            <Typography>{threadLikeStatus.tally + " Upvotes"}</Typography>
            <IconButton aria-labe="dislike">
                <ThumbDownIcon />
            </IconButton>
        </>
    );
};

export default VotingComponent;
