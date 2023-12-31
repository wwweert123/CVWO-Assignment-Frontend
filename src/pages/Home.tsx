import ThreadList from "../components/ThreadList";
import ForumThreadService from "../services/ForumThreadService";
import { IForumThread } from "../type/ForumThread";
import React from "react";

const Home: React.FC = () => {
    const [forumThreads, setForumThreads] = React.useState<IForumThread[]>([]);

    React.useEffect(() => {
        let mounted = true;
        ForumThreadService.getAllThreads().then((forumThread) => {
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
