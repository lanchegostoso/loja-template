import { PrismaClient, UsersAnaminese } from "@prisma/client";
import { NextRequest } from "next/server";
import AuthService from "@/auth/service/authService";
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST (req: NextRequest){

    const sessionCookie = cookies().get('session');

    if(!sessionCookie) return Response.json({ error: 'Sessão de usuario nao encontrada, tente novemente', status: 404 });

    const idToken = await AuthService.openSessionToken(sessionCookie.value)

    console.log('pegar o token da sessão na api', idToken.sub);

    const newUser: Partial<UsersAnaminese> = await req.json();
    console.log('está vindo do front end',newUser);

    const user = await prisma.users.findFirst({
        where:{ id: newUser.userId }
    })

    if(!user){
        return Response.json({ error: 'Dados do usuário incorreto, ou não encontrado.', status: 404 });
    }

    console.log('user . id ', user.id)
    let errorMessage: string | null = null;

    switch (true) {
        case (newUser.possui_doenca === undefined):
            errorMessage = "Não foi possivel concluir o cadastro, o campo possui doença não foi preenchido corretamente";
            break;
        case newUser.qual_doenca === undefined:
            errorMessage = "Não foi possivel concluir o cadastro, o campo possui doença não foi preenchido corretamente";
            break;
        case (newUser.faz_uso_medicamento === undefined):
            errorMessage = "Não foi possivel concluir o cadastro, o campo faz uso de medicamento não foi preenchido corretamente";
            break;
        case newUser.qual_medicamento === undefined:
            errorMessage = "Não foi possivel concluir o cadastro, o campo faz uso de medicamento não foi preenchido corretamente";
            break;
        case (newUser.alergia_medicamento === undefined):
            errorMessage = "Não foi possivel concluir o cadastro, o campo alergia a medicamento não foi preenchido corretamente";
            break;
        case newUser.alergia_qual_medicamento === undefined:
            errorMessage = "Não foi possivel concluir o cadastro, o campo alergia a medicamento não foi preenchido corretamente";
            break;
        case (newUser.restricao_alimentar === undefined):
            errorMessage = "Não foi possivel concluir o cadastro, o campo restrição / alergia alimentar não foi preenchido corretamente";
            break;
        case newUser.quais_alimentos === undefined:
            errorMessage = "Não foi possivel concluir o cadastro, o campo restrição / alergia alimentar não foi preenchido corretamente";
            break;
        case (newUser.tamanho_blusa === undefined):
            errorMessage = "Não foi possivel concluir o cadastro,  o campo tamanho da blusa não foi preenchido corretamente";
            break;
        default:
            break;
    }

    if (errorMessage) {
        return Response.json({ error: errorMessage, status: 400 });
    }

    const anamineseData = await prisma.usersAnaminese.findFirst({
        where:{ userId: idToken.sub }
    })
    console.log(anamineseData);

    if(anamineseData){
        return Response.json({ message: 'Esse usuario já possui dados adicionais cadastrados.', status: "D200" , anamineseData});
    }

    try {
            await prisma.usersAnaminese.create({
                data: {
                    userId: idToken.sub!,
                    possui_doenca: newUser.possui_doenca,
                    qual_doenca: newUser.qual_doenca,
                    faz_uso_medicamento: newUser.faz_uso_medicamento,
                    qual_medicamento: newUser.qual_medicamento,
                    alergia_medicamento: newUser.alergia_medicamento,
                    alergia_qual_medicamento: newUser.alergia_qual_medicamento,
                    restricao_alimentar: newUser.restricao_alimentar,
                    quais_alimentos: newUser.quais_alimentos,
                    tamanho_blusa: newUser.tamanho_blusa,
                },
            });
            return Response.json({ message: "Dados adicionais do usuário criado com sucesso", status: 201 });

    } catch (error) {
        return Response.json({ error: "Erro ao salvar dados adicionais do usuário", status: 500 });
    }
}