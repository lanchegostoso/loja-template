import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { nome, descricao, preco, quantidade, categoriaId, imagem } = await req.json();

  try {
    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
        categoriaId,
        imagem,
      },
    });

    return NextResponse.json({ message: 'Produto criado com sucesso', produto, status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao criar produto', error, status: 500 });
  }
}
