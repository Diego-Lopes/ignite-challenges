import { Children, createContext, ReactNode, useEffect, useState } from "react";

interface TransactionProps {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: TransactionProps[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  async function fetchTransactions(query?: string) {
    const url = new URL("http://localhost:3001/transactions");

    //verificando
    if (query) {
      url.searchParams.append("q", query);
    }

    const response = await fetch(url);
    const data = await response.json();
    setTransactions(data);
  }

  useEffect(() => {
    //useEffect não pode ser um async.
    fetchTransactions();
  }, []);

  console.log(transactions);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
