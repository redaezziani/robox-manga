"use server";
import { cookies } from "next/headers";
import { zodResolver } from "@hookform/resolvers/zod";


/**
 * 
 * @param key
 * @param value 
 * @param options 
 * @returns
 */
export const setCookie = async (
    key: string,
    value: string,
    options?: {
        expires?: Date;
        maxAge?: number;
        path?: string;
        domain?: string;
        secure?: boolean;
        httpOnly?: boolean;
        sameSite?: 'strict' | 'lax' | 'none';
    }
) => {
    const cookie = await cookies();
    cookie.set(key, value, options);
};

export const getCookie = async (key: string) => {
    const cookie = await cookies();
    return cookie.get(key);
};

export const removeCookie = async (key: string) => {
    const cookie = await cookies();
    cookie.delete(key);
};  