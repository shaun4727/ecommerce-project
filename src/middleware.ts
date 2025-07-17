import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './service/AuthService';

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ['/login', '/register'];

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/track-agent/, /^\//],
  admin: [/^\/admin/, /^\/create-shop/, /^\/track-agent/, /^\//],
  agent: [/^\/agent/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_CLIENT_LINK}/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  //   const role = userInfo.role as Role;
  //   const allowedRoutes = roleBasedPrivateRoutes[role];

  //   if (allowedRoutes && allowedRoutes.some((regex) => regex.test(pathname))) {
  //     return NextResponse.next(); // ✅ route is allowed for this role
  //   }

  //   if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
  //     const routes = roleBasedPrivateRoutes[userInfo?.role as Role];

  //     if (routes.some((route) => pathname.match(route))) {
  //       return NextResponse.next();
  //     }
  //   }

  //   if (role === 'agent') {
  //     return NextResponse.redirect(new URL('/agent/dashboard', request.url));
  //   }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    console.log(routes, pathname);
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
};

export const config = {
  matcher: [
    '/login',
    '/create-shop',
    '/admin',
    '/admin/:page',
    '/user',
    '/user/:page',
    '/track-agent',
    '/agent',
    '/agent/:page',
    '/',
    '/:page',
  ],
};
