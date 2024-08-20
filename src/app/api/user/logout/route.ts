import AuthService from "@/auth/service/authService";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    AuthService.destroySession();
    return NextResponse.redirect(new URL('/', req.url))
}