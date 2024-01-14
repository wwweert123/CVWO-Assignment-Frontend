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
} from "../types/ForumThread";

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
        const { data, status } = await http.get<LikeStatusData>(`/forum_threads/${bodydata.forum_id}/likestatus`, {
            params: { author_id: bodydata.author_id },
        });
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

const getCommentLikeStatus = async (bodydata: LikeStatusInfoComment) => {
    try {
        const { data, status } = await http.get<LikeStatusData>(`/comments/${bodydata.comment_id}/likestatus`, {
            params: { author_id: bodydata.author_id },
        });
        console.log(status);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateLikeActionComment = async (bodydata: LikeActionInfoComment) => {
    try {
        const { data, status } = await http.put<LikeStatusData>(`/comments/${bodydata.comment_id}/like`, bodydata);
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
};

export default ForumThreadService;
