"use client"
import axios from 'axios';
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { AlertSistem } from "@/components/shared";
import { validateEmail } from '@/auth/components/cadastro/formValidations';
import { BsFillEyeFill,BsFillEyeSlashFill  } from "react-icons/bs";
import Link from 'next/link';

export function LoginForm() {
  const [messageErrors, setMessageErrors] = React.useState<{[key: string]: string}>({});
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<{ title: string, message: string }>({
    title: '',
    message: ''
  });
  const [dadosLogin, setDadosLogin] = React.useState<{ email: string, password: string }>({
    email: "",
    password: ""
  });
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isFieldValid = (name: string, value: string): string => {
    let errorMessage = '';
    if (value.trim() === '') {
      errorMessage = 'Este campo é obrigatório!';
    } else {
      switch (name) {
        case 'email':
          errorMessage = validateEmail(value) ? '' : 'Email inválido!';
          break;
        case 'password':
          errorMessage = value.length >= 8 ? '' : 'A senha deve ter no mínimo 8 caracteres!';
          break;
        default:
          break;
      }
    }
    return errorMessage;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    const errorMessage = isFieldValid(name, value);
    setMessageErrors((prevState) => ({
      ...prevState,
      [name]: errorMessage,
    }));
  };

  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = isFieldValid('email', dadosLogin.email);
    const passwordError = isFieldValid('password', dadosLogin.password);

    if (emailError || passwordError) {
      setMessageErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }
    setLoading(true);
    try {
    const response = await axios.post('/api/user/login', dadosLogin);
    console.log(response.data.urlRedirect)
      if (response.status === 200) {
        router.push(`${response.data.urlRedirect}`);
      } else {
        setAlertMessage({
          title: `Erro`,
          message: `${response.data.message}`
        });
        setAlertVisible(true);
      }
    } catch (error:any) {
      console.error('Erro ao fazer login:', error);
      setAlertMessage({
        title: `Erro`,
        message: `Erro ao fazer login ${error.response?.data?.message}` || 'Erro no email ou senha, tente novamente.'
      });
      setAlertVisible(true);
    }finally {
      setLoading(false);
    }
  };

  return (
    <Card className="min-w-[350px] border-0 flex flex-col gap-10">
    <CardHeader className="text-center">
    <CardTitle>Faça seu login</CardTitle>
    </CardHeader>
      <form  className="min-h-[60vh] flex flex-col justify-between" onSubmit={handleFormSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={dadosLogin.email}
                onChange={handleInputChange}
                className={`${messageErrors.email ? 'border-destructive' : ''}`}
                required
              />
              {messageErrors.email && <label className="text-destructive">{messageErrors.email}</label>}
            </div>
            <div className="flex flex-col space-y-1.5 relative">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  name="password"
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={dadosLogin.password}
                  onChange={handleInputChange}
                  className={`${messageErrors.password ? 'border-destructive' : ''}`}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </div>
              </div>
              {messageErrors.password && <label className="text-destructive">{messageErrors.password}</label>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full mb-1 text-white" type="submit" disabled={loading}>
            {loading ? (
                <span className="visually-hidden">Carregando...</span>
            ) : (
              <>Entrar</>
            )}
          </Button>
          <Button className="w-full mb-1 bg-primary-foreground hover:bg-primary-foreground" type="button">
            <Link href={'/retiro/cadastro/dados-pessoais'}>Não sou cadastrada</Link>
          </Button>
        </CardFooter>
      </form>
      <AlertSistem
        title={alertMessage.title}
        message={alertMessage.message}
        onClose={handleAlertClose}
        show={alertVisible}
      />
    </Card>
  );
}