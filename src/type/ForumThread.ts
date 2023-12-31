export interface IForumThread {
    id: number;
    title: string;
    description: string;
    upvotes: number;
    [key: string]: unknown;
}
