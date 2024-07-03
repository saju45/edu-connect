import { authConfig } from "./auth.config"
import NextAuth from "next-auth"
import { PUBLIC_ROUTES,LOGIN,ROOT } from "./lib/routes";

const {auth}=NextAuth(authConfig);
export default auth((req)=>{

    const {nextUrl}=req;
    const isAuthenticated=!!req.auth;
    
    const isPublicRoutes=(PUBLIC_ROUTES.find(route=>nextUrl.pathname.startsWith(route))|| nextUrl.pathname===ROOT);

    if (!isAuthenticated && !isPublicRoutes) {
        return Response.redirect(new URL(LOGIN,nextUrl))
    }
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
   };