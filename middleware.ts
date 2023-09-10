import { NextResponse, NextRequest } from "next/server";


export const middleware = (request: NextRequest) => {
	const path = request.nextUrl.pathname
	const isPublicPath = path === '/login' || path === '/register'
	const token = request.cookies.get('token')?.value || ''

	// if (isPublicPath && token) return NextResponse.redirect('/') This is ok too
	if (isPublicPath && token) return NextResponse.redirect(new URL('/profile', request.nextUrl))
	if (!isPublicPath && !token) return NextResponse.redirect(new URL('/login', request.nextUrl))
}

export const config = {
	matcher: ['/', '/profile', '/login', '/signup']
}
