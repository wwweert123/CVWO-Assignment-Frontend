import ThreadList from "../components/ThreadList";
import React from "react";

import axios from "axios";

export interface forumThreadsTemplate {
    id: number;
    title: string;
    description: string;
    upvotes: number;
    [key: string]: unknown;
}

const API_URL = "http://localhost:3000/api/v1/forum_threads";

function getThreads() {
    return axios.get(API_URL).then((response) => response.data);
}

const Home: React.FC = () => {
    const [forumThreads, setForumThreads] = React.useState<forumThreadsTemplate[]>([]);

    React.useEffect(() => {
        let mounted = true;
        getThreads().then((forumThread) => {
            if (mounted) {
                setForumThreads(forumThread);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <>
            <h3>{"Welcome to Frederick's Forum! Feel Free to Browse around and participate in discussions."}</h3>
            <br />
            <ThreadList forumThreads={forumThreads} />
        </>
    );
};

export default Home;
