'use server'
import { cookies } from 'next/headers'
 



export const getCookies = async () => {
    // get cookies
    const cookieStore = await cookies()
    const authToken = cookieStore.get('access_token')
    return authToken
}

export const setCookies = async (token: string) => {
    // set cookies
    const cookieStore = await cookies()
     cookieStore.set('access_token', token,{
        maxAge: 60 * 60 * 24 * 7, // 1 week
     })
}

export const removeCookies = async () => {
    // remove cookies
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
}