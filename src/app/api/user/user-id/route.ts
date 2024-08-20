import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const id = await AuthService.creatRouteId();

    if (id) {
        const user = await prisma.users.findFirst({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                telefone: true,
                telefone_emergencia: true,
                cpf: true,
                rg:true,
                data_de_nascimento: true,
                type: true,
            }
        });

        if (user) {
            return NextResponse.json({ status: 200, user });
        }
    }
    return NextResponse.json({ message: 'Usuario não encontrado', status: 400 });
}
