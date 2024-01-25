import { ICommentInfo } from "../../types/ForumThread";
import useAuth from "../../hooks/useAuth";
import ForumThreadService from "../../services/ForumThreadService";

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
    Box,
    Tabs,
    Tab,
} from "@mui/material";

type Props = {
    tabValue: 0 | 1;
    handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const SORT_MAPPING = {
    0: "created_at",
    1: "cached_weighted_score",
};

const CommentListHome: React.FC<Props> = ({ tabValue, handleChangeTab }: Props) => {
    const { auth } = useAuth();

    const [commentList, setCommentList] = React.useState<ICommentInfo[]>([]);

    React.useEffect(() => {
        let mounted = true;
        if (auth.accessToken) {
            ForumThreadService.getAuthorComments(SORT_MAPPING[tabValue]).then((fetchedForumThread) => {
                if (mounted && fetchedForumThread) {
                    setCommentList(fetchedForumThread.data);
                }
            });
        }
        return () => {
            mounted = false;
        };
    }, [tabValue, auth]);
    return (
        <Stack spacing={2}>
            <Typography variant="h6">{"All your comments in one place"}</Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleChangeTab} aria-label="sorting tab">
                    <Tab label="Newest" {...a11yProps(0)} />
                    <Tab label="Hottest" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {commentList.map((comment) => (
                            <TableRow key={comment.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="subtitle1">{comment.attributes.text}</Typography>
                                    <Typography variant="subtitle2">
                                        {"commented on post: "}
                                        {comment.attributes.forum_thread.title}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        {"Posted on "}
                                        {comment.attributes.created_at
                                            ? new Date(Date.parse(comment.attributes.created_at)).toLocaleString()
                                            : ""}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained">
                                        <Link
                                            to={`/forum_threads/${comment.attributes.forum_thread.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            View Thread
                                        </Link>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">{comment.attributes.cached_weighted_score} upvotes</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default CommentListHome;
