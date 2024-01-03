import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";
import React from "react";

type Props = {
    children: ReactNode;
};

interface Auth {
    author: string;
}

interface AuthContextInterface {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>;
}

const AuthContext = createContext<AuthContextInterface>({
    auth: {
        author: "",
    },
    setAuth: () => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState<Auth>({ author: "" });
    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
