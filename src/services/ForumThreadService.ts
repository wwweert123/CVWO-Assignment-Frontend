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
    LikeStatusInfoComment,
    LikeActionInfoComment,
    AuthorCommentsResponse,
} from "../types/ForumThread";
// eslint-disable-next-line import/named
import { AxiosInstance } from "axios";

const getThreads = async (tag_topic: string | undefined, sort_by: string) => {
    try {
        const { data, status } = await http.get<GetAllThreadsResponse>("/forum_threads", {
            params: tag_topic ? { tag_topic: tag_topic, sort_by: sort_by } : { sort_by: sort_by },
        });
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

const createNewThread = async (bodydata: INewThreadInfo, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.post<CreateThreadResponse>("/forum_threads", bodydata);
        console.log(status);
        return data.data as IForumThread;
    } catch (error) {
        console.log(error);
    }
};

const createNewComment = async (bodydata: INewComment, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.post<CreateCommentResponse>("/comments", bodydata);
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const createNewAuthor = async (username: string, password: string) => {
    const bodydata = {
        name: username,
        password: password,
    };
    try {
        const { data, status } = await http.post<CreateAuthorResponse>("authors", bodydata);
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getThreadLikesStatus = async (bodydata: LikeStatusInfo, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.get<LikeStatusData>(
            `/forum_threads/${bodydata.forum_id}/likestatus`,
            {},
        );
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateLikeAction = async (bodydata: LikeActionInfo, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.put<LikeStatusData>(
            `/forum_threads/${bodydata.forum_id}/like`,
            bodydata,
        );
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getCommentLikeStatus = async (bodydata: LikeStatusInfoComment, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.get<LikeStatusData>(
            `/comments/${bodydata.comment_id}/likestatus`,
            {},
        );
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateLikeActionComment = async (bodydata: LikeActionInfoComment, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.put<LikeStatusData>(
            `/comments/${bodydata.comment_id}/like`,
            bodydata,
        );
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getAuthorThreads = async (sort_by: string, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.get<GetAllThreadsResponse>(`/authors/forum_threads`, {
            params: { sort_by: sort_by },
        });
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getAuthorComments = async (sort_by: string, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.get<AuthorCommentsResponse>(`/authors/comments`, {
            params: { sort_by: sort_by },
        });
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const deleteComment = async (comment_id: number, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.delete(`/comments/${comment_id}`);
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const deleteThread = async (forum_thread_id: number, axiosPrivate: AxiosInstance) => {
    try {
        const { data, status } = await axiosPrivate.delete(`/forum_threads/${forum_thread_id}`);
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const ForumThreadService = {
    getThreads,
    createNewThread,
    getSingleThread,
    createNewComment,
    createNewAuthor,
    getThreadLikesStatus,
    updateLikeAction,
    getCommentLikeStatus,
    updateLikeActionComment,
    getAuthorThreads,
    getAuthorComments,
    deleteComment,
    deleteThread,
};

export default ForumThreadService;
