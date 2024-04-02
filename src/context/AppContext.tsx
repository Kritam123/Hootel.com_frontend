import React, { useContext, createContext } from "react"
import { useQuery } from "react-query"
import * as apiClient from "../api_Client";
import { loadStripe, Stripe } from "@stripe/stripe-js";
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";
type AppContext = {
    isLoggedIn: boolean;
    user: UserType | undefined
    stripePromise: Promise<Stripe | null>;
}


const AppContextApi = createContext<AppContext | undefined>(undefined);
const stripePromise = loadStripe(STRIPE_PUB_KEY);
export const AppContextProvider =  ({ children }: { children: React.ReactNode }) => {
    const { data } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: 0,
    }) 
    

    return (
        <AppContextApi.Provider value={{
            isLoggedIn: !isError,
            user:data as UserType | undefined ,
            stripePromise
        }}>
            {children}
        </AppContextApi.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContextApi);
    return context as AppContext;
};