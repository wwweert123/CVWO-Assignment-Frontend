import "../App.css";
import { IForumThread } from "../type/ForumThread";

import React from "react";
import { Link } from "react-router-dom";

type Props = {
    forumThreads: IForumThread[];
};

const ThreadList: React.FC<Props> = ({ forumThreads }: Props) => {
    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h4>{"Welcome to my forum! Take a look!"}</h4>
            <ul>
                <li>
                    <Link to="/thread/1">{"Inspirational Quotes"}</Link>
                    {" by Aiken"}
                </li>
                {forumThreads.map((forumThread) => {
                    return (
                        <li key={forumThread.id as number}>
                            <h2>{forumThread.title}</h2>
                            <p>{forumThread.description}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ThreadList;
