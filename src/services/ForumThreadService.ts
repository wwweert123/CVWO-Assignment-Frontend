import http from "../http-common";
import {
    CreateThreadResponse,
    GetAllThreadsResponse,
    IForumThread,
    GetSingleThreadResponse,
    CreateCommentResponse,
    CreateAuthorResponse,
    INewThreadInfo,
    INewComment,
    LikeStatusInfo,
    LikeStatusData,
    LikeActionInfo,
} from "../types/ForumThread";

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

const createNewThread = async (bodydata: INewThreadInfo) => {
    try {
        const { data, status } = await http.post<CreateThreadResponse>("/forum_threads", bodydata);
        console.log(status);
        return data.data as IForumThread;
    } catch (error) {
        console.log(error);
    }
};

const createNewComment = async (bodydata: INewComment) => {
    try {
        const { data, status } = await http.post<CreateCommentResponse>("/comments", bodydata);
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const createNewAuthor = async (username: string) => {
    const bodydata = {
        name: username,
    };
    try {
        const { data, status } = await http.post<CreateAuthorResponse>("authors", bodydata);
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getThreadLikesStatus = async (bodydata: LikeStatusInfo) => {
    try {
        const { data, status } = await http.get<LikeStatusData>(`/forum_threads/${bodydata.forum_id}/likestatus`);
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateLikeAction = async (bodydata: LikeActionInfo) => {
    try {
        const { data, status } = await http.put<LikeStatusData>(`/forum_threads/${bodydata.forum_id}/like`, bodydata);
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const ForumThreadService = {
    getAllThreads,
    createNewThread,
    getSingleThread,
    createNewComment,
    createNewAuthor,
    getThreadLikesStatus,
    updateLikeAction,
};

export default ForumThreadService;
