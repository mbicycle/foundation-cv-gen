import {useCookies} from "react-cookie";
import {useCallback, useEffect, useState} from "react";
import * as msGraph from "msal-bundle";
import {AuthState} from "../utils/const.ts";

export const useAuth = () => {
    const [authState, setAuthState] = useState(AuthState.Loading);
    const [userName, setUserName] = useState('');

    const [{ token }, , removeCookie] = useCookies(["token"]);
    const searchParams = new URLSearchParams(window.location.search);


    const guestToken = searchParams.get("token");

    const ssoSilentAuth = async () => {
        try {
            const res = await msGraph.ssoSilent();
            console.log('res', res);
            setAuthState(AuthState.LoggedIn)
            setUserName(res.account.username)
        } catch (e) {
            console.error(e)
            setAuthState(AuthState.LoggedOut)
        }
    }

    useEffect(() => {
        console.log({token, guestToken, authState})
        if (!token) return setAuthState(AuthState.LoggedOut)

        if (!guestToken && authState !== AuthState.LoggedIn){
            ssoSilentAuth()
        }else if (guestToken) {
            msGraph.getGuestTokenValidity(guestToken)
                .then((isValid) => {
                    if (isValid) {
                        setAuthState(AuthState.LoggedIn);
                        setUserName('Guest');
                    } else {
                        alert('Token invalid');
                        setAuthState(AuthState.LoggedOut);
                    }
                });
        }
    }, [guestToken, authState, token]);

    const logout = useCallback(async () => {
        removeCookie('token');
        setAuthState(AuthState.LoggedOut)
        await msGraph.logoutFn();
    }, [removeCookie]);


    const account = () => {
        console.log("account",msGraph.msalInstance.getActiveAccount())
    }


    return {
        userName,
        token,
        authState,
        logout,
        account
    }
}
