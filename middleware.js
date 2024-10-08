import withAuth from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth (
    function middleware(req){   
        console.log(req.nextUrl.pathname);
        console.log(req.nextauth.token.role);

        if(req.nextUrl.pathname.startsWith("/CreateUser") && req.nextauth.token.role != "admin"){
            return NextResponse.rewrite(new URL("/Denied" , req.url))
        }
    } ,{
        callbacks :{
            authorized : ({token}) => !!token
        },
    }   
)
// export { default } from "next-auth/middleware";   // used only for authentication not authorization 

export const config = {matcher : ["/CreateUser"]};