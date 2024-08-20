import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();
  console.log(id);

  try {
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

      const payments = await prisma.paymentUser.findMany({
          where: { userId: id },
      });

      const anaminese = await prisma.usersAnaminese.findFirst({
          where: { userId: id },
      });

      if (user && payments && anaminese) {
        return NextResponse.json({ status: 200, user, payments, anaminese });
      } else if (user && payments && !anaminese) {
        return NextResponse.json({ status: 200, user, payments, error: 'Dados médicos não encontrados'});
      } else if (user && !payments && !anaminese) {
        return NextResponse.json({ status: 200, user, payments, error: 'Dados médicos e pagamentos não encontrados'});
      }

    }
    return NextResponse.json({ message: 'Usuário não encontrado', status: 400 });

  } catch (error) {
      console.error("Ocorreu um erro:", error);
      return NextResponse.json({ message: 'Ocorreu um erro ao processar a solicitação', status: 500 });
  }
}