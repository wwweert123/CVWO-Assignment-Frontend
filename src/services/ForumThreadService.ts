import http from "../http-common";
import {
    CreateThreadResponse,
    GetAllThreadsResponse,
    IForumThread,
    IThreadInfo,
    GetSingleThreadResponse,
} from "../type/ForumThread";

const getAllThreads = async () => {
    try {
        const { data, status } = await http.get<GetAllThreadsResponse>("/forum_threads");
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getSingleThread = async (id: string) => {
    try {
        const { data, status } = await http.get<GetSingleThreadResponse>(`/forum_threads/${id}`);
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const createNewThread = async (bodydata: IThreadInfo) => {
    try {
        const { data, status } = await http.post<CreateThreadResponse>("/forum_threads", bodydata);
        console.log(status);
        return data.data as IForumThread;
    } catch (error) {
        console.log(error);
    }
};

const ForumThreadService = {
    getAllThreads,
    createNewThread,
    getSingleThread,
};

export default ForumThreadService;
