import React, { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

type Props = {
    children: ReactNode;
};

interface Auth {
    author: string;
    accessToken: string | undefined;
}

interface AuthContextInterface {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>;
}

const AuthContext = createContext<AuthContextInterface>({
    auth: {
        author: "",
        accessToken: undefined,
    },
    setAuth: () => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState<Auth>({ author: "", accessToken: undefined });
    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
