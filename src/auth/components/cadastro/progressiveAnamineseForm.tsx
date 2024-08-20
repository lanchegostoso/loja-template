"use client";
import './progressiveAnaminese.css';
import * as React from "react";
import axios from 'axios';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BsArrowClockwise } from "react-icons/bs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { AlertMessage, DadosAnaminese, GroupDadosAdicionais } from "./model";
import { ProgressBullet } from "@/components/shared/ProgressStatus/progressBullet";
import { ProgressLine } from "@/components/shared/ProgressStatus/progressLine";
import { IoMdCheckmark } from 'react-icons/io';
import { AlertSistem } from "@/components/shared/alertSistem";

export function AnamineseProgressiveForm() {
  const [dadosAnaminese, setDadosAnaminese] = useState<DadosAnaminese>({
    possui_doenca: "",
    qual_doenca: "",
    faz_uso_medicamento: "",
    qual_medicamento: "",
    alergia_medicamento: "",
    alergia_qual_medicamento: "",
    restricao_alimentar: "",
    quais_alimentos: "",
    tamanho_blusa: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({
    title: '',
    message: ''
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [messageErrors, setMessageErrors] = useState<{[key: string]: string}>({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [inputStatus, setInputStatus] = useState(false);

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue = value;

    if (type === "text") {
      newValue = value.replace(/\d/g, '');
    }

    if (type === "radio" && value === "Não") {
      const updatedDadosAnaminese = { ...dadosAnaminese };
      groups[currentIndex].cards.forEach(card => {
        updatedDadosAnaminese[card.name] = "não";
      });
      setDadosAnaminese(updatedDadosAnaminese);
      setDadosAnaminese((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
      setInputStatus(true)
    } else {
      setInputStatus(false)
      setDadosAnaminese((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  const isFieldValid = (card: any, value: string): boolean => {
    if (card.type === "select") {
      return !!value.trim();
    }
    return !!value.trim() && value.trim().length >= 3;
  };

  const handleNextButtonClick = () => {
    const currentCard = groups[currentIndex].cards;
    let hasError = false;
    const newMessageErrors = {...messageErrors};

    for (const card of currentCard) {
      const fieldValue = dadosAnaminese[card.name];

      if (!isFieldValid(card, fieldValue)) {
        hasError = true;
        newMessageErrors[card.name] = `O campo é obrigatório`;
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

  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/user/create-aditional-data', dadosAnaminese);
      if (response.data.status === 201 || response.data.status === 200) {
        router.push("/retiro/cadastro/status");
      } else if(response.data.status === "D200" ){
        //TODO tratar a rota de edição para quem já possui os dados adicionais cadastrados
        router.push("/retiro/cadastro/status");
      } else{
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
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(dadosAnaminese).every((value) => value.trim() !== "" && value.trim());
  };

  const initialGroups: GroupDadosAdicionais[] = [
    {
      label: "Doença",
      status: "notFilled",
      cards: [
        { label: "Possui alguma doença?", name: "possui_doenca", type: "radio", options: ["Sim", "Não"]},
        { label: "Qual doença ?", name: "qual_doenca", type: "text"},
      ],
    },
    {
      label: "Medicamento",
      status: "notFilled",
      cards: [
        { label: "Faz uso de algum medicamento?", name: "faz_uso_medicamento", type: "radio", options: ["Sim", "Não"]},
        { label: "Qual medicamento ?", name: "qual_medicamento", type: "text"},
      ],
    },
    {
      label: "Alergia a Medicamento",
      status: "notFilled",
      cards: [
        { label: "Tem alergia a algum medicamento ?", name: "alergia_medicamento", type: "radio", options: ["Sim", "Não"]},
        { label: "Qual medicamento ?", name: "alergia_qual_medicamento", type: "text"},
      ],
    },
    {
      label: "Dieta Restrita",
      status: "notFilled",
      cards: [
        { label: "Faz alguma dieta obrigatória devido à doença ou algum tipo de restrição alimentar causada por alergia ou intolerância a algum tipo de alimento?", name: "restricao_alimentar", type: "radio", options: ["Sim", "Não"]},
        { label: "Quais alimentos ?", name: "quais_alimentos", type: "text"},
      ],
    },
    {
      label: "Tamanho da Blusa",
      status: "notFilled",
      cards: [
        { label: "Selecione o tamanho da blusa", name: "tamanho_blusa", type: "select", options: ["PP", "P", "M", "G", "GG", "XG", "XGG"] },
      ],
    },
  ];

  const [groups, setGroups] = useState<GroupDadosAdicionais[]>(initialGroups);
  const cards = groups[currentIndex].cards;

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleFormSubmit}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-8">
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
          <CardTitle className='text-left'><h6>Preencha os campos abaixo</h6></CardTitle>
          <CardDescription className='text-left'>Para sua segurança no dia do evento, precisamos de informações adicionais.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {cards.map((card, index) => (
              <div key={index} className="flex flex-col space-y-1.5">
                <Label htmlFor={card.name}>{card.label}</Label>
                {card.type === "radio" ? (
                  <div className="flex flex-wrap gap-4">
                    <Card className="radio-container">
                      {card.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex gap-4 items-center">
                          <input
                            type="radio"
                            id={`${card.name}_${optionIndex}`}
                            name={card.name}
                            value={option}
                            checked={dadosAnaminese[card.name] === option}
                            onChange={handleInputChange}
                            required
                          />
                          <label
                            className="checkbox-label after:bg-blue500"
                            htmlFor={`${card.name}_${optionIndex}`}
                          >
                            <IoMdCheckmark className="checkbox-icon text-success" />
                            {option}
                          </label>
                        </div>
                      ))}
                    </Card>
                  </div>
                ) : card.type === "select" ? (
                  <select
                    name={card.name}
                    id={card.name}
                    value={dadosAnaminese[card.name]}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione uma opção</option>
                    {card.options?.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    name={card.name}
                    id={card.name}
                    type={card.type}
                    placeholder={card.placeholder}
                    value={dadosAnaminese[card.name]}
                    onChange={handleInputChange}
                    disabled={inputStatus}
                    required
                  />
                )}
                {messageErrors[card.name] && (
                  <p className="px12 text-red-500 text-sm">{messageErrors[card.name]}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {currentIndex < groups.length - 1 && (
            <Button
              type='button'
              className="w-full mb-1 text-white bg-success700 hover:bg-success700"
              onClick={handleNextButtonClick}
            >
              Próximo
            </Button>
          )}
          {currentIndex === groups.length - 1 && (
            <Button className="w-full mb-1 bg-success700 text-white" type="submit" disabled={!isFormValid() || loading}>
            {loading ? (
              <span className='flex items-center gap-2'>
                <BsArrowClockwise className="text-[30px] animate-spin mr-2" /> 
                Carregando...
              </span>
            ) : (
              <span className='flex items-center gap-2'>Cadastrar</span>
            )}
          </Button>
          )}
          {currentIndex > 0 && (
            <Button
              type='button'
              className="w-full mb-1 bg-success700 text-white hover:bg-success700"
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
