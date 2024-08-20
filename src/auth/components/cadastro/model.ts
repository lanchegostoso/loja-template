export type DadosPessoais = {
    name: string;
    telefone: string;
    telefone_emergencia: string;
    rg: string;
    cpf: string;
    data_de_nascimento: string;
    email: string;
    password: string;
    passwordRepeat:string;
    termos_de_uso: string;
  };

export type AlertMessage = {
  title: string
  message: string
}

export type DadosAnaminese = {
  possui_doenca: string;
  qual_doenca: string;
  faz_uso_medicamento: string;
  qual_medicamento: string;
  alergia_medicamento: string;
  alergia_qual_medicamento: string;
  restricao_alimentar: string;
  quais_alimentos: string;
  tamanho_blusa: string;
};

export type CardDadosAdicionais = {
  label: string;
  name: keyof DadosAnaminese;
  type: string;
  placeholder?: string;
  options?: string[];
}

export type GroupDadosAdicionais = {
  label: string;
  status: "notFilled" | "filled";
  cards: CardDadosAdicionais[];
}


export type RequiredFields = {
  [key: string]: boolean;
};