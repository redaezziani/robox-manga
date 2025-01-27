import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
];

const isAuthPath = (path: string) => authPaths.includes(path);

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token');
    if (token && isAuthPath(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}
