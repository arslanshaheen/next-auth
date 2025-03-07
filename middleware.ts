import authConfig from "./auth.config"
import NextAuth from "next-auth"
const { auth } = NextAuth(authConfig)

import {
     publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT } from "@/routes"



export default  auth((req) => {
  const {nextUrl}=req;
  const isLoggedIn= !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isProtectedRoute = nextUrl.pathname.startsWith(DEFAULT_LOGIN_REDIRECT);

  if (isApiAuthRoute){
      return null;
  }

  // If user is on a protected route and not logged in, redirect to login
  if(isProtectedRoute && !isLoggedIn){
      return Response.redirect(new URL("/auth/login", nextUrl));
  }

  if(isAuthRoute){
      if(isLoggedIn){
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
     }
     return null;
  }

  if(!isPublicRoute && !isLoggedIn){
      return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return null;
}) 


 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}