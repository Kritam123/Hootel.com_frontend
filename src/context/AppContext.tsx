import React, { useContext, createContext, useState } from "react"
import { useQuery } from "react-query"
import * as apiClient from "../api_Client";
type AppContext = {
    isLoggedIn: boolean;
    user: UserType | undefined
}


const AppContextApi = createContext<AppContext | undefined>(undefined);

export const AppContextProvider =  ({ children }: { children: React.ReactNode }) => {
    const { data } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: 0,
    }) 
    

    return (
        <AppContextApi.Provider value={{
            isLoggedIn: !isError,
            user:data as UserType | undefined 
        }}>
            {children}
        </AppContextApi.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContextApi);
    return context as AppContext;
};