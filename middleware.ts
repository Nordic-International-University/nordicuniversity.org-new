import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_TOKEN);

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token');

    // Faqat token mavjud bo'lsa, uni tekshirishni davom ettiramiz
    if (token && token.value) {
        // Tokenning noto'g'ri formatini tekshirish (JWT uch qismdan iborat bo'lishi kerak)
        if (token.value.split('.').length !== 3) {
            console.error("Token noto'g'ri formatda:", token.value);

            // Token noto'g'ri formatda bo'lsa, private routelarni register sahifasiga yo'naltiramiz
            if (['/dashboard', '/profile', '/createarticle'].includes(request.nextUrl.pathname)) {
                const response = NextResponse.redirect(`${request.nextUrl.origin}/register`);
                response.cookies.set('access_token', '', { httpOnly: true, secure: true, expires: new Date(0) });
                return response;
            }

            // Public marshrutlarga kirishga ruxsat berish
            return NextResponse.next();
        }

        try {
            // Token yaroqliligini tekshirish
            const { payload } = await jwtVerify(token.value, secretKey);
            console.log(payload);

            // Agar foydalanuvchi register sahifasiga kirsa va token yaroqli bo'lsa, uni profile sahifasiga yo'naltirish
            if (request.nextUrl.pathname === '/register') {
                return NextResponse.redirect(`${request.nextUrl.origin}/profile`);
            }
        } catch (err) {
            console.error("Yaroqsiz token:", err);

            // Agar token yaroqsiz bo'lsa, private routelarni register sahifasiga yo'naltirish
            if (['/dashboard', '/profile', '/createarticle'].includes(request.nextUrl.pathname)) {
                const response = NextResponse.redirect(`${request.nextUrl.origin}/register`);
                response.cookies.set('access_token', '', { httpOnly: true, secure: true, expires: new Date(0) });
                return response;
            }

            // Public marshrutlarga kirishga ruxsat berish
            return NextResponse.next();
        }
    }

    // Agar token mavjud bo'lmasa va foydalanuvchi private routelarga kirmoqchi bo'lsa, uni register sahifasiga yo'naltiramiz
    if (!token && ['/dashboard', '/profile', '/createarticle'].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(`${request.nextUrl.origin}/register`);
    }

    // Public marshrutlarga kirishga ruxsat berish
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/register', '/dashboard/:path*', '/profile/:path*', '/createarticle/:path*'],
};
