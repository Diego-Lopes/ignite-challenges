import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as S from "./styles";

const searchFormSchema = z.object({
  query: z.string(),
});

//passando a tipagem com zod, usando a função infer<>
type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  );
}
