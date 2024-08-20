import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const categorias = await prisma.categoria.findMany({
            select: {
                id: true,
                nome: true,
                descricao: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (categorias.length === 0) {
            return NextResponse.json({ message: 'Nenhuma categoria cadastrada.', status: 404 }, {
                status: 404,
                headers: {
                    'Cache-Control': 'no-store',
                },
            });
        }

        return NextResponse.json({ categorias, status: 200 }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return NextResponse.json({ message: 'Ocorreu um erro ao processar a solicitação', status: 500 }, {
            status: 500,
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    }
}