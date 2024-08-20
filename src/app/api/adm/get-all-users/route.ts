import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const id = await AuthService.creatRouteId();

        if (id) {
            const allUser = await prisma.users.findMany({
                select: {
                    id: true,
                    name: true,
                    telefone: true,
                    telefone_emergencia: true,
                    email: true,
                    data_de_nascimento: true,
                }
            });
            console.log(allUser)

            return NextResponse.json({ allUser, status: 200 });
        }

        return NextResponse.json({ message: 'Não foi possivel carregar a lista de usuarios. Recarregue a pagina ou tente mais tarde', status: 400 });
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return NextResponse.json({ message: 'Ocorreu um erro ao processar a solicitação', status: 500 });
    }
}
