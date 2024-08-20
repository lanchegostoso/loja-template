import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SigninProgressiveForm } from "@/auth/components/cadastro/progressiveSingninForm";
import AuthService from '@/auth/service/authService';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Cadastro() {
  const session = await AuthService.isSessionValid()
  return (
    <div className="flex align-center justify-center p-8">
      {session?
      <div>
        <Card>
          <CardHeader className="text-center gap-2">
            <h5 className="text-bold">Mensagem do Sistema</h5>
            <CardDescription>Você já está cadastrada no sistema</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>Caso esteja tentando resolver assuntos de pagamento acesse MINHA CONTA para ver mais informações.</p>
            <p>Caso esteja tentando ajudar alguém a se cadastrar, acesse MINHA CONTA e clique em SAIR para conseguir acessar a página de cadastro do Retiro.</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-start">
          </CardFooter>
        </Card>
            <Button className="mt-4 w-full text-white"><Link href="/user">Minha Conta</Link></Button>
      </div>
      : <SigninProgressiveForm />}
    </div>
  )
}