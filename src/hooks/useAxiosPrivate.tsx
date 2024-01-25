//hooks to attach the axios interceptors to the axios instance
import useAuth from "./useAuth";
import { axiosPrivate } from "../http-common";
import { useEffect } from "react";

const useAxiosPrivate = () => {
    const { auth } = useAuth(); //auth state

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    //if the headers is not set before
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        // need to remove them at the end
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [auth]);

    return axiosPrivate; //the hook will return the axiosprivate instance
};

export default useAxiosPrivate;
