import React from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { FaHome, FaRegNewspaper, FaMusic } from "react-icons/fa";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { IoShirtOutline } from "react-icons/io5";
import { GiFilmStrip } from "react-icons/gi";

const navConfig = [
    {
        title: "Home",
        path: "/",
        icon: <FaHome />,
    },
    {
        title: "Sports",
        path: "/sports",
        icon: <MdOutlineSportsBasketball />,
    },
    {
        title: "Gaming",
        path: "/gaming",
        icon: <SiYoutubegaming />,
    },
    {
        title: "News",
        path: "/news",
        icon: <FaRegNewspaper />,
    },
    {
        title: "Fashion",
        path: "/fashion",
        icon: <IoShirtOutline />,
    },
    {
        title: "Films",
        path: "/films",
        icon: <GiFilmStrip />,
    },
    {
        title: "Trending",
        path: "/trending",
        icon: <IoIosTrendingUp />,
    },
    {
        title: "Music",
        path: "/music",
        icon: <FaMusic />,
    },
];

export default navConfig;
