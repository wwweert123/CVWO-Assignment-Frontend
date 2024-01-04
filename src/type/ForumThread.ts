export type IThreadInfo = {
    title: string;
    description: string;
    upvotes: number;
    [key: string]: unknown;
};

export type IForumThread = {
    id: number;
    type: string;
    attributes: IThreadInfo;
    [key: string]: unknown;
};

export type GetAllThreadsResponse = {
    data: IForumThread[];
};

export type CreateThreadResponse = {
    data: IForumThread;
};

export type GetSingleThreadResponse = {
    data: IForumThread;
    included: ICommentInfo[];
};

export type ICommentAttribs = {
    text: string;
    forum_thread_id: number;
    author: CreateAuthorResponse | undefined;
    author_id: number | undefined;
};

export type ICommentInfo = {
    id: number;
    type: string;
    attributes: ICommentAttribs;
    [key: string]: unknown;
};

export type CreateCommentResponse = {
    data: ICommentInfo;
};

export type CreateAuthorResponse = {
    id: number;
    name: string;
    [key: string]: unknown;
};
