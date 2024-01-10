import { IForumThread } from "../../types/ForumThread";

import React from "react";
import { Link } from "react-router-dom";

import { Table, TableContainer, TableBody, TableCell, TableRow, Typography, Button, Stack, Chip } from "@mui/material";

type Props = {
    forumThreads: IForumThread[];
};

const ThreadList: React.FC<Props> = ({ forumThreads }: Props) => {
    return (
        <Stack spacing={2}>
            <Typography variant="h6">{"Welcome to my forum! Take a look!"}</Typography>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {forumThreads.map((forumThread) => (
                            <TableRow key={forumThread.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="h6">{forumThread.attributes.title}</Typography>
                                    <Typography variant="subtitle1">{forumThread.attributes.description}</Typography>
                                    <Typography variant="subtitle2">
                                        {"Posted by on "}
                                        {forumThread.attributes.created_at
                                            ? new Date(Date.parse(forumThread.attributes.created_at)).toLocaleString()
                                            : ""}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    {forumThread.relationships.comments.data.length} comments
                                </TableCell>
                                <TableCell align="right">
                                    {forumThread.attributes.tags.map((tag) => (
                                        <Chip key={tag.id} label={tag.name} sx={{ margin: "0.2rem" }} />
                                    ))}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained">
                                        <Link
                                            to={`/forum_threads/${forumThread.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            View Thread
                                        </Link>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    {forumThread.attributes.cached_weighted_score} upvotes
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default ThreadList;
