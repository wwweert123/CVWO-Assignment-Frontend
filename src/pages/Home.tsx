import BasicThreadList from "../components/BasicThreadList";
import React from "react";

const Home: React.FC = () => {
    return (
        <>
            <h3>{"Welcome to Frederick's Forum! Feel Free to Browse around and participate in discussions."}</h3>
            <br />
            <BasicThreadList />
        </>
    );
};

export default Home;
