import ForumThreadService from "../../services/ForumThreadService";
import NoUsernameAlertDialog from "../misc/NoUsernameAlertDialog";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
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

const ThreadVotingComponent: React.FC = () => {
    const axiosPrivate = useAxiosPrivate();

    const { auth } = useAuth();

    const forum_id = useParams<{ id?: string }>().id;

    const [threadLikeStatus, setThreadLikeStatus] = React.useState<LikeStatusData>(initialLikeState);
    const fetchLikeStatus = () => {
        if (!forum_id) {
            return;
        }
        const bodydata = {
            forum_id: +forum_id,
        };
        ForumThreadService.getThreadLikesStatus(bodydata, axiosPrivate).then((response) => {
            if (response) {
                setThreadLikeStatus(response);
            }
        });
    };

    const handleClickedDislike = () => {
        if (!forum_id) {
            return;
        }
        const bodydata = {
            forum_id: +forum_id,
            user_action: threadLikeStatus.disliked ? "undislike" : "dislike",
        };
        ForumThreadService.updateLikeAction(bodydata, axiosPrivate).then((response) => {
            if (response) {
                setThreadLikeStatus(response);
            }
        });
    };

    const handleClickedLike = () => {
        if (!auth.accessToken) {
            handleOpenNoUsernameAlert();
            return;
        }
        if (!forum_id) {
            return;
        }
        const bodydata = {
            forum_id: +forum_id,
            user_action: threadLikeStatus.liked ? "unlike" : "like",
        };
        ForumThreadService.updateLikeAction(bodydata, axiosPrivate).then((response) => {
            if (response) {
                setThreadLikeStatus(response);
            }
        });
    };

    // For no username alert
    const [noUsernameAlert, setNoUsernameAlert] = React.useState(false);
    const handleOpenNoUsernameAlert = () => {
        setNoUsernameAlert(true);
    };
    const handleCloseNoUsernameAlert = () => {
        setNoUsernameAlert(false);
    };

    React.useEffect(() => {
        fetchLikeStatus();
    }, [auth.author]);
    return (
        <>
            <IconButton
                aria-labe="like"
                onClick={handleClickedLike}
                color={threadLikeStatus.liked ? "success" : "default"}
            >
                <ThumbUpIcon />
            </IconButton>
            <Typography>{threadLikeStatus.tally + " Upvotes"}</Typography>
            <IconButton
                aria-labe="dislike"
                onClick={handleClickedDislike}
                color={threadLikeStatus.disliked ? "error" : "default"}
            >
                <ThumbDownIcon />
            </IconButton>
            <NoUsernameAlertDialog open={noUsernameAlert} handleClose={handleCloseNoUsernameAlert} />
        </>
    );
};

export default ThreadVotingComponent;
