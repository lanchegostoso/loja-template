import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { nome, descricao } = await req.json();

  try {
    const categoria = await prisma.categoria.create({
      data: {
        nome,
        descricao,
      },
    });

    return NextResponse.json({ message: 'Categoria criada com sucesso', categoria, status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao criar categoria', error, status: 500 });
  }
}
