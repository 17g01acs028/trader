import {account} from '../../../lib/appwrite.ts';
import {useMutation, useQuery} from "@tanstack/react-query";
import {ID} from "appwrite";

export const authenticationQueryKeys = {
    all: ["org.authentication"],
    list: () => [
        ...authenticationQueryKeys.all,
        "list",
    ],
    logIn: () => [
        ...authenticationQueryKeys.all,
        "logged-in",
    ],

};

interface Login {
    email: string;
    password: string;
}

export function useAuthenticate() {
    return useMutation({
        mutationFn: async (requestProps: Login) => {
            await account.createEmailPasswordSession(requestProps?.email, requestProps?.password);
            return await account.get()
        },
    })
}


export const useGenerateOtp = () => {
    return useMutation({
        mutationFn: async (requestProps: Omit<Login, "password">) => {
            const {email} = requestProps;
            const sessionToken = await account.createEmailToken(
                ID.unique(),
                email
            );
            return sessionToken.userId;
        }
    });
}


interface OtpAuthentication {
    userId: string;
    secret: string;
}

export function useOtpAuthentication() {
    return useMutation({
        mutationFn: async (requestProps: OtpAuthentication) => {
            return await account.createSession(
                requestProps?.userId,
                requestProps?.secret,
            );
        },
    })
}

export function LoggedIn(){
    return useMutation({
        mutationFn: getLoggedInUser
    })
    // return useQuery(authenticationQueryKeys?.logIn(),getLoggedInUser)
}

async function getLoggedInUser(){
    return await account.get()
}

export function Logout(){
    return useMutation({
        mutationFn: async () => {
            return await account.deleteSession("current")
        }
    })
}

export function GetAccount(){
    return useQuery({
        queryKey: authenticationQueryKeys?.logIn(),
        queryFn: async () => {
            return await account.get()
        }
    })
}