import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import * as S from './styles'
import { TransactionsContext } from '../../contexts/TransactiosContext'
import { useContextSelector } from 'use-context-selector'
/**
 * import { memo } from 'react'
 *
 * Por que que um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer);
 * - Props changed (mudou propriedades);
 * - Parent rerendered (componente pai renderizou);
 *
 * Qual o fluxo de renderização?
 * 1. O React recria o HTML da interface daquele componente
 * 2. Compara a versão do HTML recriada com a versão anterior
 * 3. Se mudou alguma coisa, ele reescreve o HTML na tela
 *
 * Memo:
 * passos do memo:
 * 0. Hooks changed, Props changed (deep comparison) //fazendo comparação profunda em hooks, props
 * 0.1: Comparar a versão anterior dos hooks e props
 * 0.2: Se mudou algo, ele vai permitir a nova renderização
 *
 */

const searchFormSchema = z.object({
  query: z.string(),
})

// passando a tipagem com zod, usando a função infer<>
type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  // search
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  )
}
