import React from "react";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Collapse, Stack, TextField } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

type ITag = {
    key: number;
    label: string;
};

type Props = {
    tags: ITag[];
    newTag: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddition: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleDelete: (tagToDelete: ITag) => void;
};

const ThreadTaggingComponent: React.FC<Props> = ({ tags, newTag, handleInputChange, handleAddition, handleDelete }) => {
    return (
        <Stack spacing={2} direction="row" alignItems="center">
            <TextField
                margin="dense"
                id="tag"
                label="Add Tags"
                name="tag"
                type="text"
                variant="outlined"
                value={newTag}
                onChange={handleInputChange}
                onKeyDown={handleAddition}
            />
            <TransitionGroup style={{ display: "flex" }}>
                {tags.map((data) => {
                    return (
                        <Collapse key={data.key}>
                            <ListItem key={data.key}>
                                <Chip label={data.label} onDelete={() => handleDelete(data)} />
                            </ListItem>
                        </Collapse>
                    );
                })}
            </TransitionGroup>
        </Stack>
    );
};

export default ThreadTaggingComponent;
