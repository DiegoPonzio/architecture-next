import { type NextRequest, NextResponse } from 'next/server';
import Cookies from 'js-cookie';
import { apiClient } from '@/services/api/client';
import { UserDto } from '@/interface/user-dto';

const PUBLIC_ROUTES = ['/login', '/sign-up', '/forgot-password'];
const AUTH_COOKIE_NAME = 'access_token';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  // Si no hay token y la ruta no es pública, redirigir a login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token y está en login, redirigir al dashboard
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token) {
    apiClient.setBearerToken(token);
  }

  // validamos la sesion
  try {
    await apiClient.get<UserDto>('/auth/me');
  } catch (error) {
    console.error(error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Excluir archivos estáticos y API routes
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
