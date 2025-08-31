import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

interface JWTPayload {
  id: string
  email: string
  role: 'user' | 'admin'
  iat?: number
  exp?: number
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get JWT token from cookies
  const token = request.cookies.get('token')?.value
  let isAuthenticated = false
  let userRole: 'user' | 'admin' | undefined

  // Verify JWT token (這個 SECRET_KEY 應該和後端一樣)
  if (token) {
    try {
      const SECRET_KEY = process.env.JWT_SECRET
      if (!SECRET_KEY) {
        console.error('JWT_SECRET not configured')
        isAuthenticated = false
      } else {
        const decoded = jwt.verify(token, SECRET_KEY) as JWTPayload
        isAuthenticated = true
        userRole = decoded.role
      }
    } catch (error) {
      console.error('JWT verification failed:', error)
      // Token is invalid or expired, treat as not authenticated
      isAuthenticated = false
      
      // 如果 token 過期，可以選擇清除 cookie 並重定向到登入頁
      if (error instanceof jwt.TokenExpiredError) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('token')
        return response
      }
    }
  }

  // Define protected routes
  const adminRoutes = ['/admin']
  const privateRoutes = ['/dashboard', '/profile', '/orders']
  const publicOnlyRoutes = ['/login', '/register']

  // Check if current path is an admin route
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  
  // Check if current path is a private route
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route)) || isAdminRoute
  
  // Check if current path is a public-only route
  const isPublicOnlyRoute = publicOnlyRoutes.some(route => pathname.startsWith(route))

  // Redirect unauthenticated users from private routes to login
  if (isPrivateRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect non-admin users from admin routes
  if (isAdminRoute && isAuthenticated && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect authenticated users from public-only routes
  if (isPublicOnlyRoute && isAuthenticated) {
    const redirectTo = userRole === 'admin' ? '/admin' : '/dashboard'
    return NextResponse.redirect(new URL(redirectTo, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}