import http from "../http-common";
import { IForumThread } from "../type/ForumThread";

const getAllThreads = () => {
    return http.get<Array<IForumThread>>("/forum_threads").then((response) => response.data);
};

const ForumThreadService = {
    getAllThreads,
};

export default ForumThreadService;
