import ThreadTaggingComponent from "./ThreadTaggingComponent";
import ForumThreadService from "../../services/ForumThreadService";
import useAuth from "../../hooks/useAuth";
import { IForumThread, INewThreadInfo } from "../../types/ForumThread";
import React from "react";

import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Dialog } from "@mui/material";

type Props = {
    openThreadForm: boolean;
    handleClose: () => void;
    handleOpenNoUsernameAlert: () => void;
    handleSetForumThreads: (threads: IForumThread) => void;
};

const initialFormState = {
    title: "",
    description: "",
    author_id: undefined,
    tag_list: "",
};

type ITag = {
    key: number;
    label: string;
};

const NewThreadForm: React.FC<Props> = ({
    openThreadForm,
    handleClose,
    handleOpenNoUsernameAlert,
    handleSetForumThreads,
}) => {
    const { auth } = useAuth(); // authentication informations

    // for setting new thread details
    const [forumForm, setForumform] = React.useState<INewThreadInfo>(initialFormState);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name);
        setForumform({ ...forumForm, [name]: value });
    };

    const handleSubmitNewThread = () => {
        if (auth.author == "") {
            handleClose();
            console.log("No username found");
            handleOpenNoUsernameAlert();
            return;
        }
        let tag_list = "";
        for (const tag of tags) {
            tag_list += tag.label + ",";
        }
        const data = {
            title: forumForm.title,
            description: forumForm.description,
            author_id: auth.id,
            tag_list: tag_list,
        };
        ForumThreadService.createNewThread(data).then((response) => {
            if (response) {
                handleSetForumThreads(response);
            }
        });
        setForumform(initialFormState);
        setTags([]);
        handleClose();
    };

    const [tags, setTags] = React.useState<ITag[]>([]);

    const handleDelete = (tagToDelete: ITag) => {
        console.log(tagToDelete.key);
        setTags((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
    };

    // const handleAddition = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key !== "Enter") {
    //         return;
    //     }
    //     const tagToInsert = {
    //         key: tags.length + 1,
    //         label: newTag,
    //     };
    //     setTags([...tags, tagToInsert]);
    //     setNewTag("");
    // };

    const handleSelectAddition = (event: object, value: { label: string } | null) => {
        if (value === null) {
            return;
        }
        const tagToInsert = {
            key: tags.length + 1,
            label: value.label,
        };
        setTags([...tags, tagToInsert]);
    };

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
                <ThreadTaggingComponent
                    tags={tags}
                    handleDelete={handleDelete}
                    handleSelectAddition={handleSelectAddition}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmitNewThread}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewThreadForm;
