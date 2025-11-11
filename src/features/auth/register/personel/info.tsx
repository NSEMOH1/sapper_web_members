import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Grid, Input, Select, Spinner, Text, Box } from "@chakra-ui/react";
import { states } from "../../../../api/data";
import { useBanks, useAccountName } from "../../../../hooks/useBanks";
import { SearchableSelect } from "../../../../components/bank-select";

type FieldType = "text" | "select" | "date" | "number";

interface FormFieldConfig {
  name: keyof FormData | "account_name";
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  colSpan?: number;
  required?: boolean;
}

interface FormData {
  title: string;
  first_name: string;
  other_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  email: string;
  address: string;
  service_number: string;
  date_of_birth: string;
  state_of_origin: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  rank: string;
  lga: string;
  pin: string;
  unit: string;
  monthlyDeduction?: number;
}

interface StateOption {
  value: string;
  label: string;
}

interface EnterInfoProps {
  onFormDataChange?: (formData: FormData) => void;
  onValidationChange?: (isValid: boolean) => void;
  initialData?: Partial<FormData>;
}

const personalInfoFields: FormFieldConfig[] = [
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    placeholder: "Adedeji",
    required: true,
  },
  {
    name: "other_name",
    label: "Other Name",
    type: "text",
    placeholder: "Pelumi",
  },
  {
    name: "last_name",
    label: "Surname",
    type: "text",
    placeholder: "Oluwatobi",
    required: true,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: [
      { value: "MALE", label: "Male" },
      { value: "FEMALE", label: "Female" },
    ],
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "text",
    placeholder: "Phone Number",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "text",
    placeholder: "mail@mail.com",
    required: true,
  },
  {
    name: "date_of_birth",
    label: "Date of Birth",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  {
    name: "address",
    label: "House Address",
    type: "text",
    placeholder: "House Address",
    required: true,
  },
  {
    name: "service_number",
    label: "Service Number",
    type: "text",
    placeholder: "Service Number",
    required: true,
  },
  {
    name: "state_of_origin",
    label: "State of Origin",
    type: "select",
    required: true,
  },
  {
    name: "lga",
    label: "LGA",
    type: "select",
    required: true,
  },
  {
    name: "unit",
    label: "Unit",
    type: "text",
    required: true,
  },
];

const financialInfoFields: FormFieldConfig[] = [
  {
    name: "account_number",
    label: "Salary Account Number",
    type: "text",
    placeholder: "Account Number",
    required: true,
  },
  {
    name: "pin",
    label: "Transaction Pin",
    type: "text",
    placeholder: "Enter 4 digits pin",
    required: true,
  },
  {
    name: "monthlyDeduction",
    label: "Monthly Deduction",
    type: "number",
    placeholder: "",
    required: true,
  },
  {
    name: "rank",
    label: "Rank",
    type: "select",
    required: true,
    options: [
      { label: "MG", value: "MG" },
      { label: "BG", value: "BG" },
      { label: "COL", value: "COL" },
      { label: "LT_COL", value: "LT_COL" },
      { label: "MAJ", value: "MAJ" },
      { label: "CAPT", value: "CAPT" },
      { label: "LT", value: "LT" },
      { label: "MWO", value: "MWO" },
      { label: "WO", value: "WO" },
      { label: "SSGT", value: "SSGT" },
      { label: "SGT", value: "SGT" },
      { label: "CPL", value: "CPL" },
      { label: "LCPL", value: "LCPL" },
      { label: "SPR", value: "SPR" },
    ],
  },
];

interface FormFieldProps {
  field: FormFieldConfig;
  value: string;
  onChange: (name: keyof FormData | "account_name", value: string) => void;
  stateOptions?: StateOption[];
  lgaOptions?: StateOption[];
  unitOptions?: StateOption[];
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  stateOptions,
  lgaOptions,
  unitOptions,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange(field.name, e.target.value);
  };

  const getFieldOptions = () => {
    if (field.name === "state_of_origin") {
      return stateOptions || [];
    }
    if (field.name === "lga") {
      return lgaOptions || [];
    }
    if (field.name === "unit") {
      const options = unitOptions || [];
      return [...options, { value: "OTHER", label: "Other" }];
    }
    return field.options || [];
  };

  return (
    <FormControl fontWeight="light" gridColumn={`span ${field.colSpan || 1}`}>
      <FormLabel fontSize={13}>
        {field.label}
        {field.required && <span style={{ color: "red" }}>*</span>}
      </FormLabel>
      {field.type === "select" ? (
        <Select
          isRequired={field.required}
          bg="white"
          placeholder={`Select ${field.label.toLowerCase()}`}
          fontSize={13}
          value={value}
          onChange={handleChange}
          isDisabled={field.name === "lga" && !lgaOptions?.length}
        >
          {getFieldOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          isRequired={field.required}
          type={field.type}
          placeholder={field.placeholder}
          fontSize={13}
          bg="white"
          value={value}
          onChange={handleChange}
        />
      )}
    </FormControl>
  );
};

