import "../App.css";
import { IForumThread } from "../type/ForumThread";

import React from "react";
import { Link } from "react-router-dom";

import { Table, TableContainer, TableBody, TableCell, TableRow, Typography, Button } from "@mui/material";

type Props = {
    forumThreads: IForumThread[];
};

const ThreadList: React.FC<Props> = ({ forumThreads }: Props) => {
    return (
        <>
            <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
                <h4>{"Welcome to my forum! Take a look!"}</h4>
                <ul>
                    <li>
                        <Link to="/thread/1">{"Inspirational Quotes"}</Link>
                        {" by Aiken"}
                    </li>
                </ul>
            </div>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {forumThreads.map((forumThread) => (
                            <TableRow key={forumThread.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="h6">{forumThread.attributes.title}</Typography>
                                    <Typography variant="subtitle1">{forumThread.attributes.description}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained">
                                        <Link
                                            to={"/forum_threads/${forumThread.id`}"}
                                            style={{ textDecoration: "none" }}
                                        >
                                            View Thread
                                        </Link>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">{forumThread.attributes.upvotes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ThreadList;
