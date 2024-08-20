import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation';
import AuthService from '../service/authService';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

const prisma = new PrismaClient();
const baseUrl = process.env.BASE_URL;

async function loginAction(formData:FormData) {
    'use server';

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            NextResponse.json({ message: 'Todos os dados são obrigatórios' }, { status: 400 });
        }

        const user = await prisma.users.findFirst({
            where:{
                email,
            }
        })

        if(!user){
            NextResponse.json({ message: 'Dados do usuário incorreto, ou não encontrado.' }, { status: 404 });
            console.log('Usuario não encontrado')
            redirect('/retiro/login')
        }

        const isMatch = await bcrypt.compare(password, user?.password)

        if(!isMatch){
            NextResponse.json({ message: 'Dados do usuário incorreto, ou não encontrado.' }, { status: 404 });
            console.log('usuario ou senha invalidos');
            redirect('/retiro/login')
        }

        await AuthService.createSessionToken({sub: user.id ,type: user.type})

        NextResponse.json({ message: 'Login realizado com sucesso' }, { status: 202 });
        console.log('Login realizado com sucesso!');
        redirect(`/retiro/cadastro/dados-adicionais`)

    }

async function login(formData:FormData) {
        'use server';

            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            console.log('Email:', email);
            console.log('Password:', password);

            if (!email || !password) {
                return NextResponse.json({ message: 'Todos os dados são obrigatórios' }, { status: 400 });
            }

            try {
                console.log('Enviando requisição para:', `${baseUrl}/api/user/login`);
                const response = await fetch(`${baseUrl}/api/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                console.log('Status da resposta:', response.status);

                const responseData = await response.json(); // Obter os dados da resposta aqui

                console.log('Dados da resposta:', responseData);

                if (!response.ok) {
                    // Se a resposta não for bem-sucedida, lança um erro com a mensagem correspondente
                    throw new Error('Falha ao fazer login');
                }

                cookies().set('session', responseData.token)
                return NextResponse.redirect(`${baseUrl}/api/user/userId`)

            } catch (error) {
                // Se ocorrer um erro durante a requisição, retorna uma mensagem de erro
                console.error('Erro ao fazer login:', error);
                return {
                    message: 'Erro ao fazer login. Tente novamente mais tarde.',
                    status: 500,
                };
            }
        }

const AuthActions ={
    login,
    loginAction
}

export default AuthActions;