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
};
