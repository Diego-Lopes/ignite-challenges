// importando data mock
import { z } from 'zod'
import data from '../data.json'

// o nome da função tem que ser qual método http vai ser exposto se for get então tem que ser GET
// Quando não precisamos usar uma propriedade mas ela é obrigatória por boas práticas usamos _
export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  // delay manual
  // await new Promise((resolve) => setTimeout(resolve, 5000))

  // fazendo verificação com zod.
  // parse ele retorna um error, mesmo se o corpo do objeto tenha partes com as informações correta.
  // saveparse avisa que tem um erro e não retorna um erro direto, só encaminha para frente onde vai ser resolvido.
  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)

  // se o produto não existe, retornamos um erro.
  // esse Reponse é uma variável global.
  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 })
  }
  // Response é um variável global.
  return Response.json(product)
}
