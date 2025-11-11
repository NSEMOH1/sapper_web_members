export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: "text" | "select" | "date";
  placeholder?: string;
  options?: { value: string; label: string }[];
  colSpan?: number;
}

export interface LoanTransaction {
  key: string;
  transactionId: string;
  date: string;
  reference: string;
  type: "Debit" | "Credit";
  amount: number;
  channel: "Bank Transfer" | "Mobile Money" | "Card Payment" | "Cash";
  status: "completed" | "failed" | "processing" | "pending";
  loanId: any;
}

export interface TableColumn<T> {
  title: string;
  dataIndex: keyof T;
  key: string;
  render?: (value: any, record: T) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
  filters?: { text: string; value: any }[];
  onFilter?: (value: any, record: T) => boolean;
  width?: number | string;
}

export interface PersonelRegistrationData {
  email: string;
  first_name: string;
  last_name: string;
  other_name: string;
  gender: string;
  phone: string;
  address: string;
  state_of_origin: string;
  lga: string;
  service_number: string;
  rank: string;
  pin: string;
  date_of_birth: Date;
  monthlyDeduction: number;
  bankName: string;
  account_name: string
  account_number: string;
  profile_picture: File | null;
  unit: string;
  securityQuestion: string;
  securityAnswer: string;
  identification: File | null;
  id_card: File | null;
  signature: File | null;
  kinFirstName: string;
  kinLastName: string;
  relationship: string;
  kinPhone: string;
  kinEmail?: string;
  kinAddress?: string;
  kinGender: string;
}

export interface CivilianRegistrationData {
  email: string;
  first_name: string;
  last_name: string;
  other_name: string;
  gender: string;
  phone: string;
  address: string;
  state_of_origin: string;
  lga: string;
  type: string;
  title: string;
  pin: string;
  date_of_birth: Date;
  monthlyDeduction: number;
  bank: {
    name: string;
    account_number: string;
  };
  profile_picture: File | null;
  kycInfo: {
    identification: File | null;
    id_card: File | null;
    signature: File | null;
  };
  guarantors: Array<{
    first_name: string;
    other_name?: string;
    surname: string;
    nationality: string;
    address: string;
    gender: string;
    phone: string;
    email: string;
    rank: string;
    state_of_origin: string;
    lga: string;
    unit: string;
    service_number: string;
    date_of_birth: Date;
    relationship: string;
    title: string;
  }>;
  security: {
    question: string;
    answer: string;
  };
  nextOfKin?: {
    first_name: string;
    last_name: string;
    relationship: string;
    phone: string;
    email?: string;
    address?: string;
    nationality: string;
    gender: string;
    title: string;
  };
}

export interface PaymentData {
  paymentType: string;
  amount: number;
  loanId?: string;
}

export interface Loan {
  id: string;
  amount: number;
  approvedAmount: number;
  reference: string;
  status: string;
}
