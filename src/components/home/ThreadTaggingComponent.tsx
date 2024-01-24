import React from "react";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Collapse, Stack, TextField, Autocomplete } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

type ITag = {
    label: string;
};

type Props = {
    tags: ITag[];
    handleDelete: (tagToDelete: ITag) => void;
    handleSelectAddition: (event: object, value: { label: string } | null) => void;
};

const tagsOptions = [
    {
        label: "sports",
    },
    {
        label: "gaming",
    },
    {
        label: "news",
    },
    {
        label: "fashion",
    },
    {
        label: "films",
    },
    {
        label: "trending",
    },
    {
        label: "music",
    },
];

const ThreadTaggingComponent: React.FC<Props> = ({ tags, handleDelete, handleSelectAddition }) => {
    return (
        <Stack spacing={2} direction="row" alignItems="center">
            <Autocomplete
                disablePortal
                id="tag-select"
                // options={tagsOptions}
                options={tagsOptions.filter((tagOption) => {
                    let added = false;
                    tags.forEach((tag) => (added = tag.label === tagOption.label ? true : added));
                    return !added;
                })}
                sx={{ width: 300 }}
                ListboxProps={{
                    sx: {
                        backgroundColor: (theme) => theme.palette.background.default,
                    },
                }}
                renderInput={(params) => <TextField {...params} label="Tags" />}
                onChange={handleSelectAddition}
            />
            <TransitionGroup style={{ display: "flex" }}>
                {tags.map((data, id) => {
                    return (
                        <Collapse key={id}>
                            <ListItem key={id}>
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