export const EnterInfo: React.FC<EnterInfoProps> = ({
  onFormDataChange,
  onValidationChange,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    first_name: "",
    other_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    email: "",
    address: "",
    service_number: "",
    state_of_origin: "",
    bank_name: "",
    account_number: "",
    rank: "",
    lga: "",
    unit: "",
    pin: "",
    monthlyDeduction: 0,
    date_of_birth: "",
    account_name: "",
    ...initialData,
  });

  const [bankCode, setBankCode] = useState("");
  const [lgaOptions, setLgaOptions] = useState<StateOption[]>([]);
  const [customUnitInput, setCustomUnitInput] = useState("");

  const { banks, loading: banksLoading, error: banksError } = useBanks();
  const { 
    accountName, 
    loading: accountNameLoading, 
    error: accountNameError, 
    resolveAccountName,
    resetAccountName 
  } = useAccountName();

  const validateForm = (): boolean => {
    const allFields = [
      ...personalInfoFields,
      ...financialInfoFields.filter((field) => field.name !== "account_name"),
    ];
    return (
      allFields.every((field) => {
        if (field.required) {
          const value = formData[field.name as keyof FormData];
          return Boolean(
            value !== undefined && value !== null && String(value).trim() !== ""
          );
        }
        return true;
      }) &&
      Boolean(formData.unit !== "OTHER" || String(formData.unit).trim() !== "")
    );
  };

  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }

    if (onValidationChange) {
      const isValid = validateForm();
      onValidationChange(isValid);
    }
  }, [formData, onFormDataChange, onValidationChange]);

  useEffect(() => {
    if (
      formData.state_of_origin &&
      Object.prototype.hasOwnProperty.call(states, formData.state_of_origin)
    ) {
      const lgAs = (states as Record<string, string[]>)[
        formData.state_of_origin
      ].map((lga) => ({
        value: lga,
        label: lga,
      }));
      setLgaOptions(lgAs);
      setFormData((prev) => ({
        ...prev,
        lga: "",
      }));
    } else {
      setLgaOptions([]);
    }
  }, [formData.state_of_origin]);

  useEffect(() => {
    if (formData.account_number && bankCode) {
      resolveAccountName(formData.account_number, bankCode);
    } else {
      resetAccountName();
    }
  }, [formData.account_number, bankCode]);

  useEffect(() => {
    if (accountName) {
      setFormData((prev) => ({
        ...prev,
        account_name: accountName,
      }));
    }
  }, [accountName]);

  const handleFieldChange = (
    name: keyof FormData | "account_name",
    value: string
  ) => {
    if (name === "unit") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (value !== "OTHER") {
        setCustomUnitInput("");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBankChange = (bankName: string, code: string) => {
    setBankCode(code);
    setFormData((prev) => ({
      ...prev,
      bank_name: bankName,
      account_name: "",
    }));
  };

  const handleCustomUnitChange = (value: string) => {
    setCustomUnitInput(value);
    setFormData((common) => ({
      ...common,
      unit: value.trim() ? `${value} (custom)` : "OTHER",
    }));
  };

  const stateOptions = Object.keys(states).map((state) => ({
    value: state,
    label: state,
  }));

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-6">
        <p className="font-bold text-3xl text-[#6A9819]">Create Profile</p>
        <p>Enter Your current informations</p>
      </div>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={4}
        mt={4}
      >
        {personalInfoFields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={
              formData[field.name as keyof FormData] !== undefined
                ? String(formData[field.name as keyof FormData])
                : ""
            }
            onChange={handleFieldChange}
            stateOptions={
              field.name === "state_of_origin" ? stateOptions : undefined
            }
            lgaOptions={field.name === "lga" ? lgaOptions : undefined}
          />
        ))}
        {formData.unit === "OTHER" && (
          <FormControl fontWeight="light" gridColumn="span 1">
            <FormLabel fontSize={13}>
              Custom Unit
              <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input
              isRequired
              type="text"
              placeholder="Enter custom unit"
              fontSize={13}
              bg="white"
              value={customUnitInput}
              onChange={(e) => handleCustomUnitChange(e.target.value)}
            />
          </FormControl>
        )}
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={4}
        mt={4}
      >
        <SearchableSelect
          banks={banks}
          value={formData.bank_name}
          onChange={handleBankChange}
          label="Bank"
          placeholder="Search bank..."
          required={true}
          loading={banksLoading}
          error={banksError}
        />

        {financialInfoFields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={
              formData[field.name as keyof FormData] !== undefined
                ? String(formData[field.name as keyof FormData])
                : ""
            }
            onChange={handleFieldChange}
          />
        ))}

        <FormControl fontWeight="light">
          <FormLabel fontSize={13}>
            Bank Account Name
            <span style={{ color: "red" }}>*</span>
          </FormLabel>
          <Box position="relative">
            <Input
              type="text"
              placeholder="Account Name"
              fontSize={13}
              bg="white"
              value={formData.account_name}
              isReadOnly
              opacity={accountNameLoading ? 0.6 : 1}
            />
            {accountNameLoading && (
              <Box
                position="absolute"
                right={3}
                top="50%"
                transform="translateY(-50%)"
              >
                <Spinner size="sm" />
              </Box>
            )}
          </Box>
          {accountNameError && (
            <Text fontSize={12} color="red.500" mt={1}>
              {accountNameError}
            </Text>
          )}
        </FormControl>
      </Grid>
    </div>
  );
};