import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as S from "./style";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//criando o schema do formulário.
const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(["income", "outcome"]),
});

//fazendo a typagem com infer de zod
type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return (
    <Dialog.Portal>
      <S.Overlay />
      <S.Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })} //faz conversão do valor do input para numero.
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <S.TransactionType>
            <S.TransactionTypeButton value="income" variant="income">
              <ArrowCircleUp size={24} />
              Entrada
            </S.TransactionTypeButton>
            <S.TransactionTypeButton value="outcome" variant="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </S.TransactionTypeButton>
          </S.TransactionType>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </S.Content>
    </Dialog.Portal>
  );
}
