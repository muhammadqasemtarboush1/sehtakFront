import { createContext, useState, useContext } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";

const createUserUrl = "https://sehtak.herokuapp.com/auth/register/";
const loginURL = "https://sehtak.herokuapp.com/auth/login/"
const refreshUrl = "https://sehtak.herokuapp.com/auth/login/refresh/"

const AuthContext = createContext(undefined);

export function useAuth() {
    const Auth = useContext(AuthContext);
    if (!Auth) throw new Error("Check your AuthProvider in you _app.js, maybe")
    return Auth;
}

export function AuthProvider({ children }) {   

    let lsData = null
    if (typeof window !== 'undefined') {
        lsData = localStorage.getItem("AuthTokens");
    }

    const [tokens, setTokens] = useState(() =>
        lsData ? JSON.parse(lsData) : null
    );
    const [userInfo, setUserInfo] = useState(() => {
        return lsData ? jwt_decode(lsData).user_id : null;
    });

    async function signup(userInput) {
        try {
            const res = await axios.post(createUserUrl, userInput);
            if (res.status === 400) {
                console.log(`${res.status} bad request`)
            }
            if (res.status === 201 || res.status === 200) {
                await login(userInput.email, userInput.password);
            }
        }
        catch (error) {
            console.log(` Error Signing in: ${error}`)
        }

    }

    async function login(email, password) {
        try {
            const res = await axios.post(loginURL, { email, password });
            if (res.status === 200) {
                setTokens(res.data); // access + refresh
                setUserInfo(jwt_decode(res.data.access)); // user_id 
                localStorage.setItem("AuthTokens", JSON.stringify(res.data))
            }
        }
        catch (error) {
            console.log(`Error Logging in: ${error}`)
        }
    }

    async function refreshToken() {
        const body = {
            refresh: tokens.refresh
        }
        const res = await axios.post(refreshUrl, body);
        if (res.status === 200) {
            const newTokens = {
                access: res.data.access,
                refresh: tokens.refresh
            }
            console.log("refresh token res", res.data); // access
            console.log(55555555555, newTokens);
            setTokens(newTokens);
            // setUserInfo(jwt_decode(newTokens.access));
            localStorage.setItem("AuthTokens", JSON.stringify(newTokens));
        } else {
            logout();
        }
    }

    function isAuth() {
        try {
            console.log(4444444, tokens.access, tokens.refresh)
            if (tokens.access && tokens.refresh) {
                const access = jwt_decode(tokens?.access);
                const refresh = jwt_decode(tokens?.refresh);
                const now = Math.ceil(Date.now() / 1000);
                console.log(access?.user_id);
                setUserInfo(access?.user_id);
                if (access.exp > now) {
                    console.log("Access token hasn't expired")
                    return true;
                }
                if (access?.exp < now && refresh.exp > now) {
                    refreshToken();
                    console.log("Need to refresh token");
                    return true;
                }
                return false;
            }
        } catch (error) {
            console.log(`Error in authenticating the user${error}`);
            return false;
        }
    }

    function logout() {
        setTokens(null);
        setUserInfo(null);
        localStorage.removeItem("AuthTokens")
    }

    const globalState = {
        tokens,
        signup,
        login,
        logout,
        refreshToken,
        isAuth,
        userInfo,
    }
    return (
        <AuthContext.Provider value={globalState}>
            {children}
        </AuthContext.Provider>
    )
}
