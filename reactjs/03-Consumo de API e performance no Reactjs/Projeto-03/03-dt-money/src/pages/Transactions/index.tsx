import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import * as S from "./styles";

interface TransactionProps {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export function Transaction() {
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
    <S.ContainerTransaction>
      <Header />
      <Summary />
      <S.TransactionContainers>
        <SearchForm />
        <S.TransactionTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <S.PriceHighlight variant={transaction.type}>
                      {transaction.price}
                    </S.PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </S.TransactionTable>
      </S.TransactionContainers>
    </S.ContainerTransaction>
  );
}
