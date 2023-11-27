// importando data mock
import { z } from 'zod'
import { NextRequest } from 'next/server'
import data from '../data.json'

// o nome da função tem que ser qual método http vai ser exposto se for get então tem que ser GET
// Quando não precisamos usar uma propriedade mas ela é obrigatória por boas práticas usamos _
export async function GET(request: NextRequest) {
  // delay manual
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const { searchParams } = request.nextUrl

  // fazendo verificação com zod.
  // parse ele retorna um error, mesmo se o corpo do objeto tenha partes com as informações correta.
  // saveparse avisa que tem um erro e não retorna um erro direto, só encaminha para frente onde vai ser resolvido.
  const query = z.string().parse(searchParams.get('q'))

  const products = data.products.filter((product) => {
    return product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  })

  // Response é um variável global.
  return Response.json(products)
}
