import { Dialog, DialogContent, DialogContentText, TextField, DialogActions, DialogTitle, Button } from "@mui/material";
import React from "react";

type Props = {
    openCommentForm: boolean;
    handleClose: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmitNewComment: () => void;
    commentText: string;
};

const CommentInputForm: React.FC<Props> = ({
    openCommentForm,
    handleClose,
    handleInputChange,
    handleSubmitNewComment,
    commentText,
}) => {
    return (
        // <Dialog fullScreen open={openThreadForm} onClose={handleClose}>
        <Dialog
            open={openCommentForm}
            onClose={handleClose}
            PaperProps={{
                style: {
                    backgroundColor: "#212B36",
                },
            }}
        >
            <DialogTitle>Add your comments!</DialogTitle>
            <DialogContent>
                <DialogContentText>Your name will be displayed together with your comment</DialogContentText>
                <TextField
                    multiline
                    rows={10}
                    margin="dense"
                    id="name"
                    label="Comment"
                    name="comment"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={commentText}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmitNewComment}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommentInputForm;
