import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const id = await AuthService.creatRouteId();

    if (id) {
        const anaminese = await prisma.usersAnaminese.findFirst({
            where: { userId: id },
        });
        console.log(anaminese)
        if (anaminese) {
            return NextResponse.json({ status: 200, anaminese });
        }
    }
    return NextResponse.json({ message: 'Dados não encontrados', status: 400 });
}
