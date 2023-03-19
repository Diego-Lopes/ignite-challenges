import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactiosContext'

/**
 * comparando as variáveis verificando se mudou o conteúdo se mudou renderizar
 * usando useMemo
 *
 * useMemo recebe uma função e array de dempedencias.
 *
 * Um hook focado em performance que memoriza valores computados
 * e reavalia esses valores caso uma de suas dependências seja alterada.
 */

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }
        return acc
      },
      { income: 0, outcome: 0, total: 0 },
    )
  }, [transactions])

  return summary
}
