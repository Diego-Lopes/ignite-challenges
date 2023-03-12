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
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  async function loadTransactions() {
    const response = await fetch("http://localhost:3001/transactions");
    const data = await response.json();
    setTransactions(data);
  }

  useEffect(() => {
    //useEffect não pode ser um async.
    loadTransactions();
  }, []);

  console.log(transactions);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
