"use client"
import axios from 'axios';
import * as React from "react";
import { BsCheck2, BsEyeFill , BsEyeSlashFill  } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { Button, Input, Label, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { AlertSistem , ProgressBullet , ProgressLine} from "@/components/shared";

import * as validations from "./formValidations";
import { AlertMessage, DadosPessoais } from "./model";
import TermosDeUso from './termosDeUso/termosDeUso';

type JSXElement = React.ReactElement<any, string | React.JSXElementConstructor<any>>;
type ErrorPasswordMessage = JSXElement[];

export function SigninProgressiveForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showTermosDeUso, setShowTermosDeUso] = React.useState(false);
  const [messageErrors, setMessageErrors] = React.useState<{[key: string]: string}>({});
  const [messagePasswordErrors, setMessagePasswordErrors] = React.useState<{ [key: string]: ErrorPasswordMessage }>({});
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [termoDeUso, setTermoDeUso] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [dadosPessoais, setDadosPessoais] = React.useState<DadosPessoais>({
    name: "",
    telefone: "",
    telefone_emergencia: "",
    rg: "",
    cpf: "",
    data_de_nascimento: "",
    email: "",
    password: "",
    passwordRepeat:"",
    termos_de_uso: `${termoDeUso}`,
  });
  const [alertMessage, setAlertMessage] = React.useState<AlertMessage>({
    title: '',
    message: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  React.useEffect(() => {
  }, [termoDeUso,dadosPessoais]);

  const toggleTermosDeUso = () => {
    setShowTermosDeUso(!showTermosDeUso);
  };
  const [groups, setGroups] = React.useState<{label: string; status: "notFilled" | "filled"; cards: { label: string; name: keyof DadosPessoais; type: string; placeholder: string }[] }[]>([
    {
      label: "Informações Pessoais",
      status: "notFilled",
      cards: [
        { label: "Nome", name: "name", type: "text", placeholder: "Digite seu nome" },
        { label: "Telefone", name: "telefone", type: "text", placeholder: "(21)98999-9999" },
        { label: "Telefone de emergência", name: "telefone_emergencia", type: "text", placeholder: "(21)98999-9999" },
      ],
    },
    {
      label: "Informações de Conta",
      status: "notFilled",
      cards: [
        { label: "E-mail", name: "email", type: "email", placeholder: "Digite seu email" },
        { label: "Senha", name: "password", type: "password", placeholder: "Digite uma senha segura" },
        { label: "Confirmar Senha", name: "passwordRepeat", type: "password", placeholder: "Confirmar senha" }
      ],
    },
    {
      label: "Documentos",
      status: "notFilled",
      cards: [
        { label: "RG", name: "rg", type: "text", placeholder: "Digite seu RG" },
        { label: "CPF", name: "cpf", type: "text", placeholder: "Digite seu CPF" },
        { label: "Data de Nascimento", name: "data_de_nascimento", type: "date", placeholder: "dd/mm/aaaa" },
      ],
    },
  ]);

  const isFieldValid = (card: any, value: string): string => {
    const { name } = card;
    let errorMessage = '';
  
    if (value.trim() === '') {
      if (name === 'password') {
        setMessagePasswordErrors((prevState) => ({
          ...prevState,
          [name]: [
            <label className="flex gap-2" key="lowercase"><AiOutlineClose className="text-destructive" /> 1 Letra minúscula</label>,
            <label className="flex gap-2" key="uppercase"><AiOutlineClose className="text-destructive" /> 1 Letra maiúscula</label>,
            <label className="flex gap-2" key="number"><AiOutlineClose className="text-destructive" /> 1 Número</label>,
            <label className="flex gap-2" key="length"><AiOutlineClose className="text-destructive" /> Mínimo 8 dígitos</label>,
          ],
        }));
      }
      return 'Este campo é obrigatório!';
    }

    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const minLength = value.length >= 8;
    const hasLowercase = lowercaseRegex.test(value);
    const hasUppercase = uppercaseRegex.test(value);
    const hasNumber = numberRegex.test(value);

    switch (name) {
      case 'name':
        errorMessage = validations.validateNome(value) ? '' : 'O nome deve ter apenas letras';
        break;
      case 'cpf':
        errorMessage = validations.validateCPF(value) ? '' : 'CPF inválido!';
        break;
      case 'rg':
        errorMessage = validations.validateRG(value) ? '' : 'RG inválido!';
        break;
      case 'email':
        errorMessage = validations.validateEmail(value) ? '' : 'Email inválido!';
        break;
      case 'password':

        let errorPasswordMessage: ErrorPasswordMessage = [];
        if (!hasLowercase) errorPasswordMessage.push(<label className="flex gap-2" key="lowercase"><AiOutlineClose className="text-destructive" /> 1 Letra minúscula</label>);
        else errorPasswordMessage.push(<label className="flex gap-2" key="lowercase-valid"><BsCheck2 className="text-success" /> 1 Letra minúscula</label>);
        if (!hasUppercase) errorPasswordMessage.push(<label className="flex gap-2" key="uppercase"><AiOutlineClose className="text-destructive" /> 1 Letra maiúscula</label>);
        else errorPasswordMessage.push(<label className="flex gap-2" key="uppercase-valid"><BsCheck2 className="text-success" /> 1 Letra maiúscula</label>);
        if (!hasNumber) errorPasswordMessage.push(<label className="flex gap-2" key="number"><AiOutlineClose className="text-destructive" /> 1 Número</label>);
        else errorPasswordMessage.push(<label className="flex gap-2" key="number-valid"><BsCheck2 className="text-success" /> 1 Número</label>);
        if (!minLength) errorPasswordMessage.push(<label className="flex gap-2" key="length"><AiOutlineClose className="text-destructive" /> Mínimo 8 dígitos</label>);
        else errorPasswordMessage.push(<label className="flex gap-2" key="length-valid"><BsCheck2 className="text-success" /> Mínimo 8 dígitos</label>);
  
        errorPasswordMessage = errorPasswordMessage.map((element, index) => React.cloneElement(element, { key: index }));
  
        setMessagePasswordErrors((prevState) => ({
          ...prevState,
          [name]: errorPasswordMessage,
        }));

        if (!hasLowercase || !hasUppercase || !hasNumber || !minLength) {
          errorMessage = 'A senha não atende aos critérios de segurança!';
        }
        break;
      case 'passwordRepeat':
        if (!hasLowercase || !hasUppercase || !hasNumber || !minLength) {
          errorMessage = 'A senha não atende aos critérios de segurança!';
      } else if (value !== dadosPessoais.password) {
          errorMessage = 'As senhas não são iguais!';
      }
        break;
      case 'data_de_nascimento':
        errorMessage = validations.validateBirthDate(value) ? '' : 'A data de nascimento inválida!';
        break;
      case 'telefone':
      case 'telefone_emergencia':
        if (!validations.validatePhoneNumber(value)) {
          errorMessage = 'O telefone deve conter apenas números, ter 10 ou 11 dígitos';
        } else if (name === 'telefone_emergencia' && value === dadosPessoais.telefone) {
          errorMessage = 'Os telefones não podem ser iguais!';
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };


        const handleNextButtonClick = () => {
          const currentCard = groups[currentIndex].cards;
          let hasError = false;
          const newMessageErrors = { ...messageErrors };

          for (const card of currentCard) {
            const fieldValue = dadosPessoais[card.name];
            const errorMessage = isFieldValid(card, fieldValue);

            if (errorMessage) {
              hasError = true;
              newMessageErrors[card.name] = errorMessage;
            } else {
              delete newMessageErrors[card.name];
            }
          }

          if (hasError) {
            setMessageErrors(newMessageErrors);
            return;
          }

          const updatedGroups = [...groups];
          updatedGroups[currentIndex].status = "filled";
          setGroups(updatedGroups);

          setCurrentIndex((prevIndex) => prevIndex + 1);
        };

  const handleAcceptTerms = () => {
    setTermoDeUso(!termoDeUso);
    setDadosPessoais((prevState) => ({
      ...prevState,
      termos_de_uso: `${!termoDeUso}`,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setDadosPessoais((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    const currentCard = groups[currentIndex].cards.find((card) => card.name === name);
    if (currentCard) {
      const errorMessage = isFieldValid(currentCard, value);
  
      setMessageErrors((prevState) => ({
        ...prevState,
        [name]: errorMessage,
      }));
  
      if (name === 'password' && value.trim() === '') {
        setMessagePasswordErrors({
          [name]: [
            <label className="flex gap-2" key="lowercase"><AiOutlineClose className="text-destructive" /> 1 Letra minúscula</label>,
            <label className="flex gap-2" key="uppercase"><AiOutlineClose className="text-destructive" /> 1 Letra maiúscula</label>,
            <label className="flex gap-2" key="number"><AiOutlineClose className="text-destructive" /> 1 Número</label>,
            <label className="flex gap-2" key="length"><AiOutlineClose className="text-destructive" /> Mínimo 8 dígitos</label>,
          ],
        });
      }   
    }
  };

  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(dadosPessoais.termos_de_uso !== 'true'){
      setAlertMessage({
        title: `Contrato`,
        message: `É preciso aceitar os termos de uso para concluir o cadastro`
      });
      setAlertVisible(true);
      toggleTermosDeUso();
      return
    }

    if (validations.validateForm(dadosPessoais)) {
      try {
        const response = await axios.post('/api/user/create', dadosPessoais);
        if (response.data.status === 201) {
          router.push("/retiro/cadastro/dados-adicionais");
        } else {
          setAlertMessage({
            title: `Error status ${response.data.error.code}`,
            message: `${response.data.message}`
          });
          setAlertVisible(true);
        }
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        setAlertMessage({
          title: `Error`,
          message: `${error}`
        });
        setAlertVisible(true);
      }
    }
  };

  const isFormValid = () => {
    return Object.values(dadosPessoais).every((value) => value.trim() !== "");
  };



  const cards = groups[currentIndex].cards;

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleFormSubmit}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-8">
            {groups.map((group, index) => (
              <React.Fragment key={index}>
                <ProgressBullet
                  active={index <= currentIndex}
                  status={group.status}
                />
                {index < groups.length - 1 && (
                  <ProgressLine active={index < currentIndex} />
                )}
              </React.Fragment>
            ))}
          </div>
          <CardTitle>Cadastre-se no site </CardTitle>
          <CardDescription>Você é terra fértil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
          {cards.map((card, index) => (
  <div key={index} className="flex flex-col space-y-1.5">
    <Label htmlFor={card.name}>{card.label}</Label>
    <div className="relative">
      <Input
        name={card.name}
        id={card.name}
        type={card.name === 'password' || card.name === 'passwordRepeat' ? (showPassword ? 'text' : 'password') : card.type}
        placeholder={card.placeholder}
        value={dadosPessoais[card.name]}
        onChange={handleInputChange}
        onFocus={card.name === 'password' ? handlePasswordFocus : undefined}
        onBlur={card.name === 'password' ? handlePasswordBlur : undefined}
        className={`${messageErrors[card.name] ? 'border-destructive' : ''}`}
        required
      />
      {(card.name === 'password' || card.name === 'passwordRepeat') && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <BsEyeSlashFill className='h-6 w-6 text-gray-400' /> : <BsEyeFill  className='h-6 w-6 text-gray-400' />}
        </button>
      )}
    </div>
    {card.name === 'password' && passwordFocused && messagePasswordErrors[card.name] && (
      <div className="text-[0.75rem]">{messagePasswordErrors[card.name]}</div>
    )}
    {card.name !== 'password' && messageErrors[card.name] && <label className="text-destructive">{messageErrors[card.name]}</label>}
  </div>
))}

          </div>
          {currentIndex === 0 && !showTermosDeUso && (
              <Button onClick={toggleTermosDeUso} type="button" className="w-full mt-4 text-white bg-blue900 hover:bg-blue700">
                Aceitar Termos obrigatórios
              </Button>
            )}
            <div>{showTermosDeUso && <TermosDeUso onClose={toggleTermosDeUso} onAcceptTerms={handleAcceptTerms} isChecked={termoDeUso} />}</div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            {currentIndex < groups.length - 1 && (
              <Button
                className="w-full mb-1 text-white bg-success700 hover:bg-success"
                disabled={!termoDeUso}
                onClick={handleNextButtonClick} >
                Próximo
              </Button>
            )}
            {currentIndex === groups.length - 1 && (
              <Button className="w-full mb-1 text-white bg-success700" type="submit" disabled={!isFormValid()}>Cadastrar</Button>
            )}
          {currentIndex > 0 && (
            <Button
              className="w-full mb-1 text-white bg-success700 hover:bg-success"
              onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}>
              Voltar
            </Button>
          )}
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
