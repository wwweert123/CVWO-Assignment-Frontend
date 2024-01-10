import ThreadTaggingComponent from "./ThreadTaggingComponent";
import { INewThreadInfo } from "../../types/ForumThread";
import React from "react";

import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Dialog } from "@mui/material";

type Props = {
    openThreadForm: boolean;
    handleClose: () => void;
    forumForm: INewThreadInfo;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitNewThread: () => void;
};

const NewThreadForm: React.FC<Props> = ({
    openThreadForm,
    handleClose,
    forumForm,
    handleInputChange,
    handleSubmitNewThread,
}) => {
    return (
        <Dialog
            fullScreen
            open={openThreadForm}
            onClose={handleClose}
            PaperProps={{
                style: {
                    backgroundColor: "#212B36",
                },
            }}
        >
            <DialogTitle>Create a new thread!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Talk about anything you want! Share with others whatever you want to share about!
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title"
                    name="title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={forumForm.title}
                    onChange={handleInputChange}
                />

                <TextField
                    multiline
                    rows={10}
                    margin="dense"
                    id="name"
                    label="Description"
                    name="description"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={forumForm.description}
                    onChange={handleInputChange}
                />
                <ThreadTaggingComponent />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmitNewThread}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewThreadForm;
