import ForumThreadService from "../../services/ForumThreadService";
import NoUsernameAlertDialog from "../misc/NoUsernameAlertDialog";
import useAuth from "../../hooks/useAuth";
import { ICommentInfo, LikeStatusData } from "../../types/ForumThread";
import React from "react";
import { Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const initialLikeState = {
    liked: false,
    disliked: false,
    tally: 0,
};

type Props = {
    comment: ICommentInfo;
};

const CommentVotingComponent: React.FC<Props> = ({ comment }) => {
    const { auth } = useAuth();

    const [commentLikeStatus, setCommentLikeStatus] = React.useState<LikeStatusData>(initialLikeState);
    const fetchLikeStatus = () => {
        const bodydata = {
            author_id: auth.id ? auth.id : 0,
            comment_id: comment.id,
        };
        ForumThreadService.getCommentLikeStatus(bodydata).then((response) => {
            if (response) {
                setCommentLikeStatus(response);
            }
        });
    };

    const handleClickedDislike = () => {
        const bodydata = {
            author_id: auth.id ? auth.id : 0,
            comment_id: comment.id,
            user_action: commentLikeStatus.disliked ? "undislike" : "dislike",
        };
        ForumThreadService.updateLikeActionComment(bodydata).then((response) => {
            if (response) {
                setCommentLikeStatus(response);
            }
        });
    };

    const handleClickedLike = () => {
        if (!auth.id) {
            handleOpenNoUsernameAlert();
            return;
        }
        const bodydata = {
            author_id: auth.id ? auth.id : 0,
            comment_id: comment.id,
            user_action: commentLikeStatus.liked ? "unlike" : "like",
        };
        ForumThreadService.updateLikeActionComment(bodydata).then((response) => {
            if (response) {
                setCommentLikeStatus(response);
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
    }, [auth.id]);
    return (
        <>
            <IconButton
                aria-labe="like"
                onClick={handleClickedLike}
                color={commentLikeStatus.liked ? "success" : "default"}
            >
                <ThumbUpIcon />
            </IconButton>
            <Typography>{commentLikeStatus.tally + " Upvotes"}</Typography>
            <IconButton
                aria-labe="dislike"
                onClick={handleClickedDislike}
                color={commentLikeStatus.disliked ? "error" : "default"}
            >
                <ThumbDownIcon />
            </IconButton>
            <NoUsernameAlertDialog open={noUsernameAlert} handleClose={handleCloseNoUsernameAlert} />
        </>
    );
};

export default CommentVotingComponent;
