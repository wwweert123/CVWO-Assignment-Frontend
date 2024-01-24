import axios from "axios";

export default axios.create({
    baseURL: "https://cvwo-frederick-forum-backend.onrender.com/api/v1",
    headers: {
        "Content-type": "application/json",
    },
});
