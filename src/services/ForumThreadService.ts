import http from "../http-common";
import { IForumThread } from "../type/ForumThread";

const getAllThreads = () => {
    return http.get<Array<IForumThread>>("/forum_threads").then((response) => response.data);
};

const createNewThread = (data: IForumThread) => {
    return http.post<IForumThread>("/forum_threads", data);
};

const ForumThreadService = {
    getAllThreads,
    createNewThread,
};

export default ForumThreadService;
