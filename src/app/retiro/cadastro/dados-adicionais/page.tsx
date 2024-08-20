import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnamineseProgressiveForm } from "@/auth/components/cadastro/progressiveAnamineseForm";
import AuthService from '@/auth/service/authService';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CadastroAnaminese() {
  const session = await AuthService.isSessionValid()

  return (
    <div className="flex align-center justify-center p-8">
      {session? <AnamineseProgressiveForm />: <Card>
        <CardHeader>
          <CardTitle>Mensagem do Sistema</CardTitle>
          <CardDescription>É preciso ser cadastrada para completar a inscrição no retiro</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Não encontramos seu cadastro por isso não é possível prosseguir com a sua inscrição.</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <p>Tente cadastrar-se</p>
          <Button><Link href="/retiro/cadastro/dados-pessoais">CADASTRE-SE</Link></Button>
          <p>Se já possuir uma conta faça login</p>
          <Button><Link href="/retiro/login">Login</Link></Button>
        </CardFooter>
      </Card> }
    </div>
  )
}