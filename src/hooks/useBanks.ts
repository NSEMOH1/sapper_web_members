import { useState, useEffect } from "react";
import axios from "axios";

interface Bank {
  id: number;
  name: string;
  code: string;
}

interface BankResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    name: string;
    code: string;
    slug: string;
    longcode: string;
    gateway: string;
    pay_with_bank: boolean;
    supports_transfer: boolean;
    available_for_direct_debit: boolean;
    active: boolean;
    country: string;
    currency: string;
    type: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  meta?: {
    next: string | null;
    previous: string | null;
    perPage: number;
  };
}

interface AccountNameResponse {
  status: boolean;
  message: string;
  data: {
    account_number: string;
    account_name: string;
    bank_id: number;
  };
}

export const useBanks = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<BankResponse>(
          "https://api.paystack.co/bank?country=nigeria&perPage=100"
        );

        if (response.data.status) {
          const filteredBanks = response.data.data.map((bank) => ({
            id: bank.id,
            name: bank.name,
            code: bank.code,
          }));

          setBanks(filteredBanks);
        } else {
          setError("Failed to fetch banks");
        }
      } catch (err) {
        setError("Error fetching banks");
        console.error("Error fetching banks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  return { banks, loading, error };
};

export const useAccountName = () => {
  const [accountName, setAccountName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_PAYSTACK_SECRET_KEY;

  const resolveAccountName = async (
    accountNumber: string,
    bankCode: string
  ) => {
    if (!accountNumber || accountNumber.length !== 10) {
      setAccountName("");
      return;
    }

    if (!bankCode) {
      setAccountName("");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<AccountNameResponse>(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status && response.data.data) {
        setAccountName(response.data.data.account_name);
      } else {
        setError("Could not resolve account name");
        setAccountName("");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Error resolving account name";
      setError(errorMessage);
      setAccountName("");
      console.error("Error resolving account name:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetAccountName = () => {
    setAccountName("");
    setError(null);
  };

  return { accountName, loading, error, resolveAccountName, resetAccountName };
};
