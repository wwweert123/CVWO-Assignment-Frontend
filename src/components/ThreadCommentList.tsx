import ThreadCommentItem from "./ThreadCommentItem";
import { ICommentInfo } from "../type/ForumThread";
import React from "react";
import { Stack } from "@mui/material";

type Props = {
    commentArr: ICommentInfo[];
};

const ThreadCommentList: React.FC<Props> = ({ commentArr }) => {
    return (
        <Stack spacing={2}>
            {commentArr.map((comment) => (
                <ThreadCommentItem comment={comment} key="" />
            ))}
        </Stack>
    );
};

export default ThreadCommentList;
