import { IForumThread, tagsType } from "../../types/ForumThread";

import React from "react";
import { Link } from "react-router-dom";

import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Button,
    Stack,
    Chip,
    Box,
    Tabs,
    Tab,
} from "@mui/material";
import { brown, deepOrange, green, lime, purple, red, blue } from "@mui/material/colors";

type Props = {
    forumThreads: IForumThread[];
    tabValue: number;
    handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
    title_mapping: tagsType | "myThreads" | "myComments" | undefined;
};

const CHIP_COLOURS = {
    sports: blue[800],
    gaming: red[800],
    news: deepOrange[700],
    fashion: lime[900],
    films: brown[800],
    trending: green[800],
    music: purple[800],
};

const THREADLIST_TITLE = {
    myThreads: "All your threads in one place",
    myComments: "All your comments in one place",
    sports: "Dont miss out on all the sporting action!",
    gaming: "Dive into the gaming dimension!",
    news: "Stay informed!",
    fashion: "Learn the newest fashion trends!",
    films: "Talk about theh latest blockbusters!",
    trending: "Stay on top of latest trends!",
    music: "Don't miss a beat!",
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ThreadList: React.FC<Props> = ({ forumThreads, tabValue, handleChangeTab, title_mapping }: Props) => {
    return (
        <Stack spacing={2}>
            <Typography variant="h6">
                {title_mapping ? THREADLIST_TITLE[title_mapping] : "Welcome to my forum! Do take a look!"}
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleChangeTab} aria-label="sorting tab">
                    <Tab label="Newest" {...a11yProps(0)} />
                    <Tab label="Hottest" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {forumThreads.map((forumThread) => (
                            <TableRow key={forumThread.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="h6">{forumThread.attributes.title}</Typography>
                                    <Typography variant="subtitle1">{forumThread.attributes.description}</Typography>
                                    <Typography variant="subtitle2">
                                        {"Posted on "}
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
                                        <Chip
                                            key={tag.id}
                                            label={tag.name}
                                            sx={{
                                                margin: "0.2rem",
                                            }}
                                            style={{
                                                backgroundColor: CHIP_COLOURS[tag.name as tagsType],
                                            }}
                                        />
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
