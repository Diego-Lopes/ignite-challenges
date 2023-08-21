import { SearchInputContainer } from "./styles";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInput = z.infer<typeof searchFormSchema>;

interface SearchInputProps {
  postLenght: number;
  getPost: (query?: string) => Promise<void>;
}

export function SearchInput({ postLenght, getPost }: SearchInputProps) {
  const { register, handleSubmit } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchPosts(data: SearchFormInput) {
    await getPost(data.query);
  }

  return (
    <SearchInputContainer onSubmit={handleSubmit(handleSearchPosts)}>
      <header>
        <h3>Publicações</h3>
        <span>{`${postLenght} publicações`}</span>
      </header>

      <input type="text" placeholder="Buscar conteúdo" {...register("query")} />
    </SearchInputContainer>
  );
}
