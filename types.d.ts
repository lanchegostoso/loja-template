type DisplayPayment = {
    id: string;
    player?: {
      first_name?: string;
      last_name?: string;
    };
    description: string;
    status: string;
    payment_type_id: string;
    transaction_amount: number;
  }

type StatusMessageProps = {
    title:string
    type:string
    message:string
}


type DisplayUserPayments = {
    id: string,
    userId:string,
    paymentId: string,
    paymentStatus: string,
    paymentType: string,
    paymentDescription: string,
    createdAt: string,
    url:string,
    btnText:string,
}

type MethodsPayment = {
    id: string,
    name: string,
    payment_type_id:string,
    status:string,
    thumbnail: string,
    min_allowed_amount: float,
    max_allowed_amount: float,
}
type GetAllPayments = {
  id: Key | null | undefined;
  operation_type: string;
  qr_code: string | null;
  ticket_url: string | null;
  qr_code_base64: string | null;
  payer: {
    first_name: string;
    identification: {
      number: string | null;
    };
    phone: {
      area_code: string | null;
      number: string | null;
      extension: string | null;
    };
    last_name: string | null;
    id: string | null;
    type: string | null;
    email: string | null;
  };
  transaction_details: {
    transaction_id: string | null;
    total_paid_amount: number | null;
    installment_amount: number | null;
  };
  date_of_expiration: string | null;
  payment_type_id: string | null;
  payment_method: {
    issuer_id: string | null;
    id: string | null;
    type: string | null;
  };
  status_detail: string | null;
  status: string | null;
  transaction_amount: number | null;
  description: string | null;
  payment_method_id: string | null;
}

type UserPaymentDetails = {
  detail: {id?: number;
  issuer_id?: string;
  date_approved?: string;
  date_created?:string;
  date_last_updated?:string;
  date_of_expiration?:string;
  payment_method_id?: string;
  payment_type_id?: string;
  status?: string;
  status_detail?: string;
  description?: string;
  qr_code?: string;
  ticket_url?: string;
  qr_code_base64?: string;
  transaction_amount: number
  installments: number}
};

type TransactionData = {
  qr_code?: string;
  qr_code_base64?: string;
  transaction_id?: string;
  bank_transfer_id?: number;
  financial_institution?: number;
  bank_info?: BankInfo;
  ticket_url?: string;
};


type UserInfoProps = {
 user:{
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
 } | undefined
}
type FormInput = {
  name?: string
  email: string
  password: string
}
type Inputs ={
  label?: string | null
  name: string
  placeholder?: string
  type: string
  value?: string
  style?: string
  onChange?: (value: string) => void;
}
type Button ={
  name: string
  value: string
}
type MessageProps ={
  message?: string | undefined;
  type?: string | undefined;
}

type PaymentData = {
  transaction_amount: number;
  token: string;
  description: string;
  installments: number;
  payment_method_id: string;
  issuer_id: string;
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
}
type AlertSistemProps = {
  title?: string;
  message: string;
  onClose: () => void;
  show: boolean;
  header?: {
    icon: IconType;
    iconColor: string;
    text: string;
    textBold: boolean;
  };
}