import React from "react";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Collapse, Stack, TextField } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

type ITag = {
    key: number;
    label: string;
};

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

function ThreadTaggingComponent() {
    const [tags, setTags] = React.useState<ITag[]>([
        { key: 1, label: "Thailand" },
        { key: 2, label: "India" },
        { key: 3, label: "Vietnam" },
        { key: 4, label: "Turkey" },
    ]);

    const [newTag, setNewTag] = React.useState<string>("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name);
        setNewTag(value);
    };

    const handleDelete = (tagToDelete: ITag) => () => {
        setTags((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
    };

    const handleAddition = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") {
            return;
        }
        const tagToInsert = {
            key: tags.length + 1,
            label: newTag,
        };
        setTags([...tags, tagToInsert]);
    };

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
                                <Chip
                                    label={data.label}
                                    onDelete={data.label === "React" ? undefined : handleDelete(data)}
                                />
                            </ListItem>
                        </Collapse>
                    );
                })}
            </TransitionGroup>
        </Stack>
    );
}

export default ThreadTaggingComponent;
