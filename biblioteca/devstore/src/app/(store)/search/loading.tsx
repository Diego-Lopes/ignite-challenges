'use client'

import { Skeleton } from '@/components/skeleton'
import { Suspense } from 'react'
import { CurrentSearch } from './current-search'

export default function SearchLoading() {
  // como next ainda não passa parâmetros para pagina de loading
  // vamos transforma um use client para podermos usar useSearchParams()

  // usamos suspense para evitar um warning pelo fato de usarmos useSearch de react que renderiza no lado do servidor
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={null}>
        <CurrentSearch />
      </Suspense>
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
      </div>
    </div>
  )
}
