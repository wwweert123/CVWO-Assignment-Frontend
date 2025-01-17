export type INewThreadInfo = {
    title: string;
    description: string;
    tag_list: string;
};

export type ITagInfo = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    taggings_count: number;
};

export type IThreadInfo = {
    title: string;
    description: string;
    created_at: string | undefined;
    author: CreateAuthorResponse | undefined;
    cached_weighted_score: number;
    tags: ITagInfo[];
    [key: string]: unknown;
};

export type IForumThreadRelationshipsComments = {
    data: unknown[];
};

export type IForumThreadRelationships = {
    comments: IForumThreadRelationshipsComments;
    [key: string]: unknown;
};

export type IForumThread = {
    id: number;
    type: string;
    attributes: IThreadInfo;
    relationships: IForumThreadRelationships;
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

export type INewComment = {
    text: string;
    forum_thread_id: number;
};

export type ICommentAttribs = {
    text: string;
    forum_thread_id: number;
    author: CreateAuthorResponse | undefined;
    author_id: number | undefined;
    created_at: string | undefined;
    cached_weighted_score: number;
    forum_thread: IThreadInfo;
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
    token: string;
    [key: string]: unknown;
};

export type LikeStatusInfo = {
    forum_id: number;
};

export type LikeStatusInfoComment = {
    comment_id: number;
};

export type LikeStatusData = {
    liked: boolean;
    disliked: boolean;
    tally: number;
};

export type LikeActionInfo = {
    forum_id: number;
    user_action: string;
};

export type LikeActionInfoComment = {
    comment_id: number;
    user_action: string;
};

export type AuthorCommentsResponse = {
    data: ICommentInfo[];
};

export type tagsType = "sports" | "gaming" | "news" | "fashion" | "films" | "trending" | "music";
